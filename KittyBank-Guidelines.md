# KittyBank — Guidelines do Design System

Versão 1.1 · revisão Coloring · 19 de outubro de 2026 · Tema Light

[Abra a página design system no Figma](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=2-2).

## 1. Propósito e escopo

KittyBank é um banco fictício próximo, claro e seguro. Sua assinatura é **“Seu dinheiro, em boas patas.”**

Esta versão entrega a base para compor um aplicativo bancário: marca vetorial, fundamentos, componentes nativos, estados e regras de jornada. **Não foram criadas telas de aplicativo.** Os painéis da página são documentação e espécimes de componentes.

A biblioteca contém **30 famílias, 113 variantes, 20 ícones, 87 variáveis, 9 estilos de texto, 2 estilos de efeito e 1 estilo de gradiente**. Componentes mestres ficam à direita; os painéis à esquerda apresentam instâncias para revisão.

### Origem das decisões

- A seção **Coloring** de `app-ref` é a fonte cromática da versão 1.1: coral, pêssego, rosa, terracota, blush, areia e creme.
- A seção **Design System** continua orientando Poppins, controles e navegação.
- A seção **Prototyping references** orientou cadastro progressivo, validação, código, documentos, consentimento, biometria, senha, confirmação e ajuda contextual.
- Os exemplos de banking orientaram saldo, privacidade, cartão, atalhos e transações.
- Os oito valores identificados nas imagens 39 e 40 de Coloring foram incorporados como primitivos. Os tons escuros e neutros de interface são derivados para legibilidade. O gradiente da imagem 37 orienta a composição Sunrise.
- A biblioteca é local e própria: os componentes externos encontrados não foram adotados como dependência de outra marca.

## 2. Princípios

1. **Clareza:** uma ação principal por contexto; nomear a consequência da ação.
2. **Confiança:** mostrar estado, resultado e possibilidade de recuperação.
3. **Continuidade:** preservar dados ao voltar, abrir ajuda ou retomar o cadastro.
4. **Composição:** construir padrões com instâncias e tokens, mantendo a origem compartilhada.
5. **Privacidade:** valores e dados pessoais só aparecem quando necessários.

## 3. Marca

O símbolo combina o contorno de um gato com um gesto de confirmação. O desenho é vetorial e editável. O lettering visual usa “kittybank”; em textos corridos, use **KittyBank**.

Use `Brand/Logo` para a assinatura completa e `Brand/Mark` para o símbolo. As variantes de assinatura são Primary, White e Coral; o símbolo tem versões Coral e White. Primary usa gato ameixa com confirmação coral; Coral usa gato coral com confirmação ameixa; White usa gato branco com confirmação ameixa.

- Largura mínima da assinatura: **130 px**.
- Tamanho mínimo do símbolo: **24 px**.
- Área livre: **metade da altura do símbolo** em todos os lados.
- Prefira White sobre ameixa; Primary sobre branco, rosa e gradiente Sunrise; Coral sobre branco ou pêssego suave. Evite Coral sobre o início coral do gradiente, onde a silhueta perde contraste.
- Preserve proporções. Não rotacione, não estique, não adicione contorno ou sombra.
- Sobre imagens, reserve uma área uniforme que mantenha contraste.
- Para redimensionar a marca, use escala proporcional; não altere apenas a largura do frame.

O arquivo `KittyBank-logo.svg` acompanha estas guidelines e foi exportado do componente do Figma.

## 4. Tokens e cor

### Arquitetura

| Coleção | Quantidade | Função |
|---|---:|---|
| KittyBank · Primitives | 28 | Cores de origem e derivados de contraste; ocultos dos seletores |
| KittyBank · Semantic | 36 | Papéis de interface; aliases dos primitivos |
| KittyBank · Dimensions | 23 | Espaços, raios, dimensões e espessuras |

