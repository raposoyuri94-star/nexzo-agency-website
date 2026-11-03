import { Link, useParams } from 'react-router';
import { Check } from 'lucide-react';
import { projects } from '../data/projects';
import PageIntro from '../components/ui/PageIntro';
import ProjectGallery from '../components/projects/ProjectGallery';
import ContactBanner from '../components/sections/ContactBanner';
import NotFoundPage from './NotFoundPage';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFoundPage />;
  return (
    <>
      <PageIntro label={project.category} title={project.name} description={project.summary}>
        <Link className="text-button intro-back" to="/projetos">
          Todos os projetos
        </Link>
      </PageIntro>
      <div className={`container project-detail project-${project.id}`}>
        <ProjectGallery key={project.id} project={project} />
        <div className="case-study">
          <div>
            <span className="section-label">O projeto</span>
            <h2>{project.summary}</h2>
            <p>{project.description}</p>
            <h3>O ponto de partida</h3>
            <p>{project.challenge}</p>
            <h3>A nossa abordagem</h3>
            <p>{project.approach}</p>
          </div>
          <aside>
            <h3>O que desenvolvemos</h3>
            <ul className="included-list">
              {project.deliverables.map((item) => (
                <li key={item}>
                  <Check size={17} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="project-note">{project.note}</p>
          </aside>
        </div>
      </div>
      <ContactBanner />
    </>
  );
}
