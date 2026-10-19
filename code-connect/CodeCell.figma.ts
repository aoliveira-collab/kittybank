// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-289
// source=src/components/security.tsx
// component=CodeCell
import figma from 'figma';
const instance = figma.selectedInstance;

let digit = instance.getString('Digit');
const state = instance.getEnum('State', {
  Empty: 'empty',
  Focus: 'focus',
  Filled: 'filled',
  Error: 'error',
});
if (state === 'empty') {
  const digitLayer = instance.findText('—');
  if (digitLayer.type === 'TEXT') digit = digitLayer.textContent;
}
if (state === 'focus') {
  const digitLayer = instance.findText('|');
  if (digitLayer.type === 'TEXT') digit = digitLayer.textContent;
}
if (state === 'filled') {
  const digitLayer = instance.findText('2');
  if (digitLayer.type === 'TEXT') digit = digitLayer.textContent;
}
if (state === 'error') {
  const digitLayer = instance.findText('—');
  if (digitLayer.type === 'TEXT') digit = digitLayer.textContent;
}

export default {
  example: figma.code`<CodeCell
    digit="${digit}"
    state="${state}"
  />`,
  imports: ['import { CodeCell } from "@kittybank/react"'],
  id: 'kittybank-code-cell',
  metadata: { nestable: true },
};
