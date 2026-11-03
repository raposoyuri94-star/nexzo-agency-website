export default function PageIntro({ label, title, description, children }) {
  return (
    <header className="page-intro container">
      {label && <p className="section-label">{label}</p>}
      <h1 tabIndex={-1}>{title}</h1>
      {description && <p className="page-description">{description}</p>}
      {children}
    </header>
  );
}
