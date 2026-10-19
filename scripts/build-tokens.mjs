import fs from 'node:fs';
const source = JSON.parse(
  fs.readFileSync(new URL('../figma/tokens.snapshot.json', import.meta.url), 'utf8'),
);
const byId = Object.fromEntries(source.variables.map((v) => [v.id, v]));
const name = (v) => '--kb-' + v.name.replaceAll('/', '-');
const value = (v) => Object.values(v.values)[0];
function resolve(v) {
  const x = value(v);
  if (x?.type === 'VARIABLE_ALIAS') return resolve(byId[x.id]);
  if (typeof x === 'number') return x;
  return (
    '#' +
    [x.r, x.g, x.b]
      .map((c) =>
        Math.round(c * 255)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
      .toUpperCase()
  );
}
const lines = source.variables.map((v) => {
  const x = value(v);
  return `  ${name(v)}: ${x?.type === 'VARIABLE_ALIAS' ? `var(${name(byId[x.id])})` : resolve(v) + (v.type === 'FLOAT' ? 'px' : '')};`;
});
lines.push(
  '  --kb-font-family: Poppins, system-ui, sans-serif;',
  '  --kb-gradient-sunrise: linear-gradient(90deg, var(--kb-coral-500) 0%, var(--kb-blush-300) 50%, var(--kb-sand-300) 100%);',
);
for (const s of source.textStyles) {
  const key = s.name.replace('KittyBank/', '').replaceAll('/', '-').toLowerCase();
  const weight = { Regular: 400, Medium: 500, SemiBold: 600, Bold: 700 }[s.fontName.style];
  lines.push(
    `  --kb-type-${key}: ${weight} ${s.fontSize / 16}rem/${s.lineHeight.value / 16}rem var(--kb-font-family);`,
  );
}
for (const s of source.effectStyles) {
  const e = s.effects[0],
    c = e.color;
  lines.push(
    `  --kb-shadow-${s.name.split('/').pop().toLowerCase()}: ${e.offset.x}px ${e.offset.y}px ${e.radius}px rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${c.a});`,
  );
}
fs.mkdirSync(new URL('../src/styles', import.meta.url), { recursive: true });
fs.writeFileSync(
  new URL('../src/styles/tokens.css', import.meta.url),
  '/* Generated from Figma. Run npm run tokens:build. */\n:root, .kb-theme {\n' +
    lines.join('\n') +
    '\n}\n',
);
const tokens = Object.fromEntries(
  source.variables.map((v) => [
    v.name,
    {
      value: resolve(v),
      css: `var(${name(v)})`,
      figmaId: v.id,
      ...(value(v)?.type === 'VARIABLE_ALIAS' ? { alias: byId[value(v).id].name } : {}),
    },
  ]),
);
fs.writeFileSync(
  new URL('../src/tokens.ts', import.meta.url),
  '/** Generated from the Figma variables snapshot. */\nexport const tokens = ' +
    JSON.stringify(tokens, null, 2) +
    ' as const;\nexport type TokenName = keyof typeof tokens;\n',
);
console.log(`${source.variables.length} tokens generated, aliases preserved.`);
