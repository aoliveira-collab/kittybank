// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=6-314
// source=src/components/controls.tsx
// component=TextField
import figma from 'figma';
const instance = figma.selectedInstance;

let label = instance.getString('Label');
let value = instance.getString('Value');
let helper = instance.getString('Helper');
const showHelper = instance.getBoolean('Show helper');
const state = instance.getEnum('State', {
  Empty: 'empty',
  Filled: 'filled',
  Focus: 'focus',
  Error: 'error',
  Disabled: 'disabled',
});
const type = instance.getEnum('Type', { Text: 'text', Password: 'password' });
if (state === 'empty' && type === 'text') {
  const labelLayer = instance.findText('Nome completo');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('Digite aqui');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
  const helperLayer = instance.findText('Como aparece no seu documento.');
  if (helperLayer.type === 'TEXT') helper = helperLayer.textContent;
}
if (state === 'empty' && type === 'password') {
  const labelLayer = instance.findText('Senha');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('Digite aqui');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
  const helperLayer = instance.findText('Como aparece no seu documento.');
  if (helperLayer.type === 'TEXT') helper = helperLayer.textContent;
}
if (state === 'filled' && type === 'text') {
  const labelLayer = instance.findText('Nome completo');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('Ana Oliveira');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
  const helperLayer = instance.findText('Como aparece no seu documento.');
  if (helperLayer.type === 'TEXT') helper = helperLayer.textContent;
}
if (state === 'filled' && type === 'password') {
  const labelLayer = instance.findText('Senha');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('••••••••••');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
  const helperLayer = instance.findText('Como aparece no seu documento.');
  if (helperLayer.type === 'TEXT') helper = helperLayer.textContent;
}
if (state === 'focus' && type === 'text') {
  const labelLayer = instance.findText('Nome completo');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('Ana Oliveira');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
  const helperLayer = instance.findText('Como aparece no seu documento.');
  if (helperLayer.type === 'TEXT') helper = helperLayer.textContent;
}
if (state === 'focus' && type === 'password') {
  const labelLayer = instance.findText('Senha');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('••••••••••');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
  const helperLayer = instance.findText('Como aparece no seu documento.');
  if (helperLayer.type === 'TEXT') helper = helperLayer.textContent;
}
if (state === 'error' && type === 'text') {
  const labelLayer = instance.findText('Nome completo');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('Ana Oliveira');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
  const helperLayer = instance.findText('Revise este campo para continuar');
  if (helperLayer.type === 'TEXT') helper = helperLayer.textContent;
}
if (state === 'error' && type === 'password') {
  const labelLayer = instance.findText('Senha');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('••••••••••');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
  const helperLayer = instance.findText('Revise este campo para continuar');
  if (helperLayer.type === 'TEXT') helper = helperLayer.textContent;
}
if (state === 'disabled' && type === 'text') {
  const labelLayer = instance.findText('Nome completo');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('Ana Oliveira');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
  const helperLayer = instance.findText('Como aparece no seu documento.');
  if (helperLayer.type === 'TEXT') helper = helperLayer.textContent;
}
if (state === 'disabled' && type === 'password') {
  const labelLayer = instance.findText('Senha');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('••••••••••');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
  const helperLayer = instance.findText('Como aparece no seu documento.');
  if (helperLayer.type === 'TEXT') helper = helperLayer.textContent;
}
const visibilityIconNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/Icon/Eye'].includes(node.name),
)[0];
const visibilityIconSnippet =
  visibilityIconNode?.type === 'INSTANCE'
    ? visibilityIconNode.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<TextField
    label="${label}"
    helper="${helper}"
    showHelper={${showHelper ? 'true' : 'false'}}
    state="${state}"
    type="${type}"
    ${state === 'empty' ? figma.code`placeholder="${value}"` : figma.code`defaultValue="${value}"`}
    ${visibilityIconSnippet ? figma.code`visibilityIcon={${visibilityIconSnippet}}` : ''}
  />`,
  imports: ['import { TextField } from "@kittybank/react"'],
  id: 'kittybank-text-field',
  metadata: { nestable: true },
};