As 87 variáveis possuem escopos específicos e sintaxe WEB. Exemplo: `color/bg/brand` corresponde a `var(--kb-color-bg-brand)`.

Edite o token semântico para alterar um papel. O tema é **Light**; ameixa é uma superfície forte dentro dele, não um modo Dark completo. Cores de marca e feedback têm papéis independentes.

### Paleta da seção Coloring

| Primitivo | Valor | Papel na identidade |
|---|---|---|
| coral/500 | #FF8A6A | Cor principal e ação |
| peach/300 | #FFB8A2 | Apoio de marca |
| peach/100 | #FFE3D9 | Seleção e superfícies suaves |
| rose/500 | #FF79B0 | Destaque expressivo |
| terracotta/500 | #E07A5F | Estado pressionado |
| blush/300 | #F2A29B | Transição do gradiente |
| sand/300 | #F2CC8F | Final quente do gradiente |
| cream/50 | #F4F1DE | Superfície editorial quente |
| neutral/0 | #FFFFFF | Superfície de interface |

Ameixa #4A202A, coral escuro #923C2D e rosa escuro #AD285E são derivados de contraste, não valores copiados das imagens. Neutros receberam temperatura quente.

### Papéis principais

| Token | Valor | Aplicação |
|---|---|---|
| color/bg/brand | #FF8A6A | Botão principal e seleção ativa |
| color/bg/brand-pressed | #E07A5F | Ação pressionada |
| color/bg/brand-soft | #FFE3D9 | Seleção e superfícies de acolhimento |
| color/bg/brand-strong | #4A202A | Saldo, contraste e progresso |
| color/bg/accent | #FF79B0 | Destaques de identidade |
| color/bg/warm | #F4F1DE | Apoio editorial |
| color/bg/canvas | #FFF8F5 | Fundo da experiência |
| color/bg/surface | #FFFFFF | Campos, cards e overlays |
| color/bg/subtle | #F5EAE5 | Agrupamentos discretos |
| color/text/primary | #39242C | Conteúdo principal |
| color/text/secondary | #6E5058 | Apoio e metadados |
| color/text/brand | #923C2D | Links e texto de marca sobre branco ou pêssego |
| color/text/on-brand | #4A202A | Texto sobre coral, terracota, rosa e Sunrise |
| color/text/inverse | #FFFFFF | Texto sobre ameixa |
| color/icon/brand | #923C2D | Ícones sobre superfícies claras |
| color/icon/on-brand | #4A202A | Ícones sobre ação coral |
| color/border/default | #78616A | Limites de campos |
| color/border/subtle | #DDC9C1 | Separadores decorativos |
| color/border/brand | #923C2D | Limites das ações |
| color/border/focus | #AD285E | Foco em rosa escuro |
| color/text/success | #00523F | Confirmação e crédito |
| color/icon/success | #00523F | Ícones de sucesso |
| color/text/error | #B42318 | Erro |
| color/text/warning | #805500 | Atenção |
| color/text/info | #174DC9 | Informação |
| color/logo/mark | #FF8A6A | Coral do símbolo e detalhe da versão Primary |
| color/logo/detail | #4A202A | Ameixa do símbolo e detalhe das versões claras |

`color/bg/success` usa #CFFBEC, `color/bg/error` #FFF0EE, `color/bg/warning` #FFF3CF e `color/bg/info` #D9EEFF. Verde e azul permanecem apenas como linguagem de feedback. A marca coral não deve ser interpretada como erro: erros têm vermelho escuro, mensagem e contexto próprios.

### Gradiente Sunrise

O estilo de pintura `KittyBank/Brand/Sunrise` usa coral/500 em 0%, blush/300 em 50% e sand/300 em 100%, da esquerda para a direita. Cada parada está vinculada a uma variável. Aplicações: capa da biblioteca e cartão ativo. Use conteúdo ameixa sobre esse gradiente.

Prefira superfícies sólidas para campos, textos extensos e feedback. Rosa é um acento de identidade; não use o rosa claro como foco. O foco usa o derivado escuro #AD285E.

