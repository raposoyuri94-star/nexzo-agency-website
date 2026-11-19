import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './app/App';
import { publicPages } from './app/pageMetadata';
import { site } from './config/site';
import './styles/index.css';

const basename = site.basePath.replace(/\/$/, '');
const requestedPath = window.location.pathname;
if (requestedPath.startsWith(`${basename}/`) && requestedPath.endsWith('.html')) {
  const pathname =
    requestedPath
      .slice(basename.length)
      .replace(/\/index\.html$/, '/')
      .replace(/\.html$/, '')
      .replace(/\/+$/, '') || '/';
  if (publicPages.some((page) => page.path === pathname))
    window.history.replaceState(
      window.history.state,
      '',
      `${basename}${pathname}${window.location.search}${window.location.hash}`,
    );
}

const root = document.getElementById('root');
const application = (
  <React.StrictMode>
    <BrowserRouter basename={site.basePath}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (root.hasChildNodes()) hydrateRoot(root, application);
else createRoot(root).render(application);
