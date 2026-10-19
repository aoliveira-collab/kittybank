// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-875
// source=src/components/banking.tsx
// component=PaymentCard
import figma from 'figma';
const instance = figma.selectedInstance;

let holder = instance.getString('Holder');
const state = instance.getEnum('State', { Active: 'active', Frozen: 'frozen' });
if (state === 'active') {
  const holderLayer = instance.findText('ANA OLIVEIRA');
  if (holderLayer.type === 'TEXT') holder = holderLayer.textContent;
}
if (state === 'frozen') {
  const holderLayer = instance.findText('ANA OLIVEIRA');
  if (holderLayer.type === 'TEXT') holder = holderLayer.textContent;
}
const iconNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && node.name.startsWith('KittyBank/Icon/'),
)[0];
const iconSnippet = iconNode?.type === 'INSTANCE' ? iconNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<PaymentCard
    holder="${holder}"
    state="${state}"
    ${iconSnippet ? figma.code`icon={${iconSnippet}}` : ''}
  />`,
  imports: ['import { PaymentCard } from "@kittybank/react"'],
  id: 'kittybank-payment-card',
  metadata: { nestable: true },
};
