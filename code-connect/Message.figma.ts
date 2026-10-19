// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=12-1037
// source=src/components/help.tsx
// component=Message
import figma from 'figma';
const instance = figma.selectedInstance;

let message = instance.getString('Message');
const author = instance.getEnum('Author', { Assistant: 'assistant', Customer: 'customer' });
if (author === 'assistant') {
  const messageLayer = instance.findText('Olá! Em qual etapa posso ajudar?');
  if (messageLayer.type === 'TEXT') message = messageLayer.textContent;
}
if (author === 'customer') {
  const messageLayer = instance.findText('Quero ajuda para abrir minha con');
  if (messageLayer.type === 'TEXT') message = messageLayer.textContent;
}

export default {
  example: figma.code`<Message
    message="${message}"
    author="${author}"
  />`,
  imports: ['import { Message } from "@kittybank/react"'],
  id: 'kittybank-message',
  metadata: { nestable: true },
};