### Migração da versão 1.0

Os IDs existentes foram preservados para manter vínculos de componentes. Nomes cromáticos de semântica foram substituídos por papéis: `color/bg/mint` → `color/bg/brand-soft`; `color/bg/navy` → `color/bg/brand-strong`. A sintaxe CSS acompanha os novos nomes. Primitivos de identidade também foram renomeados para representar suas cores atuais.

Consumidores externos devem atualizar nomes CSS ou adicionar aliases de compatibilidade. Componentes do Figma continuam vinculados pelos mesmos IDs. `text/inverse` continua branco; botões coral agora usam `text/on-brand`, evitando texto branco com contraste insuficiente.

## 5. Tipografia

Família: **Poppins**. Use os estilos compartilhados `KittyBank/…`.

| Estilo | Peso | Tamanho / entrelinha |
|---|---|---|
| Display | Bold | 40 / 48 |
| Heading/Large | SemiBold | 32 / 40 |
| Heading/Medium | SemiBold | 24 / 32 |
| Heading/Small | SemiBold | 20 / 28 |
| Body/Large | Regular | 16 / 24 |
| Body/Small | Regular | 14 / 20 |
| Label | SemiBold | 14 / 20 |
| Caption | Medium | 12 / 16 |
| Amount | SemiBold | 32 / 40 |

Use Caption para metadados, não para instruções essenciais. Formate dinheiro como **R$ 1.234,56** e diferencie entradas e saídas com sinais e descrições. Não reduza a fonte para acomodar valores longos: permita adaptação do layout.

## 6. Espaçamento, forma e elevação

- Escala de espaço: **0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 px**.
- Raios: **0, 8, 12, 16, 24 e 999 px**.
- Controles: raio 8–12; cards: 16–24; overlays: 24; pílulas: 999.
- Botão principal: **56 px** de altura. IconButton: **48 × 48 px**.
- Ícones: grade **24 × 24 px**, traço **1,8 px**, extremidades arredondadas.
- Área interativa mínima: **44 × 44 px**, inclusive para ícones visuais menores.
- Estilos de elevação: `KittyBank/Card` e `KittyBank/Overlay`. Aplicados a cartão e confirmação; evite sombras em todos os elementos.

### Composição futura

Use 390 px como largura inicial de estudo, com margem lateral de 24 px. Os componentes de 360 px são espécimes; ajuste a instância à área disponível, por exemplo 342 px em uma tela de 390 px com margens de 24 px.

Frames verticais e texto adaptável usam Auto Layout; containers internos que ocupam a largura do pai usam Fill. O progresso distribui seus segmentos. Componentes densos, como OTP e barra de navegação, exigem revisão de espaço em larguras menores. Safe areas e teclado pertencem ao layout de tela.

Antes de aprovar futuras telas, verificar 320, 390 e 430 px, textos longos e ampliação de texto. Esta entrega valida os espécimes da biblioteca; não certifica layouts de tela ainda não construídos.

## 7. Inventário dos componentes

Todos usam o prefixo `KittyBank/`.

