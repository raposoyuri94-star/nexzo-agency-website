import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './app/App';
import { site } from './config/site';

export function render(pathname) {
  return renderToString(
    <StaticRouter
      basename={site.basePath}
      location={`${site.basePath.replace(/\/$/, '')}${pathname}`}
    >
      <App />
    </StaticRouter>,
  );
}
