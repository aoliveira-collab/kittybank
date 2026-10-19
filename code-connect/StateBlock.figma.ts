// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=12-921
// source=src/components/feedback.tsx
// component=StateBlock
import figma from 'figma';
const instance = figma.selectedInstance;

let title = instance.getString('Title');
let description = instance.getString('Description');
const state = instance.getEnum('State', {
  Success: 'success',
  Empty: 'empty',
  Error: 'error',
  Loading: 'loading',
});
if (state === 'success') {
  const titleLayer = instance.findText('Seu cadastro foi concluído');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Agora você pode acessar sua cont');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
if (state === 'empty') {
  const titleLayer = instance.findText('Ainda não há movimentações');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Quando você movimentar sua conta');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
if (state === 'error') {
  const titleLayer = instance.findText('Vamos tentar novamente?');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Confira sua conexão. Seus dados ');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
if (state === 'loading') {
  const titleLayer = instance.findText('Estamos cuidando disso');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Aguarde a confirmação para conti');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
const iconNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && node.name.startsWith('KittyBank/Icon/'),
)[0];
const iconSnippet = iconNode?.type === 'INSTANCE' ? iconNode.executeTemplate().example : undefined;
const actionNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/Button'].includes(node.name),
)[0];
const actionSnippet =
  actionNode?.type === 'INSTANCE' ? actionNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<StateBlock
    title="${title}"
    description="${description}"
    state="${state}"
    ${iconSnippet ? figma.code`icon={${iconSnippet}}` : ''}
    ${actionSnippet ? figma.code`action={${actionSnippet}}` : ''}
  />`,
  imports: ['import { StateBlock } from "@kittybank/react"'],
  id: 'kittybank-state-block',
  metadata: { nestable: true },
};
