import { Link } from 'react-router';

export default function Brand({ onClick }) {
  return (
    <Link className="brand" to="/" aria-label="Nexzo, início" onClick={onClick}>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M3 6h7l12 16V6h7v21h-7L10 11v16H3Z" fill="currentColor" />
      </svg>
      <span>
        nexzo<span className="brand-period">.</span>
      </span>
    </Link>
  );
}
