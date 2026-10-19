// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-250
// source=src/components/onboarding.tsx
// component=ChoiceCard
import figma from 'figma';
const instance = figma.selectedInstance;

const iconInstance = instance.getInstanceSwap('Icon');
const iconCode =
  iconInstance?.type === 'INSTANCE' ? iconInstance.executeTemplate().example : undefined;
let title = instance.getString('Title');
let description = instance.getString('Description');
const state = instance.getEnum('State', {
  Default: 'default',
  Selected: 'selected',
  Disabled: 'disabled',
});
if (state === 'default') {
  const titleLayer = instance.findText('Conta para você');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Pix, cartão e seu dinheiro em um');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
if (state === 'selected') {
  const titleLayer = instance.findText('Conta para você');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Pix, cartão e seu dinheiro em um');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}
if (state === 'disabled') {
  const titleLayer = instance.findText('Conta para você');
  if (titleLayer.type === 'TEXT') title = titleLayer.textContent;
  const descriptionLayer = instance.findText('Pix, cartão e seu dinheiro em um');
  if (descriptionLayer.type === 'TEXT') description = descriptionLayer.textContent;
}

export default {
  example: figma.code`<ChoiceCard
    ${iconCode ? figma.code`icon={${iconCode}}` : ''}
    title="${title}"
    description="${description}"
    state="${state}"
  />`,
  imports: ['import { ChoiceCard } from "@kittybank/react"'],
  id: 'kittybank-choice-card',
  metadata: { nestable: true },
};
