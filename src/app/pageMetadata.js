import { projects } from '../data/projects.js';

export const publicPages = [
  { path: '/', title: 'Nexzo | Design e desenvolvimento de sites', description: 'Criamos sites com a identidade da sua marca e as funcionalidades de que o seu negócio precisa.' },
  { path: '/projetos', title: 'Projetos | Nexzo', description: 'Conheça os projetos Morrow Coffee e Hair Kulture e os detalhes do trabalho da Nexzo.' },
  ...projects.map((project) => ({ path: `/projetos/${project.slug}`, title: `${project.name} | Projetos Nexzo`, description: project.description })),
  { path: '/servicos', title: 'Serviços | Nexzo', description: 'Design de sites, desenvolvimento em React e identidade visual para o seu negócio.' },
  { path: '/precos', title: 'Preços estimados em meticais | Nexzo', description: 'Consulte as estimativas em MZN para sites, lojas online e identidade visual e prepare o seu pedido de orçamento.' },
  { path: '/estudio', title: 'O estúdio | Nexzo', description: 'Conheça a Nexzo e o nosso processo de design e desenvolvimento de sites.' },
  { path: '/contacto', title: 'Contacto | Nexzo', description: 'Prepare o seu pedido de projeto ou escreva para nexzoagency@gmail.com.' },
  { path: '/privacidade', title: 'Privacidade | Nexzo', description: 'Saiba como funciona o armazenamento dos rascunhos e o envio de pedidos de projeto.' },
];

export function getPageMetadata(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return publicPages.find(({ path }) => path === normalized) || { path: normalized, title: 'Página não encontrada | Nexzo', description: 'Este endereço não existe. Conheça os projetos e serviços da Nexzo.', noindex: true };
}