| Família | Variantes | Eixos |
|---|---:|---|
| [Brand/Logo](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=5-182) | 3 | Tone: Primary, White, Coral |
| [Button](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=6-124) | 15 | Hierarchy: Primary, Secondary, Ghost; State: Default, Pressed, Focus, Disabled, Loading |
| [IconButton](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=6-219) | 4 | State: Default, Pressed, Focus, Disabled |
| [Field/Text](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=6-314) | 10 | State: Empty, Filled, Focus, Error, Disabled; Type: Text, Password |
| [Field/Select](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=6-445) | 5 | State: Empty, Filled, Open, Error, Disabled |
| [Selection/Checkbox](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=6-514) | 4 | State: Unchecked, Checked, Error, Disabled |
| [Selection/Switch](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=6-549) | 3 | State: Off, On, Disabled |
| [Onboarding/ChoiceCard](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-250) | 3 | State: Default, Selected, Disabled |
| [Security/CodeCell](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-289) | 4 | State: Empty, Focus, Filled, Error |
| [Security/OTP](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-359) | 3 | State: Empty, Filled, Error |
| [Onboarding/StepProgress](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-437) | 3 | Step: 1, 2, 3 |
| [Security/DocumentUpload](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-488) | 4 | State: Empty, Uploading, Success, Error |
| [Security/Biometric](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-548) | 4 | State: Ready, Scanning, Success, Error |
| [Security/PasswordRules](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-618) | 2 | State: Pending, Valid |
| [Onboarding/ActionFooter](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=7-692) | 3 | State: Incomplete, Ready, Submitting |
| [Navigation/Header](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-533) | 3 | Context: Onboarding, Account, Overlay |
| [Navigation/TabItem](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-582) | 2 | State: Default, Selected |
| [Navigation/BottomBar](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-699) | 4 | Active: Home, Cards, Activity, Profile |
| [Banking/Balance](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-822) | 3 | State: Visible, Hidden, Loading |
| [Banking/PaymentCard](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-875) | 2 | State: Active, Frozen |
| [Banking/TransactionRow](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-930) | 3 | Type: Incoming, Outgoing, Pending |
| [Banking/QuickAction](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-982) | 3 | State: Default, Pressed, Disabled |
| [Banking/SummaryRow](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=11-1012) | 2 | Emphasis: Default, Total |
| [Feedback/Badge](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=12-801) | 4 | Tone: Success, Warning, Error, Info |
| [Feedback/Alert](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=12-844) | 4 | Tone: Success, Warning, Error, Info |
| [Feedback/StateBlock](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=12-921) | 4 | State: Success, Empty, Error, Loading |
| [Overlay/Confirmation](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=12-1000) | 2 | Intent: ResumeLater, ConfirmTransfer |
| [Help/Message](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=12-1037) | 2 | Author: Assistant, Customer |
| [Help/Composer](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=12-1068) | 3 | State: Empty, Ready, Sending |
| [Brand/Mark](https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id=13-941) | 2 | Tone: Coral, White |

Os 20 ícones estão em `KittyBank/Icon/`: ArrowRight, Back, Close, Check, ChevronDown, Eye, Home, Card, Transfer, User, Help, Lock, Document, Camera, Upload, Bell, Search, Plus, Warning e Spinner.

### Contrato de propriedades

- Use propriedades TEXT disponíveis, como Label, Value, Helper, Title, Description, Message, Amount e Holder.
- Use `Icon` (INSTANCE_SWAP) em Button, IconButton, ChoiceCard, TabItem e QuickAction.
- `Show icon` controla o ícone opcional do botão; Loading mantém seu indicador próprio.
- `Show helper` controla o apoio do campo.
- Textos que definem um estado — erro, carregamento e resultado — são conteúdo da variante. Alguns não compartilham a propriedade do estado padrão, para preservar o significado ao trocar variantes.
- Para mudar a mensagem padrão de um estado em toda a biblioteca, edite o mestre correspondente. Para um contexto específico, use override de texto na instância quando não houver propriedade exposta.
- Instâncias aninhadas preservam vínculo: OTP usa CodeCell; BottomBar usa TabItem; Footer e StateBlock usam Button.
- Não desanexe instâncias. Se uma necessidade se repetir, evolua o componente mestre e documente a mudança.

## 8. Regras de uso e estados

### Ações

Use Primary para avançar ou confirmar; Secondary para alternativa importante; Ghost para ação discreta. Evite duas Primary concorrentes.

Default e Pressed representam interação; Focus representa foco visível; Disabled bloqueia a ação; Loading sinaliza processamento e bloqueia reenvio. O Spinner é um recurso visual; rotação contínua pertence à implementação.

