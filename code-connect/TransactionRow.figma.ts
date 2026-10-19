// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-930
// source=src/components/banking.tsx
// component=TransactionRow
import figma from 'figma';
const instance = figma.selectedInstance;

let title = instance.getString('Title');
let meta = instance.getString('Meta');
let amount = instance.getString('Amount');
const type = instance.getEnum('Type', {
  Incoming: 'incoming',
  Outgoing: 'outgoing',
  Pending: 'pending',
});
if (type === 'incoming') {
  const titleLayer = instance.findText('Pix recebido');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const metaLayer = instance.findText('Hoje · 14:32');
  if (metaLayer.type === 'TEXT') meta = metaLayer.textContent;
  const amountLayer = instance.findText('+ R$ 250,00');
  if (amountLayer.type === 'TEXT') amount = amountLayer.textContent;
}
if (type === 'outgoing') {
  const titleLayer = instance.findText('Pix enviado');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const metaLayer = instance.findText('Hoje · 14:32');
  if (metaLayer.type === 'TEXT') meta = metaLayer.textContent;
  const amountLayer = instance.findText('− R$ 48,90');
  if (amountLayer.type === 'TEXT') amount = amountLayer.textContent;
}
if (type === 'pending') {
  const titleLayer = instance.findText('Pix enviado');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const metaLayer = instance.findText('Hoje · 14:32');
  if (metaLayer.type === 'TEXT') meta = metaLayer.textContent;
  const amountLayer = instance.findText('− R$ 48,90');
  if (amountLayer.type === 'TEXT') amount = amountLayer.textContent;
}
const iconNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && node.name.startsWith('KittyBank/Icon/'),
)[0];
const iconSnippet = iconNode?.type === 'INSTANCE' ? iconNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<TransactionRow
    title="${title}"
    meta="${meta}"
    amount="${amount}"
    type="${type}"
    ${iconSnippet ? figma.code`icon={${iconSnippet}}` : ''}
  />`,
  imports: ['import { TransactionRow } from "@kittybank/react"'],
  id: 'kittybank-transaction-row',
  metadata: { nestable: true },
};
