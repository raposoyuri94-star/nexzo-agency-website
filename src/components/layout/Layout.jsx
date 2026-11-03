import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return <><a className="skip-link" href="#main-content">Saltar para o conteúdo</a><Header /><main id="main-content"><Outlet /></main><Footer /></>;
}
