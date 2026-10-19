// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-488
// source=src/components/security.tsx
// component=DocumentUpload
import figma from 'figma';
const instance = figma.selectedInstance;

let title = instance.getString('Title');
let description = instance.getString('Description');
const state = instance.getEnum('State', {
  Empty: 'empty',
  Uploading: 'uploading',
  Success: 'success',
  Error: 'error',
});
if (state === 'empty') {
  const titleLayer = instance.findText('Envie seu documento');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Frente legível, sem reflexos ou ');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
if (state === 'uploading') {
  const titleLayer = instance.findText('Enviando documento…');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Aguarde a confirmação do envio.');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
if (state === 'success') {
  const titleLayer = instance.findText('Documento recebido');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Você já pode continuar.');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
if (state === 'error') {
  const titleLayer = instance.findText('Não foi possível enviar');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Confira a conexão e tente novame');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
const iconNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && node.name.startsWith('KittyBank/Icon/'),
)[0];
const iconSnippet = iconNode?.type === 'INSTANCE' ? iconNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<DocumentUpload
    title="${title}"
    description="${description}"
    state="${state}"
    ${iconSnippet ? figma.code`icon={${iconSnippet}}` : ''}
  />`,
  imports: ['import { DocumentUpload } from "@kittybank/react"'],
  id: 'kittybank-document-upload',
  metadata: { nestable: true },
};
