// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=12-1068
// source=src/components/help.tsx
// component=Composer
import figma from 'figma';
const instance = figma.selectedInstance;

let message = instance.getString('Message');
const state = instance.getEnum('State', { Empty: 'empty', Ready: 'ready', Sending: 'sending' });
if (state === 'empty') {
  const messageLayer = instance.findText('Escreva sua mensagem…');
  if (messageLayer.type === 'TEXT') message = messageLayer.textContent;
}
if (state === 'ready') {
  const messageLayer = instance.findText('Preciso de ajuda');
  if (messageLayer.type === 'TEXT') message = messageLayer.textContent;
}
if (state === 'sending') {
  const messageLayer = instance.findText('Enviando…');
  if (messageLayer.type === 'TEXT') message = messageLayer.textContent;
}
const sendActionNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/IconButton'].includes(node.name),
)[0];
const sendActionSnippet =
  sendActionNode?.type === 'INSTANCE' ? sendActionNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<Composer
    state="${state}"
    ${state === 'empty' ? figma.code`placeholder="${message}"` : figma.code`defaultMessage="${message}"`}
    ${sendActionSnippet ? figma.code`sendAction={${sendActionSnippet}}` : ''}
  />`,
  imports: ['import { Composer } from "@kittybank/react"'],
  id: 'kittybank-composer',
  metadata: { nestable: true },
};
