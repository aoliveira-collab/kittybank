# KittyBank · React Design System

Repositório local da biblioteca KittyBank, derivada da página [design system no Figma](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=2-2). Identidade Coloring 1.1: coral, pêssego, ameixa e gradiente Sunrise.

**30 famílias, 113 variantes, 20 ícones, 87 variáveis e 50 templates Code Connect parserless.** React com TypeScript, CSS com aliases de tokens e fontes Poppins locais. Não depende de Tailwind ou de um roteador.

## Executar

Requer Node.js 22.12+ e npm. As dependências já foram instaladas nesta máquina; em outra instalação, use `npm ci`.

```sh
cd /Users/aoliveira/Desktop/codezinho/kittybank
npm run dev
```

O Vite informa o endereço local. O catálogo inclui todas as variantes e um espaço de interação com campos, OTP, seleção, saldo, mensagens e modal.

```sh
npm run typecheck
npm test
npm run build
npm run build:catalog
npm run connect:check
npm run connect:parse
```

`dist/` contém o pacote ESM, declarações TypeScript e CSS. `catalog-dist/` contém o catálogo estático. O build da biblioteca incorpora os SVGs utilizados e a fonte latina no bundle; não há dependência de URLs temporárias do Figma.

Os testes foram executados com o Google Chrome instalado nesta máquina:

```sh
PLAYWRIGHT_CHANNEL=chrome npm run test:browser
```

## Estrutura

```text
src/components/       Componentes, interfaces de props e ícones React
src/styles/           CSS da biblioteca e tokens gerados
src/tokens.ts         Tokens tipados, aliases e IDs de origem
src/assets/figma/     SVGs originais baixados do Figma
catalog/              Catálogo com todas as variantes e controles interativos
code-connect/         50 templates .figma.ts, manifesto e instruções CLI
figma/                Snapshots de propriedades, variantes, tokens e contexto visual
scripts/              Geração de tokens/templates e validação de snippets
tests/                Testes de interação e navegador
KittyBank-Guidelines.md  Diretrizes originais, preservadas
KittyBank-logo.svg       Logo original, preservado
```

## Consumir em outro projeto React

Compile e empacote a biblioteca para instalá-la em outro projeto React:

```sh
# Na pasta kittybank:
npm run build
npm pack

# No projeto consumidor:
npm install /Users/aoliveira/Desktop/codezinho/kittybank/kittybank-react-1.0.0.tgz
```

```tsx
import { useState } from 'react';
import { Button, TextField, Balance, BottomBar, type TabName } from '@kittybank/react';
import '@kittybank/react/styles.css';

export function AccountExample() {
  const [name, setName] = useState('Ana Oliveira');
  const [tab, setTab] = useState<TabName>('home');
  return (
    <main className="kb-theme" style={{ maxWidth: 390, padding: 24 }}>
      <TextField
        label="Nome completo"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Balance amount="R$ 5.634,12" />
      <Button label="Continuar" onClick={() => console.log('Continuar com', name)} />
      <BottomBar active={tab} onNavigate={setTab} />
    </main>
  );
}
```

O nome `@kittybank/react` é o identificador local do pacote, não uma publicação no npm. O repositório foi inicializado em Git sem configurar remoto. `private: true` evita publicação acidental do pacote; Code Connect pode ser publicado independentemente.

## Contratos

- `state`, `tone`, `hierarchy`, `type`, `context` e `intent` correspondem aos eixos do Figma em camelCase: `ConfirmTransfer` → `confirmTransfer`.
- Os componentes aceitam `className`. As props específicas são exportadas junto com cada componente. Consulte `src/components/` e o catálogo.
- Texto digitável: use `value` + `onChange` em `TextField`; `defaultValue` para entradas não controladas. O texto de exemplo do estado Empty vira placeholder nos templates.
- `SelectField`: `value`/`onValueChange` ou `defaultValue`. Suporta setas, Home, End, Enter, Escape e clique fora. Forneça `options` da aplicação; `name` inclui um campo oculto para submissão.
- `Checkbox` e `Switch`: `checked`/`onCheckedChange` ou `defaultChecked`. O `state` define a aparência/seleção inicial; para controlar a seleção depois da montagem, use `checked`.
- `Balance`: `hidden`/`onHiddenChange` para controlar privacidade; sem essas props, alterna internamente. O valor fica fora do DOM quando oculto.
- `OTP`: `value`/`onValueChange`, colagem, avanço e retorno por teclado; `onComplete` ao completar seis dígitos. O consumidor realiza validação e reenvio. A prop `cells` permite representar instâncias aninhadas de Figma; para entrada funcional integrada, use o OTP sem substituir `cells`.
- `DocumentUpload` entrega um `File` via `onFileSelect`; o consumidor envia e define `state`. `Biometric` apresenta orientação/estado e callbacks para iniciar ou usar outra forma de verificação. Não executa KYC nem solicita câmera por conta própria.
- `Confirmation open={...}` usa `<dialog>` nativo, foco modal, Escape, retorno do foco e callbacks. Sem `open`, renderiza o painel estático para composição e correspondência com o Figma. A aplicação deve fechar o modal em `onClose`/`onConfirm`.
- `Composer`: `message`/`onMessageChange` ou `defaultMessage`; `onSend` recebe o texto. Mensagens vazias e envios simultâneos são bloqueados.
- `BottomBar`, botões e ações recebem callbacks, sem impor navegação. Slots React preservam filhos configuráveis vindos do Code Connect.
- Campos, textos e layouts usam largura flexível; dimensões de ícone e alvo de toque seguem o design system. `focus-visible` real acompanha as variantes de foco. Animação respeita `prefers-reduced-motion`.

Os componentes são uma base de interface. Validação de CPF, autenticação, autorização, upload, câmera, regras bancárias e persistência pertencem à aplicação consumidora. Exemplos do catálogo usam dados fictícios.

## Tokens e evolução

`figma/tokens.snapshot.json` registra as 87 variáveis, seus aliases e os estilos. `npm run tokens:build` gera `src/styles/tokens.css` e `src/tokens.ts` a partir desse snapshot.

```css
.minha-area {
  background: var(--kb-color-bg-canvas);
  color: var(--kb-color-text-primary);
  padding: var(--kb-space-24);
}
```

O tema disponível é Light. A superfície ameixa não representa um tema dark completo. Para atualizar a biblioteca, capture as mudanças do Figma, revise as props e seus usos, atualize os snapshots e regenere os arquivos. Os scripts não consultam nem alteram o arquivo remoto automaticamente.

## Code Connect

Veja [code-connect/README.md](code-connect/README.md) para validar, autenticar e publicar posteriormente pela CLI. Os 50 templates foram preparados localmente; esta entrega não publica conexões no Figma.

## Validação

- TypeScript da biblioteca, catálogo e templates.
- Testes das interações dos controles.
- Geração e checagem de tipos dos snippets de 113 variantes + 20 ícones contra as props React.
- Parse dos 50 templates pela CLI oficial `@figma/code-connect` 2.0.2.
- Catálogo em 320, 390, 430 e 1440 px e comportamento de foco do modal no Google Chrome.

`connect:check` usa snapshots e um adaptador local das APIs parserless. Isso testa cobertura e JSX, mas não substitui o preview/publicação no serviço do Figma. A validação de acessibilidade cobre os comportamentos testados; não constitui certificação completa WCAG.
