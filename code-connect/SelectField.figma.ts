// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=6-445
// source=src/components/controls.tsx
// component=SelectField
import figma from 'figma';
const instance = figma.selectedInstance;

let label = instance.getString('Label');
let value = instance.getString('Value');
const state = instance.getEnum('State', {
  Empty: 'empty',
  Filled: 'filled',
  Open: 'open',
  Error: 'error',
  Disabled: 'disabled',
});
if (state === 'empty') {
  const labelLayer = instance.findText('Tipo de documento');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('Selecione uma opção');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
}
if (state === 'filled') {
  const labelLayer = instance.findText('Tipo de documento');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('RG');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
}
if (state === 'open') {
  const labelLayer = instance.findText('Tipo de documento');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('RG');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
}
if (state === 'error') {
  const labelLayer = instance.findText('Tipo de documento');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('RG');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
}
if (state === 'disabled') {
  const labelLayer = instance.findText('Tipo de documento');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('RG');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
}
const iconNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/Icon/ChevronDown'].includes(node.name),
)[0];
const iconSnippet = iconNode?.type === 'INSTANCE' ? iconNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<SelectField
    label="${label}"
    state="${state}"
    ${state === 'empty' ? figma.code`placeholder="${value}"` : figma.code`defaultValue="${value}"`}
    ${iconSnippet ? figma.code`icon={${iconSnippet}}` : ''}
  />`,
  imports: ['import { SelectField } from "@kittybank/react"'],
  id: 'kittybank-select-field',
  metadata: { nestable: true },
};
