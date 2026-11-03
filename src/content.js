import { Monitor, Code2, PenTool } from 'lucide-react';

export const PROJECTS = [
  {
    id: 'morrow',
    name: 'Morrow Coffee',
    category: 'Café e gastronomia',
    kind: 'Design e desenvolvimento',
    tags: ['Design', 'Desenvolvimento'],
    summary: 'O tempo de um bom café, em cada detalhe.',
    description: 'Um site de café com uma identidade em tons de castanho e creme. As imagens dos produtos dão o tom à experiência, enquanto a ementa interativa e o guia de bebidas convidam a descobrir o próximo café favorito.',
    image: '/images/projects/morrow.jpg',
    detailImage: '/images/projects/morrow-detail.jpg',
    previewLabel: 'Morrow Coffee',
    repositoryUrl: 'https://github.com/raposoyuri94-star/Template-Website',
    deliverables: ['Design adaptado a todos os ecrãs', 'Ementa com filtros por categoria', 'Apresentação de produtos e guia de cafés', 'Desenvolvimento em React'],
    note: 'Projeto de apresentação para café. A ementa e os preços são demonstrativos; não inclui encomendas online.',
  },
  {
    id: 'hair-kulture',
    name: 'Hair Kulture',
    category: 'Beleza e cuidados capilares',
    kind: 'Design e desenvolvimento de loja',
    tags: ['Design', 'Desenvolvimento', 'Lojas online'],
    summary: 'Uma presença digital com personalidade.',
    description: 'Uma loja de demonstração para perucas e tissagens, com uma identidade em rosa e branco. O catálogo permite explorar texturas, pesquisar produtos, guardar favoritos e experimentar o carrinho numa experiência adaptada ao telemóvel.',
    image: '/images/projects/hair-kulture.jpg',
    detailImage: '/images/projects/hair-kulture-detail.jpg',
    previewLabel: 'Hair Kulture',
    repositoryUrl: 'https://github.com/raposoyuri94-star/hair-kulture',
    deliverables: ['Design de loja e catálogo de produtos', 'Pesquisa e filtros por textura', 'Favoritos e carrinho de demonstração', 'Desenvolvimento em React'],
    note: 'Projeto de demonstração. Não inclui processamento de pagamentos nem envio de encomendas.',
  },
];

export const SERVICES = [
  { icon: Monitor, title: 'Design de sites', description: 'Um site com a sua identidade. Páginas bem pensadas, navegação intuitiva e detalhes que dão vontade de ficar.', tags: ['Design de interfaces', 'Design responsivo', 'Direção de arte'] },
  { icon: Code2, title: 'Desenvolvimento', description: 'Bonito por fora. Bem construído por dentro. Sites rápidos e acessíveis, preparados para acompanhar o seu negócio.', tags: ['Desenvolvimento React', 'Desempenho', 'Bases de SEO'] },
  { icon: PenTool, title: 'Identidade visual', description: 'Mais do que um bom logótipo. Uma linguagem visual própria para que as pessoas certas reconheçam a sua marca.', tags: ['Identidade visual', 'Criação de logótipos', 'Manual de marca'] },
];

export const FAQS = [
  { question: 'Com que tipos de negócios trabalham?', answer: 'Trabalhamos com pequenos negócios, marcas independentes e pessoas que querem dar forma a uma ideia. Quer esteja a começar ou a renovar a sua presença digital, adaptamos o projeto aos seus objetivos.' },
  { question: 'Quanto tempo demora a criar um site?', answer: 'Depende do número de páginas, dos conteúdos e das funcionalidades. Depois de conhecer o seu projeto, combinamos um calendário realista, com etapas claras para o design, o desenvolvimento e o lançamento.' },
  { question: 'Quanto custa um projeto?', answer: 'Cada projeto tem um orçamento próprio. Conte-nos o que pretende criar e, se possível, indique o investimento que tem em mente. Propomos uma abordagem adequada e apresentamos um orçamento antes de começar.' },
  { question: 'Podem renovar o meu site atual?', answer: 'Sim. Podemos repensar o design, melhorar a organização dos conteúdos e reconstruir o site em React. Primeiro analisamos o que funciona, o que pode melhorar e o que pretende alcançar com a nova versão.' },
  { question: 'O meu site vai funcionar no telemóvel?', answer: 'Sim. Criamos os sites para telemóveis, tablets e computadores, com texto legível, controlos acessíveis e páginas que se adaptam ao espaço disponível.' },
  { question: 'O que acontece depois do lançamento?', answer: 'Apresentamos o funcionamento do novo site e conversamos sobre o acompanhamento de que precisa. A manutenção, as atualizações de conteúdo e as novas funcionalidades podem ser orçamentadas à parte, com condições claras.' },
];

export const SERVICE_OPTIONS = [
  { value: 'website', label: 'Um novo site' },
  { value: 'redesign', label: 'Renovar um site' },
  { value: 'identity', label: 'Identidade visual' },
  { value: 'identity-website', label: 'Identidade visual e site' },
  { value: 'other', label: 'Outro projeto' },
];
