// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-699
// source=src/components/navigation.tsx
// component=BottomBar
import figma from 'figma';
const instance = figma.selectedInstance;

const active = instance.getEnum('Active', {
  Home: 'home',
  Cards: 'cards',
  Activity: 'activity',
  Profile: 'profile',
});
const nested = instance.findLayers(
  (node) => node.type === 'INSTANCE' && node.name === 'KittyBank/Navigation/TabItem',
);
const child0 = nested[0]?.type === 'INSTANCE' ? nested[0].executeTemplate().example : undefined;
const child1 = nested[1]?.type === 'INSTANCE' ? nested[1].executeTemplate().example : undefined;
const child2 = nested[2]?.type === 'INSTANCE' ? nested[2].executeTemplate().example : undefined;
const child3 = nested[3]?.type === 'INSTANCE' ? nested[3].executeTemplate().example : undefined;

export default {
  example: figma.code`<BottomBar
    active="${active}"
    children={<>
${child0}${child1}${child2}${child3}
</>}
  />`,
  imports: ['import { BottomBar } from "@kittybank/react"'],
  id: 'kittybank-bottom-bar',
  metadata: { nestable: true },
};
