import { Link } from 'react-router';
import { navigation, site } from '../../config/site';
import Brand from '../ui/Brand';
import InstagramLink from '../ui/InstagramLink';

export default function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-main"><div><Brand /><p>Um estúdio independente<br />de design e desenvolvimento.</p></div>
      <nav className="footer-nav" aria-label="Navegação do rodapé">{navigation.map(({ to, label }) => <Link key={to} to={to}>{label}</Link>)}<Link to="/contacto">Contacto</Link></nav>
      <InstagramLink />
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Nexzo</span><a href={`mailto:${site.email}`}>{site.email}</a><Link to="/privacidade">Privacidade</Link></div>
  </div></footer>;
}
