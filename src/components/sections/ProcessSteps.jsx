import { processSteps } from '../../data/services';

export default function ProcessSteps() {
  return <ol className="process-grid">{processSteps.map((step, index) => <li className="process-step" key={step.title}><span className="process-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>;
}
