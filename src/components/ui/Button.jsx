import { Link } from 'react-router';

export default function Button({
  children,
  to,
  href,
  secondary = false,
  className = '',
  ...props
}) {
  const classNames =
    `button ${secondary ? 'button-secondary' : 'button-primary'} ${className}`.trim();
  if (to)
    return (
      <Link to={to} className={classNames} {...props}>
        {children}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={classNames} {...props}>
        {children}
      </a>
    );
  return (
    <button type="button" className={classNames} {...props}>
      {children}
    </button>
  );
}