### Formulários

Mantenha rótulo visível. Placeholder não substitui rótulo. Valide após interação apropriada, preservando o valor digitado. Erros devem explicar como corrigir.

`Field/Text` cobre texto e senha; adapte conteúdo e máscara para CPF, telefone, CEP, endereço e dados profissionais. Os exemplos não implementam validação de dados reais. `Field/Select` representa lista aberta e seleção; ligar opções e fechamento faz parte do futuro protótipo.

A senha permanece mascarada por padrão. O controle de visibilidade possui alvo de 44 px. Os critérios em PasswordRules são demonstrativos e devem ser alinhados com produto antes de implementação.

### Consentimento e preferências

Checkbox representa aceite explícito e começa desmarcado. Switch representa preferência com efeito imediato. Não use Switch para aceite de termos.

### Código, documento e biometria

OTP possui seis posições. Na implementação, usar um input acessível com suporte a colar e autopreenchimento. Tempo de reenvio, expiração e limite de tentativas são regras de produto; o “00:30” é exemplo de conteúdo.

DocumentUpload separa vazio, envio, sucesso e erro. Sucesso requer confirmação do serviço. Biometric separa preparação, verificação, sucesso e erro; oferecer alternativa acessível e tratamento para permissão negada.

### Banking

Saldo pode estar visível, oculto ou carregando. Não trate carregamento como saldo zero. Propague a preferência de privacidade aos demais resumos na futura aplicação.

Cartões mostram somente os quatro últimos dígitos. Frozen combina indicação textual e ícone. Transações distinguem crédito, débito e pendência por conteúdo; pendência não equivale a conclusão.

SummaryRow serve para revisão e comprovante. Apresente destinatário, valor, data e taxas antes de confirmar. Os dados da biblioteca são fictícios.

### Feedback e ajuda

Alert é persistente; Badge é resumo de status; StateBlock representa vazio, carregamento, erro ou sucesso. Operações financeiras precisam de confirmação persistente, não apenas toast.

Overlay/Confirmation é conteúdo reutilizável de diálogo. Ao abrir: posicionar foco; ao fechar: devolver foco à origem. Modalidade, backdrop, Escape e navegação serão definidos no protótipo ou implementação.

Help/Message e Help/Composer são peças de conversa. Ajuda deve preservar o cadastro. Não pedir senha ou código de segurança no chat.

## 9. Contrato da futura jornada navegável

A sequência abaixo organiza as referências; ela ainda não foi desenhada como telas:

| Momento | Componentes principais | Transição esperada |
|---|---|---|
| Escolha do produto | ChoiceCard, Button | Selecionar uma opção e avançar |
| Dados pessoais | Header, Field/Text, StepProgress, ActionFooter | Incomplete → Ready após validação |
| Verificação do contato | OTP, Alert | Código válido avança; inválido preserva contexto |
| Documento e termos | Select, DocumentUpload, Checkbox | Avançar após validação e consentimento |
| Endereço e profissão | Text, Select, ActionFooter | Preservar dados ao voltar |
| Identidade e senha | Biometric, Text/Password, PasswordRules | Confirmar requisitos antes do envio |
| Conclusão | StateBlock | Sucesso somente após confirmação |
| Conta autenticada | Header, Balance, BottomBar | Destinos estáveis de navegação |
| Movimentação | QuickAction, SummaryRow, Confirmation, TransactionRow | Revisar → autenticar → processar → resultado |
| Ajuda | Header/Overlay, Message, Composer | Abrir e fechar sem perder preenchimento |

Macroetapas de progresso sugeridas: **Dados, Segurança e Conclusão**. A quantidade de campos não determina o percentual.

Regras essenciais:

1. Incomplete → Ready somente quando os dados obrigatórios forem válidos.
2. Ready → Submitting → Success ou Error.
3. Durante Submitting, bloquear duplicidade de envio.
4. Voltar preserva dados; salvar e sair exige confirmação contextual.
5. Erro preserva informações e oferece recuperação.
6. Sucesso de cadastro não deve ser confundido com aprovação de um produto sob análise.

