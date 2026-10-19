// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-1012
// source=src/components/banking.tsx
// component=SummaryRow
import figma from 'figma';
const instance = figma.selectedInstance;

let label = instance.getString('Label');
let value = instance.getString('Value');
const emphasis = instance.getEnum('Emphasis', { Default: 'default', Total: 'total' });
if (emphasis === 'default') {
  const labelLayer = instance.findText('Destinatário');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('Ana Oliveira');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
}
if (emphasis === 'total') {
  const labelLayer = instance.findText('Total');
  if (labelLayer.type === 'TEXT') label = labelLayer.textContent;
  const valueLayer = instance.findText('R$ 250,00');
  if (valueLayer.type === 'TEXT') value = valueLayer.textContent;
}

export default {
  example: figma.code`<SummaryRow
    label="${label}"
    value="${value}"
    emphasis="${emphasis}"
  />`,
  imports: ['import { SummaryRow } from "@kittybank/react"'],
  id: 'kittybank-summary-row',
  metadata: { nestable: true },
};
