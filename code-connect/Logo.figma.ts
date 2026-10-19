// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=5-182
// source=src/components/brand.tsx
// component=Logo
import figma from 'figma';
const instance = figma.selectedInstance;

const tone = instance.getEnum('Tone', { White: 'white', Primary: 'primary', Coral: 'coral' });

export default {
  example: figma.code`<Logo
    tone="${tone}"
  />`,
  imports: ['import { Logo } from "@kittybank/react"'],
  id: 'kittybank-logo',
  metadata: { nestable: true },
};
