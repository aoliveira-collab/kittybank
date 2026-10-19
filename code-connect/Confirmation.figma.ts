// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=12-1000
// source=src/components/feedback.tsx
// component=Confirmation
import figma from 'figma';
const instance = figma.selectedInstance;

const intent = instance.getEnum('Intent', {
  ResumeLater: 'resumeLater',
  ConfirmTransfer: 'confirmTransfer',
});
let title: string | undefined;
let description: string | undefined;
if (intent === 'resumeLater') {
  const titleLayer = instance.findText('Continuar depois?');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Seu progresso será salvo. Você p');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
if (intent === 'confirmTransfer') {
  const titleLayer = instance.findText('Confirmar transferência?');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Envie R$ 250,00 para Ana Oliveir');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
const iconNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && node.name.startsWith('KittyBank/Icon/'),
)[0];
const iconSnippet = iconNode?.type === 'INSTANCE' ? iconNode.executeTemplate().example : undefined;
const primaryActionNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/Button'].includes(node.name),
)[0];
const primaryActionSnippet =
  primaryActionNode?.type === 'INSTANCE' ? primaryActionNode.executeTemplate().example : undefined;
const secondaryActionNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/Button'].includes(node.name),
)[1];
const secondaryActionSnippet =
  secondaryActionNode?.type === 'INSTANCE'
    ? secondaryActionNode.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<Confirmation
    intent="${intent}"
    title="${title}"
    description="${description}"
    ${iconSnippet ? figma.code`icon={${iconSnippet}}` : ''}
    ${primaryActionSnippet ? figma.code`primaryAction={${primaryActionSnippet}}` : ''}
    ${secondaryActionSnippet ? figma.code`secondaryAction={${secondaryActionSnippet}}` : ''}
  />`,
  imports: ['import { Confirmation } from "@kittybank/react"'],
  id: 'kittybank-confirmation',
  metadata: { nestable: true },
};
