// url=https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-618
// source=src/components/security.tsx
// component=PasswordRules
import figma from 'figma';
const instance = figma.selectedInstance;

const state = instance.getEnum('State', { Pending: 'pending', Valid: 'valid' });
const nested = instance.findLayers(
  (node) => node.type === 'INSTANCE' && node.name.startsWith('KittyBank/Icon/'),
);
const child0 = nested[0]?.type === 'INSTANCE' ? nested[0].executeTemplate().example : undefined;
const child1 = nested[1]?.type === 'INSTANCE' ? nested[1].executeTemplate().example : undefined;
const child2 = nested[2]?.type === 'INSTANCE' ? nested[2].executeTemplate().example : undefined;
const rule0 = instance.findText('Pelo menos 8 caracteres');
const ruleText0 = rule0.type === 'TEXT' ? rule0.textContent : 'Pelo menos 8 caracteres';
const rule1 = instance.findText('Uma letra e um número');
const ruleText1 = rule1.type === 'TEXT' ? rule1.textContent : 'Uma letra e um número';
const rule2 = instance.findText('Um caractere especial');
const ruleText2 = rule2.type === 'TEXT' ? rule2.textContent : 'Um caractere especial';

export default {
  example: figma.code`<PasswordRules
    state="${state}"
    icons={[${child0}, ${child1}, ${child2}]}
    rules={["${ruleText0}", "${ruleText1}", "${ruleText2}"]}
  />`,
  imports: ['import { PasswordRules } from "@kittybank/react"'],
  id: 'kittybank-password-rules',
  metadata: { nestable: true },
};
