// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-533
// source=src/components/navigation.tsx
// component=Header
import figma from 'figma';
const instance = figma.selectedInstance;

let title = instance.getString('Title');
const context = instance.getEnum('Context', {
  Onboarding: 'onboarding',
  Account: 'account',
  Overlay: 'overlay',
});
if (context === 'onboarding') {
  const titleLayer = instance.findText('Abra sua conta');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
}
if (context === 'account') {
  const titleLayer = instance.findText('Minha conta');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
}
if (context === 'overlay') {
  const titleLayer = instance.findText('Como podemos ajudar?');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
}
const leadingNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/IconButton'].includes(node.name),
)[0];
const leadingSnippet =
  leadingNode?.type === 'INSTANCE' ? leadingNode.executeTemplate().example : undefined;
const trailingNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/IconButton'].includes(node.name),
)[1];
const trailingSnippet =
  trailingNode?.type === 'INSTANCE' ? trailingNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<Header
    title="${title}"
    context="${context}"
    ${leadingSnippet ? figma.code`leading={${leadingSnippet}}` : ''}
    ${trailingSnippet ? figma.code`trailing={${trailingSnippet}}` : ''}
  />`,
  imports: ['import { Header } from "@kittybank/react"'],
  id: 'kittybank-header',
  metadata: { nestable: true },
};
