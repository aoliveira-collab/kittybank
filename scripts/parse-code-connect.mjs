import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
mkdirSync('.code-connect', { recursive: true });
const result = spawnSync(
  process.execPath,
  [
    'node_modules/@figma/code-connect/bin/figma',
    'connect',
    'parse',
    '--config',
    'figma.config.json',
    '--outFile',
    '.code-connect/parsed.json',
    '--skip-update-check',
    '--exit-on-unreadable-files',
  ],
  { stdio: 'inherit' },
);
process.exit(result.status ?? 1);
