import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';
import { publicPages, getPageMetadata } from '../src/app/pageMetadata.js';

const directory = path.resolve('dist');
const template = await readFile(path.join(directory, 'index.html'), 'utf8');
const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' });
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx');
  const { site } = await server.ssrLoadModule('/src/config/site.js');
  for (const pathname of [...publicPages.map(({ path: route }) => route), '/404']) {
    const metadata = getPageMetadata(pathname);
    const html = template
      .replace('<div id="root"></div>', `<div id="root">${render(pathname)}</div>`)
      .replace(/<title>.*?<\/title>/, `<title>${escape(metadata.title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*"/, `$1${escape(metadata.description)}"`)
      .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${escape(metadata.title)}"`)
      .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${escape(metadata.description)}"`)
      .replace('<!--page-head-->', metadata.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${site.origin}${pathname}" />`);
    const destination = pathname === '/404' ? path.join(directory, '404.html') : path.join(directory, pathname.slice(1), 'index.html');
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, html);
    // O Vite e alojamentos estáticos resolvem URLs sem barra através de .html.
    if (pathname !== '/' && pathname !== '/404') await writeFile(path.join(directory, `${pathname.slice(1)}.html`), html);
  }
  await writeFile(path.join(directory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPages.map(({ path: route }) => `<url><loc>${site.origin}${route}</loc></url>`).join('')}</urlset>\n`);
  console.log(`Pré-renderizadas ${publicPages.length} páginas e uma página de erro.`);
} finally {
  await server.close();
}
