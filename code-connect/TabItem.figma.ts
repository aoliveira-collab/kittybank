// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-582
// source=src/components/navigation.tsx
// component=TabItem
import figma from 'figma';
const instance = figma.selectedInstance;

const iconInstance = instance.getInstanceSwap('Icon');
const iconCode =
  iconInstance?.type === 'INSTANCE' ? iconInstance.executeTemplate().example : undefined;
let label = instance.getString('Label');
const state = instance.getEnum('State', { Default: 'default', Selected: 'selected' });
if (state === 'default') {
  const labelLayer = instance.findText('Início');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (state === 'selected') {
  const labelLayer = instance.findText('Início');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}

export default {
  example: figma.code`<TabItem
    ${iconCode ? figma.code`icon={${iconCode}}` : ''}
    label="${label}"
    state="${state}"
  />`,
  imports: ['import { TabItem } from "@kittybank/react"'],
  id: 'kittybank-tab-item',
  metadata: { nestable: true },
};
