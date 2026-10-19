// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=6-124
// source=src/components/controls.tsx
// component=Button
import figma from 'figma';
const instance = figma.selectedInstance;

const iconInstance = instance.getInstanceSwap('Icon');
const iconCode =
  iconInstance?.type === 'INSTANCE' ? iconInstance.executeTemplate().example : undefined;
const showIcon = instance.getBoolean('Show icon');
let label = instance.getString('Label');
const hierarchy = instance.getEnum('Hierarchy', {
  Primary: 'primary',
  Secondary: 'secondary',
  Ghost: 'ghost',
});
const state = instance.getEnum('State', {
  Default: 'default',
  Pressed: 'pressed',
  Focus: 'focus',
  Disabled: 'disabled',
  Loading: 'loading',
});
if (hierarchy === 'primary' && state === 'default') {
  const labelLayer = instance.findText('Continuar');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'primary' && state === 'pressed') {
  const labelLayer = instance.findText('Continuar');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'primary' && state === 'focus') {
  const labelLayer = instance.findText('Continuar');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'primary' && state === 'disabled') {
  const labelLayer = instance.findText('Continuar');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'primary' && state === 'loading') {
  const labelLayer = instance.findText('Aguarde…');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'secondary' && state === 'default') {
  const labelLayer = instance.findText('Continuar');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'secondary' && state === 'pressed') {
  const labelLayer = instance.findText('Continuar');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'secondary' && state === 'focus') {
  const labelLayer = instance.findText('Continuar');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'secondary' && state === 'disabled') {
  const labelLayer = instance.findText('Continuar');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'secondary' && state === 'loading') {
  const labelLayer = instance.findText('Aguarde…');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'ghost' && state === 'default') {
  const labelLayer = instance.findText('Continuar');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'ghost' && state === 'pressed') {
  const labelLayer = instance.findText('Continuar');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'ghost' && state === 'focus') {
  const labelLayer = instance.findText('Continuar');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'ghost' && state === 'disabled') {
  const labelLayer = instance.findText('Continuar');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (hierarchy === 'ghost' && state === 'loading') {
  const labelLayer = instance.findText('Aguarde…');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
const loadingIconNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/Icon/Spinner'].includes(node.name),
)[0];
const loadingIconSnippet =
  loadingIconNode?.type === 'INSTANCE' ? loadingIconNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<Button
    ${iconCode ? figma.code`icon={${iconCode}}` : ''}
    showIcon={${showIcon ? 'true' : 'false'}}
    label="${label}"
    hierarchy="${hierarchy}"
    state="${state}"
    ${loadingIconSnippet ? figma.code`loadingIcon={${loadingIconSnippet}}` : ''}
  />`,
  imports: ['import { Button } from "@kittybank/react"'],
  id: 'kittybank-button',
  metadata: { nestable: true },
};
