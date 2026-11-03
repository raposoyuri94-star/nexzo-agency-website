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
- Filtros de projetos e janelas de apresentação, sem ligações para o código-fonte.
- Serviços, apresentação do estúdio, processo e perguntas frequentes.
- Navegação móvel, janelas acessíveis pelo teclado e suporte a movimento reduzido.
- Formulário que prepara um email para nexzoagency@gmail.com, com opções para abrir a aplicação de email ou o Gmail.
- Informação de privacidade e opção de apagar o rascunho.

Os textos editáveis do portefólio, dos serviços e das perguntas frequentes estão em `src/content.js`. A interface está em `src/App.jsx`.

## Projetos do portefólio

As imagens em `public/images/projects/` foram capturadas a partir das compilações locais existentes dos projetos do utilizador. Os projetos originais não foram alterados.

- **Morrow Coffee:** projeto de apresentação para café com ementa interativa.
- **Hair Kulture:** loja de demonstração para perucas e tissagens, com catálogo, filtros, favoritos e carrinho.

São projetos desenvolvidos, sem alegações de clientes pagantes, resultados comerciais ou funcionalidades de pagamento. As respetivas páginas de detalhe esclarecem o caráter de demonstração dos catálogos.

## Contacto

O endereço público de contacto é `nexzoagency@gmail.com`, definido em `src/content.js`. Pode substituí-lo com `VITE_CONTACT_EMAIL` num ficheiro `.env` e voltar a compilar.

O botão de contacto abre um formulário com nome, email, serviço, investimento opcional e descrição. Preparar o email não envia dados. O passo seguinte mostra o destinatário e oferece duas opções: abrir a aplicação de email através de `mailto:` ou abrir uma nova mensagem no Gmail. Ambas incluem o destinatário, assunto e resumo preenchidos. O visitante revê a mensagem e confirma o envio na aplicação escolhida.

O formulário não envia emails automaticamente e não guarda pedidos num servidor. O rascunho fica apenas neste navegador. Também é possível descarregar uma cópia do resumo. Os testes verificam as ligações e os respetivos campos sem enviar emails nem abrir uma conta Gmail.

O campo de investimento aceita um valor e uma moeda à escolha. Os rascunhos da versão anterior em inglês continuam a poder ser abertos, com migração dos tipos de serviço.

## Imagens e fontes

A imagem do espaço de trabalho ilustra o ambiente criativo e não representa um escritório real da Nexzo. Origem: https://images.unsplash.com/photo-1497366754035-f200968a6e72

As fontes Manrope e DM Sans são carregadas através do Google Fonts, com alternativas locais. Os logótipos e as imagens dos projetos aparecem nas capturas dos respetivos sites, preservando as identidades originais.
