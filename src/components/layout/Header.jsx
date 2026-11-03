import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { navigation } from '../../config/site';
import Brand from '../ui/Brand';
import Button from '../ui/Button';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  useEffect(() => { setOpen(false); }, [location.pathname, location.search]);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => { if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } };
    const onPointerDown = (event) => { if (!headerRef.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => { document.removeEventListener('keydown', onKeyDown); document.removeEventListener('pointerdown', onPointerDown); };
  }, [open]);
  return <header className="site-header" ref={headerRef}>
    <div className="container header-inner">
      <Brand onClick={() => setOpen(false)} />
      <nav id="main-navigation" className={`main-nav${open ? ' is-open' : ''}`} aria-label="Navegação principal">
        {navigation.map(({ to, label }) => <NavLink to={to} key={to} className={({ isActive }) => isActive ? 'is-active' : undefined}>{label}</NavLink>)}
        <NavLink className="mobile-contact" to="/contacto">Vamos conversar</NavLink>
      </nav>
      <Button to="/contacto" className="header-contact">Vamos conversar</Button>
      <button ref={toggleRef} className="menu-toggle icon-button" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Fechar navegação' : 'Abrir navegação'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
  </header>;
}
