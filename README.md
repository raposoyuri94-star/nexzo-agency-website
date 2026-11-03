# Nexzo

Site em português com React, React Router e Vite. As páginas são pré-renderizadas na compilação e ativadas no navegador, mantendo a navegação sem recarregar o documento.

## Desenvolvimento

Requisitos: Node.js 22.12 ou superior e npm. Os testes de navegador usam o Google Chrome instalado.

```sh
npm ci
npm run dev
```

## Comandos

| Comando | Função |
| --- | --- |
| `npm run dev` | Desenvolvimento local |
| `npm run build` | Compilação e pré-renderização das páginas |
| `npm run preview` | Pré-visualização da compilação |
| `npm run test:unit` | Testes dos cálculos e do formulário |
| `npm run test:e2e` | Testes em Chrome para computador e telemóvel |
| `npm test` | Testes unitários e de navegador |

Execute `npm run build` antes dos testes de navegador. Em ambientes sem Chrome, altere o `channel` em `playwright.config.js` para um navegador disponível.

## Organização

```text
src/
  app/                 Rotas, metadados, navegação e gestão de erros
  components/
    layout/            Cabeçalho, rodapé e estrutura partilhada
    projects/          Grelha, capturas e galeria dos projetos
    sections/          Serviços, processo e contacto partilhados
    ui/                Botões, marca, Instagram e perguntas frequentes
  config/              Identidade, contactos e navegação
  data/                Conteúdos e preços editáveis
  features/
    contact/           Formulário, rascunhos e preparação do email
    pricing/           Estimativa e regras de cálculo
  pages/               Conteúdo específico de cada página
  styles/              Variáveis, base, estrutura, componentes e páginas
  entry-server.jsx     Renderização estática para a compilação
  main.jsx             Entrada do navegador e hidratação
scripts/prerender.mjs   HTML por endereço, página 404 e sitemap
tests/unit/            Regras de negócio sem navegador
tests/e2e/             Percursos completos do visitante
public/images/         Capturas dos projetos e imagem do estúdio
```

As regras de estimativa e de preparação do email são funções independentes de React e estão cobertas por testes unitários.

## Páginas

| Endereço | Conteúdo |
| --- | --- |
| `/` | Apresentação breve e projetos em destaque |
| `/projetos` | Portefólio com filtros |
| `/projetos/morrow-coffee` | Apresentação do Morrow Coffee |
| `/projetos/hair-kulture` | Apresentação da Hair Kulture |
| `/servicos` | Serviços, processo e perguntas frequentes |
| `/precos` | Estimativas em meticais e calculadora |
| `/estudio` | Apresentação da Nexzo |
| `/contacto` | Preparação do pedido de projeto |
| `/privacidade` | Informação sobre dados e eliminação do rascunho |

Cada página tem título, descrição e HTML próprios. A compilação gera versões `.html` e `index.html` por diretório para permitir abrir os endereços com ou sem barra final em alojamento estático. Gera também `404.html` e `sitemap.xml`.

## Editar conteúdos

- Contactos e Instagram: `src/config/site.js`.
- Projetos: `src/data/projects.js`.
- Serviços e processo: `src/data/services.js`.
- Perguntas frequentes: `src/data/faqs.js`.
- Preços e âmbito dos planos: `src/data/pricing.js`.
- Regras da estimativa: `src/features/pricing/estimate.js`.
- Metadados e lista de páginas: `src/app/pageMetadata.js`.

Para acrescentar uma página, crie o componente em `src/pages`, a rota em `src/app/App.jsx` e os metadados em `src/app/pageMetadata.js`.

## Preços

Os valores em MZN são estimativas editoriais iniciais, não preços de mercado verificados nem orçamentos finais. Devem ser revistos pelo estúdio quando o âmbito ou os preços comerciais forem definidos.

A calculadora soma o plano escolhido, as páginas adicionais e a identidade visual opcional. Não soma o acompanhamento mensal ao custo inicial. Os parâmetros enviados para o contacto contêm apenas a seleção do projeto, sem dados pessoais.

Domínio, alojamento, conteúdos, ferramentas pagas e serviços externos são orçamentados separadamente. Os prazos e as condições de pagamento são definidos na proposta.

## Contacto e privacidade

O endereço público é `nexzoagency@gmail.com`, configurado em `src/config/site.js`. Pode substituí-lo com `VITE_CONTACT_EMAIL` num ficheiro `.env` e voltar a compilar. O Instagram é `https://www.instagram.com/nexzo_agency/` e aparece como ícone acessível.

O formulário prepara a mensagem para o estúdio. O visitante escolhe a aplicação de email ou o Gmail, revê o texto e confirma o envio. O site não envia mensagens automaticamente, não armazena pedidos num servidor e não confirma uma entrega que não consegue verificar.

O rascunho fica no navegador e pode ser eliminado em `/privacidade`. O formulário funciona quando o armazenamento está indisponível. Os testes inspecionam as ligações sem enviar emails nem abrir contas Gmail.

## Imagens

As capturas de Morrow Coffee e Hair Kulture foram feitas a partir dos projetos locais, sem alterar os ficheiros originais. O site não expõe ligações para os repositórios. As páginas de detalhe esclarecem o caráter demonstrativo dos catálogos e carrinhos.

A imagem do espaço de trabalho é ilustrativa e não representa um escritório real da Nexzo. Origem: https://images.unsplash.com/photo-1497366754035-f200968a6e72

Manrope e DM Sans são carregadas através do Google Fonts, com alternativas locais. O layout respeita movimento reduzido e inclui navegação por teclado, rótulos de formulário e nomes acessíveis para os ícones.
