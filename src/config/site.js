export const site = {
  name: 'Nexzo',
  email: import.meta.env?.VITE_CONTACT_EMAIL?.trim() || 'nexzoagency@gmail.com',
  origin: 'https://nexzo-web-studio.vastchair514.chatgpt.site',
  instagram: { handle: '@nexzo_agency', url: 'https://www.instagram.com/nexzo_agency/' },
};

export const navigation = [
  { to: '/projetos', label: 'Projetos' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/precos', label: 'Preços' },
  { to: '/estudio', label: 'O estúdio' },
];
