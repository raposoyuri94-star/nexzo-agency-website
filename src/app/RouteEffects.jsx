import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getPageMetadata } from './pageMetadata';
import { pageUrl } from '../config/site';

export default function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = getPageMetadata(pathname);
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', page.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', page.description);
    let canonical = document.querySelector('link[rel="canonical"]');
    document.querySelector('meta[name="robots"]')?.remove();
    if (page.noindex) {
      canonical?.remove();
      const robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex';
      document.head.appendChild(robots);
    } else {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = pageUrl(page.path);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    const frame = requestAnimationFrame(() =>
      document.querySelector('main h1')?.focus({ preventScroll: true }),
    );
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}
