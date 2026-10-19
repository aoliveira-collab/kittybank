/** Offline contract validation. This does not publish or emulate Figma's service. */
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const manifest = read('code-connect/manifest.json'),
  library = read('figma/library.snapshot.json'),
  trees = read('figma/variants.snapshot.json');
const byId = new Map(manifest.map((m) => [m.nodeId, m]));
for (const s of library.sets)
  for (const v of s.variants)
    byId.set(
      v.id,
      manifest.find((m) => m.nodeId === s.id),
    );
const treeById = new Map(trees.map((t) => [t.id, t]));
const compiled = new Map();
for (const m of manifest) {
  const src = fs.readFileSync(m.template, 'utf8');
  assert(src.includes('figma.code`'));
  assert(!src.includes('figma.connect('));
  assert(src.includes(`// source=${m.source}`));
  assert(fs.existsSync(m.source));
  compiled.set(
    m.component,
    ts.transpileModule(src, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
  );
}
const error = { type: 'ERROR' };
function run(meta, node, depth = 0) {
  assert(depth < 12, 'Unexpected nested template cycle');
  const wrap = (n) => {
    if (n.type === 'TEXT') return { ...n, textContent: n.text };
    const props = n.properties ?? {},
      kids = (n.children ?? []).map(wrap);
    const get = (key) =>
      Object.entries(props).find(([k]) => k === key || k.startsWith(key + '#'))?.[1]?.value;
    return {
      ...n,
      type: 'INSTANCE',
      children: kids,
      getString: (key) => String(get(key) ?? ''),
      getBoolean: (key) => Boolean(get(key)),
      getEnum: (key, values) => {
        const v = get(key);
        assert(Object.hasOwn(values, v), `Unmapped ${meta.component}.${key}=${v}`);
        return values[v];
      },
      getInstanceSwap: (key) => {
        const id = get(key);
        return kids.find((k) => k.type === 'INSTANCE' && k.mainComponentId === id) ?? error;
      },
      findText: (name) => kids.find((k) => k.type === 'TEXT' && k.name === name) ?? error,
      findLayers: (predicate) => kids.filter((k) => k.visible !== false && predicate(k)),
      executeTemplate: () => {
        const child = byId.get(n.mainComponentId) ?? manifest.find((m) => m.figmaName === n.name);
        assert(child, `Missing template for ${n.name}`);
        return run(child, n, depth + 1);
      },
    };
  };
  const sections = (strings, ...values) =>
    strings.flatMap((s, i) => [s, ...(Array.isArray(values[i]) ? values[i] : [values[i] ?? ''])]);
  const figma = { selectedInstance: wrap(node), code: sections };
  const exports = {};
  vm.runInNewContext(
    compiled.get(meta.component),
    {
      exports,
      module: { exports },
      require: (name) => {
        assert.equal(name, 'figma');
        return { __esModule: true, default: figma };
      },
    },
    { timeout: 1000, filename: meta.template },
  );
  return exports.default;
}
const snippets = [];
for (const m of manifest) {
  const family = library.sets.find((s) => s.id === m.nodeId);
  const variants = treeById.get(m.nodeId)?.variants ?? [{ name: 'default', children: [] }];
  for (const variant of variants) {
    const props = Object.fromEntries(
      Object.entries(family?.props ?? {}).map(([key, p]) => [key, { value: p.defaultValue }]),
    );
    if (family)
      for (const pair of variant.name.split(', ')) {
        const [key, value] = pair.split('=');
        props[key] = { value };
      }
    const result = run(m, {
      type: 'INSTANCE',
      name: m.figmaName,
      properties: props,
      children: variant.children,
    });
    const code = result.example.flat(Infinity).join('');
    assert(!code.includes('[object Object]'));
    assert(!code.includes('="undefined"'), code);
    assert(code.includes(`<${m.component}`));
    snippets.push(
      `// ${m.component} — ${variant.name}\nconst example${snippets.length} = (${code});`,
    );
  }
}
assert.equal(manifest.length, 50);
assert.equal(snippets.length, 133);
fs.mkdirSync('.code-connect', { recursive: true });
fs.writeFileSync(
  '.code-connect/examples.tsx',
  `import { ${manifest.map((m) => m.component).join(', ')} } from '../src';\n` +
    snippets.join('\n'),
);
fs.writeFileSync(
  '.code-connect/tsconfig.json',
  JSON.stringify({
    extends: '../tsconfig.json',
    compilerOptions: { noEmit: true },
    include: ['examples.tsx', '../src'],
  }),
);
const result = spawnSync(
  process.execPath,
  ['node_modules/typescript/bin/tsc', '-p', '.code-connect/tsconfig.json'],
  { stdio: 'inherit' },
);
assert.equal(result.status, 0, 'Generated snippets do not type-check against React props');
console.log(
  '50 templates; 113 variants + 20 icons; all emitted JSX type-checks. Nested instances resolved from the Figma snapshot.',
);
