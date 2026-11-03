import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './app/App';

export function render(pathname) {
  return renderToString(
    <StaticRouter location={pathname}>
      <App />
    </StaticRouter>,
  );
}
