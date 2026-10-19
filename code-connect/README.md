# Code Connect · KittyBank

Esta pasta contém **50 templates parserless**: uma conexão por família (30), incluindo todos os eixos/variantes, e uma por ícone (20).

Cada arquivo usa `.figma.ts`, `import figma from 'figma'` e `export default { example: figma.code\`…\` }`. Não utiliza `figma.connect()`nem arquivos`.figma.tsx`.

`manifest.json` relaciona nome, node ID, URL, implementação React, template, propriedades e valores de variante. As URLs apontam para os componentes mestres da página `design system`, e não para as instâncias de `screens`.

## Validar localmente

Na raiz de `kittybank`:

```sh
npm run typecheck
npm run connect:check
npm run connect:parse
```

O parse gera `.code-connect/parsed.json`, ignorado pelo Git. Não publica e não precisa de token. `connect:check` executa os templates contra snapshots das variantes e confere o JSX gerado com TypeScript, inclusive os componentes aninhados.

O arquivo `figma.config.json` seleciona somente `code-connect/**/*.figma.ts`, com label `React` e linguagem `tsx`. A CLI pode informar que detectou React pelo `package.json`; os arquivos continuam sendo templates parserless, identificados no JSON por `templateData.isParserless`.

## Publicar depois

1. No Figma, confirme que os componentes estão publicados na biblioteca da equipe e que sua conta tem acesso ao Code Connect.
2. Crie um personal access token com os escopos de leitura de arquivos e escrita do Code Connect (`file_content:read` e `code_connect:write`). Mantenha-o fora do repositório.
3. Exporte `FIGMA_ACCESS_TOKEN` no terminal. Na shell zsh desta máquina, você pode usar entrada oculta:

```sh
read -s 'FIGMA_ACCESS_TOKEN?Token Figma: '
export FIGMA_ACCESS_TOKEN
```

4. Confira e publique:

```sh
# Validação sem publicar:
npx figma connect publish --config figma.config.json --dry-run

# Publicação, quando estiver pronto:
npm run connect:publish

# Limpar o token do terminal ao terminar:
unset FIGMA_ACCESS_TOKEN
```

Na primeira publicação, publique o conjunto completo para resolver também ícones e componentes aninhados. Depois, para restringir uma atualização a um template:

```sh
npx figma connect publish --config figma.config.json --file code-connect/Button.figma.ts
```

Um remoto Git não foi criado. Se quiser links de código navegáveis no Dev Mode, adicione posteriormente o remoto do seu provedor e envie o código antes de publicar as conexões. Os comentários `// source=` já indicam os caminhos locais corretos.

## Mapeamentos

- VARIANT → `getEnum()` com todos os valores, convertidos para camelCase nas props React.
- TEXT → `getString()` e leitura do texto renderizado com `findText()` para variantes cujo conteúdo não compartilha a propriedade padrão. Isso preserva mensagens de erro, carregamento e overrides das instâncias.
- BOOLEAN → `getBoolean()`; os snippets emitem explicitamente `true` ou `false`.
- INSTANCE_SWAP → `getInstanceSwap()` + `executeTemplate()` após verificar `type === 'INSTANCE'`.
- Filhos configuráveis → `findLayers()` e execução dos templates correspondentes. Inclui os seis CodeCells do OTP, quatro TabItems, ações do rodapé/modal e ícones. Os resultados são interpolados como seções, sem concatenação de objetos.
- Não existem propriedades SLOT nesta biblioteca. Não foi usado `getSlot()` para simular INSTANCE_SWAP.
- Campos vazios e composer vazio geram `placeholder`; campos preenchidos geram valor inicial. Eventos, dados de backend e rótulos contextuais de ações devem ser conectados pela aplicação.

Ícones decorativos são ocultos de tecnologias assistivas; `IconButton` possui `label`. Ajuste o rótulo genérico “Ação” dos snippets ao contexto de uso. Para `Switch`, forneça um `label` descritivo do controle na aplicação.

`scripts/generate-code-connect.py` recria os templates a partir dos snapshots e dos contratos registrados. Revise mudanças manuais antes de executá-lo, pois a geração substitui os arquivos correspondentes.

Referências oficiais consultadas: [templates](https://developers.figma.com/docs/code-connect/template-files/), [configuração](https://developers.figma.com/docs/code-connect/api/config-file/) e [CLI](https://developers.figma.com/docs/code-connect/cli-reference/).
