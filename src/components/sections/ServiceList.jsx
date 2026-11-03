import { Monitor, Code2, PenTool, Check } from 'lucide-react';
import { services } from '../../data/services';

const icons = { monitor: Monitor, code: Code2, pen: PenTool };

export default function ServiceList({ detailed = false }) {
  return <div className={detailed ? 'services-detailed' : 'services-grid'}>{services.map((service) => {
    const Icon = icons[service.icon];
    return <article className="service" key={service.id}>
      <div className="service-icon"><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></div>
      <div className="service-copy"><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      {detailed && <ul className="included-list">{service.includes.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>}
    </article>;
  })}</div>;
}
