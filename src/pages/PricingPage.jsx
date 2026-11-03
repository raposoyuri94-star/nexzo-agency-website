import { Check } from 'lucide-react';
import { pricingPlans } from '../data/pricing';
import { pricingFaqs } from '../data/faqs';
import { formatMoney } from '../features/pricing/estimate';
import EstimateCalculator from '../features/pricing/EstimateCalculator';
import PageIntro from '../components/ui/PageIntro';
import Button from '../components/ui/Button';
import FAQList from '../components/ui/FAQList';

export default function PricingPage() {
  return (
    <>
      <PageIntro
        label="Preços em meticais"
        title={
          <>
            Uma ideia
            <br />
            do investimento
          </>
        }
        description="Estimativas para começar a planear o seu site. O valor final é confirmado numa proposta, depois de conhecermos o que precisa."
      />
      <section className="container pricing-section" aria-label="Preços estimados dos serviços">
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article
              className={`pricing-card${plan.featured ? ' pricing-featured' : ''}`}
              key={plan.id}
            >
              <span className="plan-scope">{plan.scope}</span>
              <h2>{plan.name}</h2>
              <p>{plan.subtitle}</p>
              <div className="plan-price">
                <strong>{formatMoney(plan.min)}</strong>
                <span>a {formatMoney(plan.max)}</span>
              </div>
              <p className="price-frequency">Estimativa por projeto</p>
              <ul className="included-list">
                {plan.includes.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button to={`/contacto?plano=${plan.id}`} secondary={!plan.featured}>
                Falar sobre este projeto
              </Button>
            </article>
          ))}
        </div>
        <p className="pricing-disclaimer">
          Valores indicativos em MZN. Domínio, alojamento, conteúdos e serviços externos são
          orçamentados à parte. A proposta define o âmbito, os prazos e as condições de pagamento.
        </p>
      </section>
      <EstimateCalculator />
      <section className="section container faq-grid">
        <div>
          <span className="section-label">Sobre o orçamento</span>
          <h2>
            O que convém
            <br />
            saber
          </h2>
        </div>
        <FAQList items={pricingFaqs} />
      </section>
    </>
  );
}
