// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=6-549
// source=src/components/controls.tsx
// component=Switch
import figma from 'figma';
const instance = figma.selectedInstance;

const state = instance.getEnum('State', { Off: 'off', On: 'on', Disabled: 'disabled' });

export default {
  example: figma.code`<Switch
    state="${state}"
  />`,
  imports: ['import { Switch } from "@kittybank/react"'],
  id: 'kittybank-switch',
  metadata: { nestable: true },
};
