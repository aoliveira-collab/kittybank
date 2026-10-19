// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-692
// source=src/components/onboarding.tsx
// component=ActionFooter
import figma from 'figma';
const instance = figma.selectedInstance;

const state = instance.getEnum('State', {
  Incomplete: 'incomplete',
  Ready: 'ready',
  Submitting: 'submitting',
});
const progressNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/Onboarding/StepProgress'].includes(node.name),
)[0];
const progressSnippet =
  progressNode?.type === 'INSTANCE' ? progressNode.executeTemplate().example : undefined;
const actionNode = instance.findLayers(
  (node) => node.type === 'INSTANCE' && ['KittyBank/Button'].includes(node.name),
)[0];
const actionSnippet =
  actionNode?.type === 'INSTANCE' ? actionNode.executeTemplate().example : undefined;

export default {
  example: figma.code`<ActionFooter
    state="${state}"
    ${progressSnippet ? figma.code`progress={${progressSnippet}}` : ''}
    ${actionSnippet ? figma.code`action={${actionSnippet}}` : ''}
  />`,
  imports: ['import { ActionFooter } from "@kittybank/react"'],
  id: 'kittybank-action-footer',
  metadata: { nestable: true },
};
