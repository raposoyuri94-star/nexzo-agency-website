// Estimativas editoriais iniciais em MZN. Atualizar aqui quando os preços forem revistos.
export const pricingPlans = [
  { id: 'essencial', name: 'Site essencial', subtitle: 'Uma presença simples para começar', min: 12000, max: 20000, service: 'website', scope: 'Uma página', includes: ['Uma página com as secções do negócio', 'Design para computador e telemóvel', 'Contactos por email ou redes sociais', 'Preparação para publicação'] },
  { id: 'institucional', name: 'Site institucional', subtitle: 'Espaço para apresentar a sua empresa', min: 25000, max: 45000, service: 'website', scope: 'Até 5 páginas', featured: true, includes: ['Até 5 páginas com navegação própria', 'Design adaptado à identidade da marca', 'Formulário de contacto', 'Metadados e estrutura para pesquisa'] },
  { id: 'loja', name: 'Loja online', subtitle: 'Uma base para o seu catálogo', min: 45000, max: 80000, service: 'store', scope: 'Catálogo e percursos de compra', includes: ['Design do catálogo e das páginas de produto', 'Pesquisa e filtros de produtos', 'Carrinho e preparação do percurso de compra', 'Integrações de pagamento definidas na proposta'] },
  { id: 'identidade', name: 'Identidade visual', subtitle: 'Uma linguagem própria para a marca', min: 8000, max: 18000, service: 'identity', scope: 'Identidade da marca', includes: ['Direção visual e logótipo', 'Paleta de cores e tipografia', 'Versões para utilização digital', 'Guia de aplicação da identidade'] },
];

export const pricingExtras = { extraPage: { min: 2500, max: 4500 }, maintenance: { min: 2500, max: 5000 } };
