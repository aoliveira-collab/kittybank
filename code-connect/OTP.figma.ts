// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-359
// source=src/components/security.tsx
// component=OTP
import figma from 'figma';
const instance = figma.selectedInstance;

let label = instance.getString('Label');
const state = instance.getEnum('State', { Empty: 'empty', Filled: 'filled', Error: 'error' });
if (state === 'empty') {
  const labelLayer = instance.findText('Código de segurança');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (state === 'filled') {
  const labelLayer = instance.findText('Código de segurança');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (state === 'error') {
  const labelLayer = instance.findText('Código de segurança');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
const nested = instance.findLayers(
  (node) => node.type === 'INSTANCE' && node.name === 'KittyBank/Security/CodeCell',
);
const child0 = nested[0]?.type === 'INSTANCE' ? nested[0].executeTemplate().example : undefined;
const child1 = nested[1]?.type === 'INSTANCE' ? nested[1].executeTemplate().example : undefined;
const child2 = nested[2]?.type === 'INSTANCE' ? nested[2].executeTemplate().example : undefined;
const child3 = nested[3]?.type === 'INSTANCE' ? nested[3].executeTemplate().example : undefined;
const child4 = nested[4]?.type === 'INSTANCE' ? nested[4].executeTemplate().example : undefined;
const child5 = nested[5]?.type === 'INSTANCE' ? nested[5].executeTemplate().example : undefined;

export default {
  example: figma.code`<OTP
    label="${label}"
    state="${state}"
    cells={<>
${child0}${child1}${child2}${child3}${child4}${child5}
</>}
  />`,
  imports: ['import { OTP } from "@kittybank/react"'],
  id: 'kittybank-o-t-p',
  metadata: { nestable: true },
};
