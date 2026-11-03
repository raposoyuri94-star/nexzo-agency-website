export const services = [
  { id: 'design', icon: 'monitor', title: 'Design de sites', description: 'Organizamos os conteúdos e desenhamos as páginas para apresentar a sua marca e facilitar a navegação.', tags: ['Design de interfaces', 'Design responsivo', 'Direção de arte'], includes: ['Estrutura e organização dos conteúdos', 'Design para computador e telemóvel', 'Revisão dos percursos de navegação', 'Preparação dos elementos visuais'] },
  { id: 'development', icon: 'code', title: 'Desenvolvimento', description: 'Desenvolvemos sites rápidos e acessíveis, com as funcionalidades de que o seu negócio precisa.', tags: ['Desenvolvimento React', 'Desempenho', 'Bases de SEO'], includes: ['Sites institucionais e páginas de apresentação', 'Catálogos e interfaces de lojas online', 'Integração de formulários e contactos', 'Verificação antes do lançamento'] },
  { id: 'identity', icon: 'pen', title: 'Identidade visual', description: 'Criamos o logótipo, as cores e a linguagem visual para apresentar a sua marca de forma consistente.', tags: ['Identidade visual', 'Criação de logótipos', 'Manual de marca'], includes: ['Direção visual da marca', 'Criação ou revisão do logótipo', 'Paleta de cores e tipografia', 'Guia de aplicação da identidade'] },
];

export const serviceOptions = [
  { value: 'website', label: 'Um novo site' },
  { value: 'redesign', label: 'Renovar um site' },
  { value: 'store', label: 'Uma loja online' },
  { value: 'identity', label: 'Identidade visual' },
  { value: 'identity-website', label: 'Identidade visual e site' },
  { value: 'other', label: 'Outro projeto' },
];

export const processSteps = [
  { title: 'Conhecer o negócio', description: 'Conversamos sobre o que faz, quem quer alcançar e o que precisa do site. Definimos o âmbito e o orçamento.' },
  { title: 'Desenhar a experiência', description: 'Organizamos os conteúdos e partilhamos o design consigo. Ajustamos os detalhes antes de desenvolver.' },
  { title: 'Desenvolver e lançar', description: 'Construímos o site, verificamos o funcionamento em vários ecrãs e preparamos o lançamento.' },
];
