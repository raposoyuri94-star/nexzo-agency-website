import { useState } from 'react';
import { projects } from '../data/projects';
import PageIntro from '../components/ui/PageIntro';
import ProjectGrid from '../components/projects/ProjectGrid';
import ContactBanner from '../components/sections/ContactBanner';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('Todos');
  const visible = projects.filter((project) => filter === 'Todos' || project.tags.includes(filter));
  return (
    <>
      <PageIntro
        label="Portefólio"
        title={
          <>
            O trabalho
            <br />
            fala por si
          </>
        }
        description="Cada negócio tem a sua identidade. Conheça as escolhas e os detalhes por trás dos projetos Morrow Coffee e Hair Kulture."
      />
      <section className="container projects-section">
        <div className="portfolio-toolbar">
          <div className="filter-tabs" role="group" aria-label="Filtrar projetos">
            {['Todos', 'Design', 'Desenvolvimento', 'Lojas online'].map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="small-note" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'projeto' : 'projetos'}
          </span>
        </div>
        <ProjectGrid projects={visible} />
      </section>
      <ContactBanner />
    </>
  );
}
