// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=6-514
// source=src/components/controls.tsx
// component=Checkbox
import figma from 'figma';
const instance = figma.selectedInstance;

let label = instance.getString('Label');
const state = instance.getEnum('State', {
  Unchecked: 'unchecked',
  Checked: 'checked',
  Error: 'error',
  Disabled: 'disabled',
});
if (state === 'unchecked') {
  const labelLayer = instance.findText('Li e aceito os termos de uso');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (state === 'checked') {
  const labelLayer = instance.findText('Li e aceito os termos de uso');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (state === 'error') {
  const labelLayer = instance.findText('Li e aceito os termos de uso');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (state === 'disabled') {
  const labelLayer = instance.findText('Li e aceito os termos de uso');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
const iconNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/Icon/Check'].includes(node.name),
)[0];
const iconSnippet = iconNode?.type === 'INSTANCE' ? iconNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<Checkbox
    label="${label}"
    state="${state}"
    ${iconSnippet ? figma.code`icon={${iconSnippet}}` : ''}
  />`,
  imports: ['import { Checkbox } from "@kittybank/react"'],
  id: 'kittybank-checkbox',
  metadata: { nestable: true },
};
