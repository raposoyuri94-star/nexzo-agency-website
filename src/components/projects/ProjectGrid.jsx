import { Link } from 'react-router';
import ProjectVisual from './ProjectVisual';

export default function ProjectGrid({ projects }) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <Link
          className={`project-card project-${project.id}`}
          to={`/projetos/${project.slug}`}
          key={project.id}
        >
          <div className="project-image-wrap">
            <ProjectVisual project={project} />
            <span className="project-open">Ver projeto</span>
          </div>
          <div className="project-info">
            <div>
              <h3>{project.name}</h3>
              <p>{project.category}</p>
            </div>
            <span>{project.kind}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
