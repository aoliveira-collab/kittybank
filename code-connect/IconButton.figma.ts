// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=6-219
// source=src/components/controls.tsx
// component=IconButton
import figma from 'figma';
const instance = figma.selectedInstance;

const iconInstance = instance.getInstanceSwap('Icon');
const iconCode =
  iconInstance?.type === 'INSTANCE' ? iconInstance.executeTemplate().example : undefined;
const state = instance.getEnum('State', {
  Default: 'default',
  Pressed: 'pressed',
  Focus: 'focus',
  Disabled: 'disabled',
});
const accessibleLabel =
  iconInstance?.type === 'INSTANCE'
    ? ((
        {
          'KittyBank/Icon/Back': 'Voltar',
          'KittyBank/Icon/Close': 'Fechar',
          'KittyBank/Icon/Help': 'Ajuda',
          'KittyBank/Icon/Eye': 'Mostrar ou ocultar',
          'KittyBank/Icon/ArrowRight': 'Enviar',
        } as Record<string, string>
      )[iconInstance.name] ?? 'Ação')
    : 'Ação';

export default {
  example: figma.code`<IconButton
    ${iconCode ? figma.code`icon={${iconCode}}` : ''}
    state="${state}"
    label="${accessibleLabel}"
  />`,
  imports: ['import { IconButton } from "@kittybank/react"'],
  id: 'kittybank-icon-button',
  metadata: { nestable: true },
};
