import { Link } from 'react-router';
import { Globe2, Code2, Monitor } from 'lucide-react';
import { projects } from '../data/projects';
import Button from '../components/ui/Button';
import ProjectVisual from '../components/projects/ProjectVisual';
import ProjectGrid from '../components/projects/ProjectGrid';
import ServiceList from '../components/sections/ServiceList';
import ContactBanner from '../components/sections/ContactBanner';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-copy">
          <p className="availability">Sites pensados para o seu negócio</p>
          <h1 tabIndex={-1}>
            Grandes ideias
            <br />
            Sites à altura
          </h1>
          <p>
            Criamos sites com a identidade da sua marca
            <br className="desktop-break" /> e as funcionalidades de que o seu negócio precisa.
          </p>
          <div className="hero-actions">
            <Button to="/contacto">Vamos criar algo</Button>
            <Link className="text-button" to="/projetos">
              Ver os projetos
            </Link>
          </div>
          <p className="hero-footnote">Design cuidado e desenvolvimento à medida</p>
        </div>
        <div className="showcase">
          <span className="showcase-caption">Alguns dos nossos projetos</span>
          <Link
            className="showcase-card showcase-left"
            to="/projetos/hair-kulture"
            aria-label="Conhecer o projeto Hair Kulture"
          >
            <ProjectVisual project={projects[1]} eager />
          </Link>
          <Link
            className="showcase-card showcase-right"
            to="/projetos/morrow-coffee"
            aria-label="Conhecer a ementa do Morrow Coffee"
          >
            <ProjectVisual project={projects[0]} detail eager />
          </Link>
          <Link
            className="showcase-card showcase-center"
            to="/projetos/morrow-coffee"
            aria-label="Conhecer o projeto Morrow Coffee"
          >
            <ProjectVisual project={projects[0]} eager />
          </Link>
        </div>
        <div className="container values-strip">
          <span>Bom design faz bem ao negócio.</span>
          <div>
            <span>
              <Monitor size={16} />
              Design com propósito
            </span>
            <span>
              <Code2 size={17} />
              Feito em React
            </span>
            <span>
              <Globe2 size={16} />
              Para todos os ecrãs
            </span>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="section-label">O nosso trabalho</span>
            <h2>Ideias que ganharam forma</h2>
          </div>
          <Link className="text-button" to="/projetos">
            Conhecer os projetos
          </Link>
        </div>
        <ProjectGrid projects={projects} />
      </section>
      <section className="section surface-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">O que fazemos</span>
              <h2>Do design ao lançamento</h2>
            </div>
            <Link className="text-button" to="/servicos">
              Explorar os serviços
            </Link>
          </div>
          <ServiceList />
          <div className="section-bottom-link">
            <p>Quer ter uma ideia do investimento?</p>
            <Link className="text-button" to="/precos">
              Consultar preços estimados
            </Link>
          </div>
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
