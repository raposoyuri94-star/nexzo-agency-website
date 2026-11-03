export const site = {
  name: 'Nexzo',
  email: import.meta.env?.VITE_CONTACT_EMAIL?.trim() || 'nexzoagency@gmail.com',
  origin: import.meta.env?.VITE_SITE_ORIGIN || 'https://nexzo-web-studio.vastchair514.chatgpt.site',
  basePath: import.meta.env?.BASE_URL || '/',
  instagram: { handle: '@nexzo_agency', url: 'https://www.instagram.com/nexzo_agency/' },
};

export function assetUrl(pathname) {
  return `${site.basePath}${pathname.replace(/^\/+/, '')}`;
}

export function pageUrl(pathname = '/') {
  return `${site.origin}${site.basePath.replace(/\/$/, '')}${pathname}`;
}

export const navigation = [
  { to: '/projetos', label: 'Projetos' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/precos', label: 'Preços' },
  { to: '/estudio', label: 'O estúdio' },
];
