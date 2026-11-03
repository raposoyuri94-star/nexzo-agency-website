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
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl(page.path));
    window.scrollTo({ top: 0, behavior: 'instant' });
    const frame = requestAnimationFrame(() =>
      document.querySelector('main h1')?.focus({ preventScroll: true }),
    );
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}
