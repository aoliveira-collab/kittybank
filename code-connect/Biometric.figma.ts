// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-548
// source=src/components/security.tsx
// component=Biometric
import figma from 'figma';
const instance = figma.selectedInstance;

let title = instance.getString('Title');
let instructions = instance.getString('Instructions');
const state = instance.getEnum('State', {
  Ready: 'ready',
  Scanning: 'scanning',
  Success: 'success',
  Error: 'error',
});
if (state === 'ready') {
  const titleLayer = instance.findText('Vamos confirmar que é você');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const instructionsLayer = instance.findText('Posicione o rosto no centro e si');
  if (instructionsLayer.type === 'TEXT') instructions = instructionsLayer.textContent;
}
if (state === 'scanning') {
  const titleLayer = instance.findText('Verificando sua identidade');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const instructionsLayer = instance.findText('Posicione o rosto no centro e si');
  if (instructionsLayer.type === 'TEXT') instructions = instructionsLayer.textContent;
}
if (state === 'success') {
  const titleLayer = instance.findText('Identidade confirmada');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const instructionsLayer = instance.findText('Posicione o rosto no centro e si');
  if (instructionsLayer.type === 'TEXT') instructions = instructionsLayer.textContent;
}
if (state === 'error') {
  const titleLayer = instance.findText('Vamos tentar mais uma vez');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const instructionsLayer = instance.findText('Procure um local iluminado e ret');
  if (instructionsLayer.type === 'TEXT') instructions = instructionsLayer.textContent;
}
const iconNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && node.name.startsWith('KittyBank/Icon/'),
)[0];
const iconSnippet = iconNode?.type === 'INSTANCE' ? iconNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<Biometric
    title="${title}"
    instructions="${instructions}"
    state="${state}"
    ${iconSnippet ? figma.code`icon={${iconSnippet}}` : ''}
  />`,
  imports: ['import { Biometric } from "@kittybank/react"'],
  id: 'kittybank-biometric',
  metadata: { nestable: true },
};
