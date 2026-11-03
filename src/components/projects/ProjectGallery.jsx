import { useState } from 'react';
import ProjectVisual from './ProjectVisual';

export default function ProjectGallery({ project }) {
  const [detail, setDetail] = useState(false);
  return <div className="project-gallery">
    <div className="filter-tabs" role="group" aria-label="Escolher captura do projeto"><button type="button" aria-pressed={!detail} onClick={() => setDetail(false)}>Página inicial</button><button type="button" aria-pressed={detail} onClick={() => setDetail(true)}>Detalhes do site</button></div>
    <ProjectVisual project={project} detail={detail} eager />
  </div>;
}
