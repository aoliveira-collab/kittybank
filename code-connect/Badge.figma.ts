// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=12-801
// source=src/components/feedback.tsx
// component=Badge
import figma from 'figma';
const instance = figma.selectedInstance;

const tone = instance.getEnum('Tone', {
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Info: 'info',
});
let label: string | undefined;
if (tone === 'success') {
  const labelLayer = instance.findText('Concluído');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (tone === 'warning') {
  const labelLayer = instance.findText('Pendente');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (tone === 'error') {
  const labelLayer = instance.findText('Falhou');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}
if (tone === 'info') {
  const labelLayer = instance.findText('Em análise');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
}

export default {
  example: figma.code`<Badge
    tone="${tone}"
    label="${label}"
  />`,
  imports: ['import { Badge } from "@kittybank/react"'],
  id: 'kittybank-badge',
  metadata: { nestable: true },
};
