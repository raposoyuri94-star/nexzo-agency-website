import { useState } from 'react';
import { pricingPlans, pricingExtras } from '../../data/pricing';
import { estimateProject, formatMoney, formatRange, estimateContactUrl } from './estimate';
import Button from '../../components/ui/Button';

export default function EstimateCalculator() {
  const [planId, setPlanId] = useState('institucional');
  const [extraPages, setExtraPages] = useState(0);
  const [identity, setIdentity] = useState(false);
  const estimate = estimateProject({ planId, extraPages, identity });
  const website = planId !== 'identidade';
  return <section className="estimate-section container" aria-labelledby="estimate-title">
    <div className="estimate-copy"><span className="section-label">Planeie o investimento</span><h2 id="estimate-title">Uma referência<br />para o seu projeto</h2><p>Escolha o tipo de projeto e os extras que tem em mente. Levamos esta informação para a primeira conversa.</p><p className="small-note">O valor é indicativo. O orçamento final depende dos conteúdos e das funcionalidades.</p></div>
    <div className="estimate-panel"><div className="estimate-fields">
      <label>Tipo de projeto<select value={planId} onChange={(event) => setPlanId(event.target.value)}>{pricingPlans.map((plan) => <option value={plan.id} key={plan.id}>{plan.name}</option>)}</select></label>
      {website && <><label>Páginas adicionais<select value={extraPages} onChange={(event) => setExtraPages(Number(event.target.value))}>{Array.from({ length: 11 }, (_, number) => <option value={number} key={number}>{number === 0 ? 'Nenhuma' : `${number} ${number === 1 ? 'página' : 'páginas'}`}</option>)}</select></label><label className="checkbox-label"><input type="checkbox" checked={identity} onChange={(event) => setIdentity(event.target.checked)} /><span>Incluir identidade visual<small>Logótipo, cores e guia de marca</small></span></label></>}
    </div><div className="estimate-total" aria-live="polite" aria-atomic="true"><span>Estimativa do projeto</span><strong>{formatRange(estimate)}</strong><p>Pagamento por projeto. Serviços externos à parte.</p></div><Button to={estimateContactUrl(estimate)}>Pedir um orçamento</Button><p className="estimate-extra-note">Cada página adicional: {formatMoney(pricingExtras.extraPage.min)} a {formatMoney(pricingExtras.extraPage.max)}.</p></div>
  </section>;
}
