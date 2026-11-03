import { Link } from 'react-router';
import { faqs } from '../data/faqs';
import PageIntro from '../components/ui/PageIntro';
import FAQList from '../components/ui/FAQList';
import ServiceList from '../components/sections/ServiceList';
import ProcessSteps from '../components/sections/ProcessSteps';
import ContactBanner from '../components/sections/ContactBanner';

export default function ServicesPage() {
  return <><PageIntro label="Serviços" title={<>Da primeira ideia<br />ao último clique</>} description="Acompanhamos o design e o desenvolvimento do seu site, com atenção à identidade da marca e às necessidades do negócio." /><section className="container"><ServiceList detailed /><div className="section-bottom-link"><p>Estimativas em meticais, com o âmbito definido antes de começar.</p><Link className="text-button" to="/precos">Consultar os preços</Link></div></section><section className="section surface-section"><div className="container"><div className="section-heading"><div><span className="section-label">Como trabalhamos</span><h2>Um processo com clareza</h2></div></div><ProcessSteps /></div></section><section className="section container faq-grid"><div><span className="section-label">Perguntas frequentes</span><h2>Antes de<br />começarmos</h2></div><FAQList items={faqs} /></section><ContactBanner /></>;
}