### Interações já configuradas

Checkbox alterna Unchecked/Checked; Switch alterna Off/On; o controle do saldo alterna Visible/Hidden. São interações locais CHANGE_TO com dissolve de 150 ms.

Os demais estados estão disponíveis como variantes. Navegação entre telas, persistência, serviços, autenticação, teclado, câmera, reenvio e animações contínuas **não foram implementados nesta etapa**.

## 10. Acessibilidade e conteúdo

Alvos de projeto: contraste textual mínimo de 4,5:1 e limites de controles de 3:1. Pares calculados nesta entrega:

| Combinação | Contraste aproximado |
|---|---:|
| Ameixa sobre coral | 5,94:1 |
| Ameixa sobre terracota pressionada | 4,65:1 |
| Ameixa sobre rosa | 5,63:1 |
| Texto principal sobre branco | 14,36:1 |
| Texto secundário sobre branco | 7,12:1 |
| Texto de marca sobre pêssego suave | 5,93:1 |
| Sucesso sobre sua superfície | 8,19:1 |
| Erro sobre sua superfície | 5,93:1 |
| Atenção sobre sua superfície | 5,90:1 |
| Informação sobre sua superfície | 5,99:1 |
| Borda de campo sobre branco | 5,65:1 |
| Foco rosa escuro sobre branco | 6,48:1 |

Botões coral usam texto ameixa e borda de marca. O progresso usa ameixa para manter distinção. Separadores sutis não são o único indicador de controles. Disabled comunica indisponibilidade; não deve carregar instrução essencial com baixo contraste.

Na futura implementação: rótulos acessíveis para ações de ícone, ordem de foco previsível, anúncio de erros e resultados, apoio a tamanho de texto e redução de movimento. A revisão visual do Figma não substitui teste com tecnologias assistivas.

Tom de voz: direto, acolhedor e específico. Use “Revise este campo para continuar”, “Documento recebido” e “Tentar novamente”. Evite códigos técnicos, culpa do usuário, promessas de aprovação e brincadeiras em erros financeiros.

## 11. Evolução e manutenção

1. Verifique se a necessidade já cabe em propriedade, variante ou composição.
2. Prefira nova propriedade a duplicar o componente por conteúdo ou ícone.
3. Mantenha matrizes pequenas; se crescerem demais, extraia subcomponentes.
4. Vincule cores, espaçamentos, raios e tipografia aos fundamentos existentes.
5. Revise estados padrão, foco, indisponibilidade, processamento, erro e sucesso conforme o comportamento.
6. Teste conteúdo longo, redimensionamento e dependências aninhadas.
7. Registre mudanças de API e migre instâncias antes de remover variantes.

A biblioteca está criada no arquivo solicitado. Publicação compartilhada e integração Code Connect não fazem parte desta entrega; não foi fornecida uma base de código para mapear componentes de implementação.

## 12. Verificação desta versão

- 30 component sets, 113 variantes e 20 componentes de ícone.
- 87 variáveis com sintaxe WEB e escopos específicos; aliases verificados.
- Tipografia e efeitos compartilhados.
- Inspeção visual dos painéis, correções de dimensionamento, textos de estado, contraste e OTP.
- Auditoria final dos limites internos dos componentes sem ocorrências pendentes.
- Nenhuma tela de aplicativo criada; referências em `app-ref` preservadas.


## Histórico 1.1 — Coloring

Identidade revisada a partir da seção Coloring: paleta quente, variantes de logo renomeadas, gradiente vinculado, novos tokens de conteúdo sobre marca e sucesso independente. As 30 famílias e 113 variantes foram mantidas. Vínculos, limites e aplicações visuais foram revisados; aliases quebrados e problemas de limites: zero.
