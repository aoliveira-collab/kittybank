// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-822
// source=src/components/banking.tsx
// component=Balance
import figma from 'figma';
const instance = figma.selectedInstance;

let amount = instance.getString('Amount');
const state = instance.getEnum('State', {
  Visible: 'visible',
  Hidden: 'hidden',
  Loading: 'loading',
});
const iconNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/Icon/Eye'].includes(node.name),
)[0];
const iconSnippet = iconNode?.type === 'INSTANCE' ? iconNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<Balance
    amount="${amount}"
    state="${state}"
    ${iconSnippet ? figma.code`icon={${iconSnippet}}` : ''}
  />`,
  imports: ['import { Balance } from "@kittybank/react"'],
  id: 'kittybank-balance',
  metadata: { nestable: true },
};
