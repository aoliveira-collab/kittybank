// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=12-844
// source=src/components/feedback.tsx
// component=Alert
import figma from 'figma';
const instance = figma.selectedInstance;

let title = instance.getString('Title');
let description = instance.getString('Description');
const tone = instance.getEnum('Tone', {
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Info: 'info',
});
if (tone === 'success') {
  const titleLayer = instance.findText('Tudo certo por aqui');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Recebemos suas informações.');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
if (tone === 'warning') {
  const titleLayer = instance.findText('Revise antes de continuar');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Confira os dados desta operação.');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
if (tone === 'error') {
  const titleLayer = instance.findText('Não conseguimos concluir');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Seus dados foram preservados. Te');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
if (tone === 'info') {
  const titleLayer = instance.findText('Seu pedido está em análise');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Avisaremos quando houver uma atu');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
const iconNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && node.name.startsWith('KittyBank/Icon/'),
)[0];
const iconSnippet = iconNode?.type === 'INSTANCE' ? iconNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<Alert
    title="${title}"
    description="${description}"
    tone="${tone}"
    ${iconSnippet ? figma.code`icon={${iconSnippet}}` : ''}
  />`,
  imports: ['import { Alert } from "@kittybank/react"'],
  id: 'kittybank-alert',
  metadata: { nestable: true },
};
