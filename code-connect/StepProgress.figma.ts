// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-437
// source=src/components/onboarding.tsx
// component=StepProgress
import figma from 'figma';
const instance = figma.selectedInstance;

let label = instance.getString('Label');
const step = instance.getEnum('Step', { '1': '1', '2': '2', '3': '3' });
if (step === '1') {
  const labelLayer = instance.findText('Etapa 1 de 3');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (step === '2') {
  const labelLayer = instance.findText('Etapa 2 de 3');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (step === '3') {
  const labelLayer = instance.findText('Etapa 3 de 3');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}

export default {
  example: figma.code`<StepProgress
    label="${label}"
    step="${step}"
  />`,
  imports: ['import { StepProgress } from "@kittybank/react"'],
  id: 'kittybank-step-progress',
  metadata: { nestable: true },
};
