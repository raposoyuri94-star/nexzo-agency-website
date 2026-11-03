# Nexzo

Site em português para a Nexzo, um estúdio de design e desenvolvimento de sites. Construído com React, Vite e ícones Lucide.

## Executar localmente

```sh
npm install
npm run dev
```

## Compilar para produção

```sh
npm run build
npm run preview
```

## Conteúdos

- Identidade Nexzo com logótipo e favicon próprios.
- Portefólio com os projetos Morrow Coffee e Hair Kulture.
- Capturas reais das páginas iniciais e de detalhes dos dois projetos.
- Filtros de projetos e janelas de apresentação com ligações para os respetivos repositórios.
- Serviços, apresentação do estúdio, processo e perguntas frequentes.
- Navegação móvel, janelas acessíveis pelo teclado e suporte a movimento reduzido.
- Formulário com rascunho local e resumo do projeto em português para descarregar.
- Informação de privacidade e opção de apagar o rascunho.

Os textos editáveis do portefólio, dos serviços e das perguntas frequentes estão em `src/content.js`. A interface está em `src/App.jsx`.

## Projetos do portefólio

As imagens em `public/images/projects/` foram capturadas a partir das compilações locais existentes dos projetos do utilizador. Os projetos originais não foram alterados.

- **Morrow Coffee:** projeto de apresentação para café com ementa interativa. Código: https://github.com/raposoyuri94-star/Template-Website
- **Hair Kulture:** loja de demonstração para perucas e tissagens, com catálogo, filtros, favoritos e carrinho. Código: https://github.com/raposoyuri94-star/hair-kulture

São projetos desenvolvidos, sem alegações de clientes pagantes, resultados comerciais ou funcionalidades de pagamento. As respetivas páginas de detalhe esclarecem o caráter de demonstração dos catálogos.

## Contacto

Copie `.env.example` para `.env` e defina `VITE_CONTACT_EMAIL` com o endereço real do estúdio. Volte a compilar depois da alteração.

Com um endereço configurado, o formulário abre a aplicação de email do visitante com o resumo do projeto; o envio é feito pelo visitante. Sem um endereço, descarrega um ficheiro de texto e informa que nenhum dado foi enviado. Não existe um servidor de submissão.

O campo de investimento aceita um valor e uma moeda à escolha. Os rascunhos da versão anterior em inglês continuam a poder ser abertos, com migração dos tipos de serviço.

## Imagens e fontes

A imagem do espaço de trabalho ilustra o ambiente criativo e não representa um escritório real da Nexzo. Origem: https://images.unsplash.com/photo-1497366754035-f200968a6e72

As fontes Manrope, DM Sans e Kalam são carregadas através do Google Fonts, com alternativas locais. Os logótipos e as imagens dos projetos aparecem nas capturas dos respetivos sites, preservando as identidades originais.
