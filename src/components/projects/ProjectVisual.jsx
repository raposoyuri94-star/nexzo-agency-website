export default function ProjectVisual({ project, detail = false, eager = false }) {
  return <div className={`project-visual visual-${project.id}`} aria-hidden="true">
    <div className="browser-bar"><span /><span /><span /><div>{project.name}{detail ? ' / detalhes' : ''}</div></div>
    <img src={detail ? project.detailImage : project.image} alt="" loading={eager ? 'eager' : 'lazy'} width="1440" height="980" />
  </div>;
}
