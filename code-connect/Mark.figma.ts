// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=13-941
// source=src/components/brand.tsx
// component=Mark
import figma from 'figma';
const instance = figma.selectedInstance;

const tone = instance.getEnum('Tone', { Coral: 'coral', White: 'white' });

export default {
  example: figma.code`<Mark
    tone="${tone}"
  />`,
  imports: ['import { Mark } from "@kittybank/react"'],
  id: 'kittybank-mark',
  metadata: { nestable: true },
};
