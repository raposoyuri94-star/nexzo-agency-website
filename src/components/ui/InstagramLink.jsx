import { Instagram } from 'lucide-react';
import { site } from '../../config/site';

export default function InstagramLink({ className = '' }) {
  return (
    <a
      className={`instagram-link ${className}`}
      href={site.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Instagram da Nexzo, ${site.instagram.handle} (abre num novo separador)`}
      title={site.instagram.handle}
    >
      <Instagram size={22} strokeWidth={1.65} aria-hidden="true" />
    </a>
  );
}
