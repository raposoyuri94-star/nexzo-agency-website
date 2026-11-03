import { Route, Routes } from 'react-router';
import ErrorBoundary from './ErrorBoundary';
import RouteEffects from './RouteEffects';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import ProjectsPage from '../pages/ProjectsPage';
import ProjectDetailPage from '../pages/ProjectDetailPage';
import ServicesPage from '../pages/ServicesPage';
import PricingPage from '../pages/PricingPage';
import StudioPage from '../pages/StudioPage';
import ContactPage from '../pages/ContactPage';
import PrivacyPage from '../pages/PrivacyPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function App() {
  return (
    <ErrorBoundary>
      <RouteEffects />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projetos" element={<ProjectsPage />} />
          <Route path="projetos/:slug" element={<ProjectDetailPage />} />
          <Route path="servicos" element={<ServicesPage />} />
          <Route path="precos" element={<PricingPage />} />
          <Route path="estudio" element={<StudioPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="privacidade" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
