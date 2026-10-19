// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-982
// source=src/components/banking.tsx
// component=QuickAction
import figma from 'figma';
const instance = figma.selectedInstance;

const iconInstance = instance.getInstanceSwap('Icon');
const iconCode =
  iconInstance?.type === 'INSTANCE' ? iconInstance.executeTemplate().example : undefined;
let label = instance.getString('Label');
const state = instance.getEnum('State', {
  Default: 'default',
  Pressed: 'pressed',
  Disabled: 'disabled',
});
if (state === 'default') {
  const labelLayer = instance.findText('Transferir');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (state === 'pressed') {
  const labelLayer = instance.findText('Transferir');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (state === 'disabled') {
  const labelLayer = instance.findText('Transferir');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}

export default {
  example: figma.code`<QuickAction
    ${iconCode ? figma.code`icon={${iconCode}}` : ''}
    label="${label}"
    state="${state}"
  />`,
  imports: ['import { QuickAction } from "@kittybank/react"'],
  id: 'kittybank-quick-action',
  metadata: { nestable: true },
};
