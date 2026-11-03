import { useEffect, useRef, useState } from 'react';
import { Plus, Minus, Menu, X, Check, CheckCheck, Globe2, Code2, Zap, Monitor } from 'lucide-react';
import { CONTACT_EMAIL, INSTAGRAM, PROJECTS, SERVICES, FAQS, SERVICE_OPTIONS } from './content';

function Brand({ onClick }) {
  return <a className="brand" href="#home" aria-label="Nexzo, início" onClick={onClick}>
    <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 6h7l12 16V6h7v21h-7L10 11v16H3Z" fill="currentColor" /></svg>
    <span>nexzo<span className="brand-period">.</span></span>
  </a>;
}

function Button({ children, onClick, href, secondary = false, className = '', ...props }) {
  const Tag = href ? 'a' : 'button';
  return <Tag href={href} onClick={onClick} className={`button ${secondary ? 'button-secondary' : 'button-primary'} ${className}`} {...props}>{children}</Tag>;
}

function ProjectVisual({ project, hero = false, detail = false }) {
  return <div className={`project-visual visual-${project.id}${hero ? ' visual-hero' : ''}`} aria-hidden="true">
    <div className="mock-browser"><span /><span /><span /><div>{project.previewLabel}{detail ? ' / detalhes' : ''}</div><Plus size={9} /></div>
    <img className="project-screenshot" src={detail ? project.detailImage : project.image} alt="" loading={hero ? 'eager' : 'lazy'} width="1440" height="980" />
  </div>;
}

function Dialog({ title, children, onClose, className = '' }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current.showModal();
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);
  return <dialog ref={dialogRef} className={`dialog ${className}`} aria-labelledby="dialog-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-inner"><button ref={closeRef} className="dialog-close icon-button" onClick={onClose} aria-label="Fechar janela"><X size={22} /></button><h2 id="dialog-title">{title}</h2>{children}</div>
  </dialog>;
}

function ProjectDialog({ project, onClose, onStart }) {
  const [detail, setDetail] = useState(false);
  return <Dialog title={project.name} onClose={onClose} className="project-dialog">
    <span className="project-label">Projeto Nexzo</span>
    <div className="project-view-controls" role="group" aria-label="Escolher captura do projeto"><button aria-pressed={!detail} onClick={() => setDetail(false)}>Página inicial</button><button aria-pressed={detail} onClick={() => setDetail(true)}>Detalhes do site</button></div>
    <ProjectVisual project={project} detail={detail} />
    <div className="project-dialog-description"><h3>{project.summary}</h3><p>{project.description}</p></div>
    <div className="deliverables"><h4>O que desenvolvemos</h4>{project.deliverables.map((item) => <span key={item}><Check size={16} />{item}</span>)}</div>
    {project.note && <p className="project-note">{project.note}</p>}
    <div className="project-dialog-actions"><Button onClick={onStart}>Criar um projeto assim</Button></div>
  </Dialog>;
}

const emptyDraft = { name: '', email: '', service: 'website', budget: '', details: '' };
const legacyServices = { 'A new website': 'website', 'A website redesign': 'redesign', 'Brand identity': 'identity', 'Branding and a website': 'identity-website', 'Something else': 'other' };

function readDraft() {
  try {
    const stored = JSON.parse(localStorage.getItem('nexzo-project-draft'));
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return { ...emptyDraft };
    const draft = Object.fromEntries(Object.entries(emptyDraft).map(([key, fallback]) => [key, typeof stored[key] === 'string' ? stored[key] : fallback]));
    draft.service = legacyServices[draft.service] || draft.service;
    if (!SERVICE_OPTIONS.some(({ value }) => value === draft.service)) draft.service = 'website';
    const legacyBudgets = { 'Under $2,500': 'Até 2 500 USD', '$2,500\u2013$5,000': '2 500 a 5 000 USD', '$5,000\u2013$10,000': '5 000 a 10 000 USD', '$10,000+': 'Mais de 10 000 USD' };
    draft.budget = legacyBudgets[draft.budget] || draft.budget;
    return draft;
  } catch { return { ...emptyDraft }; }
}

function ContactDialog({ onClose }) {
  const [complete, setComplete] = useState(false);
  const [form, setForm] = useState(readDraft);
  useEffect(() => { try { localStorage.setItem('nexzo-project-draft', JSON.stringify(form)); } catch { /* O formulário também funciona sem armazenamento local. */ } }, [form]);
  const update = (event) => setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  const brief = () => `Nexzo\nResumo do projeto\n\nNome: ${form.name}\nEmail: ${form.email}\nProjeto: ${SERVICE_OPTIONS.find(({ value }) => value === form.service)?.label || form.service}\nInvestimento previsto: ${form.budget || 'A definir'}\n\nSobre o projeto\n${form.details}\n`;
  const subject = `Pedido de projeto de ${form.name}`;
  const emailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief())}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief())}`;

  function downloadBrief() {
    const url = URL.createObjectURL(new Blob([brief()], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nexzo-resumo-do-projeto.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function submit(event) {
    event.preventDefault();
    setComplete(true);
  }

  return <Dialog title={complete ? 'O seu email está preparado' : 'Fale-nos do seu projeto'} onClose={onClose} className="contact-dialog">
    {complete ? <div className="contact-success"><div className="success-icon"><CheckCheck size={34} /></div><h3>Falta enviar a mensagem</h3><p>Escolha onde quer abrir o email para <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. O destinatário e o resumo já estão preenchidos. Reveja a mensagem e confirme o envio nessa aplicação.</p><p className="email-pending" role="status">A mensagem ainda não foi enviada.</p><div className="email-actions"><Button href={emailHref}>Abrir aplicação de email</Button><Button href={gmailHref} secondary target="_blank" rel="noopener noreferrer">Abrir no Gmail<span className="sr-only"> (abre num novo separador)</span></Button></div><button className="text-button download-brief" onClick={downloadBrief}>Guardar uma cópia do resumo</button><button className="text-button" onClick={() => setComplete(false)}>Editar os detalhes</button></div> : <>
      <p className="dialog-intro">Preencha os detalhes para preparar um email para a Nexzo. Depois poderá enviá-lo pela sua aplicação de email ou pelo Gmail.</p>
      <p className="contact-destination">Destinatário: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
      <form onSubmit={submit} className="contact-form">
        <div className="form-row"><label>O seu nome<input name="name" value={form.name} onChange={update} placeholder="Nome e apelido" autoComplete="name" maxLength={100} required /></label><label>Endereço de email<input type="email" name="email" value={form.email} onChange={update} placeholder="nome@empresa.com" autoComplete="email" maxLength={254} required /></label></div>
        <label>O que tem em mente?<select name="service" value={form.service} onChange={update}>{SERVICE_OPTIONS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label>Investimento previsto (opcional)<input name="budget" value={form.budget} onChange={update} placeholder="Valor aproximado e moeda, ou a definir" maxLength={100} /></label>
        <label>Conte-nos um pouco sobre o projeto<textarea name="details" value={form.details} onChange={update} placeholder="O que faz o seu negócio e o que gostaria de alcançar com o novo site?" rows={4} minLength={10} maxLength={5000} required /></label>
        <Button type="submit" className="form-submit">Preparar email</Button>
        <p className="form-note">O envio é concluído na sua aplicação de email. Até lá, o rascunho fica apenas neste navegador.</p>
      </form>
    </>}
  </Dialog>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [activeFaq, setActiveFaq] = useState(0);
  const [filter, setFilter] = useState('Todos');
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const startProject = () => { setMenuOpen(false); setDialog({ type: 'contact' }); };
  const visibleProjects = PROJECTS.filter((project) => filter === 'Todos' || project.tags.includes(filter));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
    return () => { window.removeEventListener('scroll', handleScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  return <>
    <a className="skip-link" href="#main-content">Saltar para o conteúdo</a>
    <header className={`header${scrolled ? ' header-scrolled' : ''}`}>
      <div className="container nav-container"><Brand onClick={() => setMenuOpen(false)} />
        <nav className={`nav${menuOpen ? ' nav-open' : ''}`} aria-label="Navegação principal" id="main-navigation">
          {[['work', 'Projetos'], ['services', 'Serviços'], ['about', 'O estúdio'], ['faq', 'Dúvidas']].map(([id, text]) => <a key={id} className={activeSection === id ? 'nav-active' : ''} href={`#${id}`} onClick={() => setMenuOpen(false)} aria-current={activeSection === id ? 'location' : undefined}>{text}</a>)}
          <button className="mobile-contact" onClick={startProject}>Vamos conversar</button>
        </nav>
        <Button onClick={startProject} className="nav-cta"><span className="nav-cta-label">Vamos conversar</span><span className="nav-cta-short">Conversar</span></Button>
        <button className="menu-toggle icon-button" aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main id="main-content">
      <section id="home" className="hero">
        <div className="hero-grid" />
        <div className="container hero-copy"><div className="availability"><span />Sites pensados para o seu negócio</div>
          <h1>Grandes ideias<br />Sites à altura</h1>
          <p>Criamos sites com a identidade da sua marca<br className="desktop-break" /> e as funcionalidades de que o seu negócio precisa.</p>
          <div className="hero-actions"><Button onClick={startProject}>Vamos criar algo</Button><a className="explore-link" href="#work">Ver os projetos</a></div>
          <div className="hero-footnote">Design cuidado e desenvolvimento à medida</div>
        </div>
        <div className="showcase" aria-label="Capturas dos projetos Morrow Coffee e Hair Kulture">
          <div className="showcase-caption">Alguns dos nossos projetos</div>
          <button className="showcase-card showcase-left" onClick={() => setDialog({ type: 'project', project: PROJECTS[1] })} aria-label="Conhecer o projeto Hair Kulture"><ProjectVisual project={PROJECTS[1]} hero /></button>
          <button className="showcase-card showcase-right" onClick={() => setDialog({ type: 'project', project: PROJECTS[0] })} aria-label="Conhecer a ementa do Morrow Coffee"><ProjectVisual project={PROJECTS[0]} hero detail /></button>
          <button className="showcase-card showcase-center" onClick={() => setDialog({ type: 'project', project: PROJECTS[0] })} aria-label="Conhecer o projeto Morrow Coffee"><ProjectVisual project={PROJECTS[0]} hero /></button>
        </div>
        <div className="container values-strip"><span>Bom design faz bem ao negócio.</span><div><span><Monitor size={16} />Design com propósito</span><span><Code2 size={17} />Feito em React</span><span><Globe2 size={16} />Para todos os ecrãs</span></div></div>
      </section>

      <section id="work" className="section work-section">
        <div className="container"><div className="section-topline"><span className="section-label"><span />Os nossos projetos</span><span className="quiet-note">Da ideia ao site, com atenção a cada detalhe.</span></div>
          <div className="section-heading"><h2>O trabalho fala por si</h2><p>Cada negócio tem a sua identidade.<br />É daí que partimos para criar o seu site.</p></div>
          <div className="work-toolbar"><div className="filter-tabs" role="group" aria-label="Filtrar projetos">{['Todos', 'Design', 'Desenvolvimento', 'Lojas online'].map((item) => <button key={item} className={filter === item ? 'filter-active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'Todos' && <span>{String(PROJECTS.length).padStart(2, '0')}</span>}</button>)}</div><span className="portfolio-note">Projetos Nexzo</span></div>
          <div className="project-grid" aria-live="polite">{visibleProjects.map((project) => <button className={`project-card project-${project.id}`} key={project.id} onClick={() => setDialog({ type: 'project', project })}>
            <div className="project-image-wrap"><ProjectVisual project={project} /><span className="project-open">Ver projeto</span></div>
            <div className="project-info"><div><h3>{project.name}<span>{project.category}</span></h3><p>{project.kind}</p></div><span className="project-type">React</span></div>
          </button>)}</div>
          <div className="work-bottom"><p>Tem um projeto em mente?</p><button className="text-button" onClick={startProject}>Vamos conversar</button></div>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="container"><div className="section-topline"><span className="section-label"><span />O que fazemos</span></div>
          <div className="section-heading"><h2>Da primeira ideia<br />ao último clique</h2><p>Acompanhamos o design e o desenvolvimento<br className="desktop-break" /> do site num só estúdio.</p></div>
          <div className="services-grid">{SERVICES.map(({ icon: Icon, title, description, tags }) => <article className="service" key={title}><div className="service-icon"><Icon size={27} strokeWidth={1.5} /></div><h3>{title}</h3><p>{description}</p><div className="service-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
          <div className="service-support"><span><Zap size={18} />Tem algo diferente em mente?</span><button className="text-button" onClick={startProject}>Queremos ouvir a sua ideia</button></div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="container about-grid"><div className="about-art"><img src="/images/studio.jpg" alt="Espaço de trabalho luminoso com gabinetes envidraçados e candeeiros suspensos" loading="lazy" /><div className="about-image-overlay" /><div className="studio-note"><span>Tempo para ouvir<br />e atenção aos detalhes</span></div><span className="image-caption">Imagem ilustrativa de Unsplash</span></div>
          <div className="about-copy"><span className="section-label"><span />Conheça a Nexzo</span><h2>Um pequeno estúdio<br />ao seu lado</h2><p className="about-lead">Ajudamos a dar presença online ao que está a construir.</p><p>Trabalhamos com quem está a lançar um negócio, renovar uma empresa ou pôr uma ideia em prática. Criamos um site que apresenta o que faz e ajuda as pessoas a encontrar o que precisam.</p><p>Queremos conhecer o seu negócio antes de começar. Mantemos o contacto ao longo do projeto e explicamos cada etapa, do primeiro desenho ao lançamento.</p><div className="about-promises"><span><Check size={17} />Conversas diretas e honestas</span><span><Check size={17} />Cuidado do princípio ao fim</span><span><Check size={17} />Um site com a sua identidade</span></div><button className="text-button" onClick={startProject}>Fale-nos do seu negócio</button></div>
        </div>
      </section>

      <section id="process" className="section process-section">
        <div className="container"><div className="section-topline"><span className="section-label"><span />Como trabalhamos</span><span className="quiet-note">Trabalhamos consigo em cada etapa</span></div><div className="section-heading"><h2>Grandes planos<br />Processo simples</h2><p>Combinamos os objetivos, os prazos<br />e as etapas antes de começar.</p></div>
          <div className="process-grid">{[{ title: 'Uma boa conversa', copy: 'Ouvimos, fazemos perguntas e conhecemos o seu negócio. Juntos, encontramos a direção certa.' }, { title: 'Dar forma à sua ideia', copy: 'Transformamos essa direção num design. Partilhamos consigo, ouvimos a sua opinião e afinamos os detalhes.' }, { title: 'Construir e lançar', copy: 'Desenvolvemos o site, verificamos os detalhes em vários ecrãs e preparamos o lançamento.' }].map((step, index) => <article className="process-step" key={step.title}><div className="process-number"><span>0{index + 1}</span></div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
        </div>
      </section>

      <section id="faq" className="section faq-section"><div className="container faq-grid"><div className="faq-intro"><span className="section-label"><span />Perguntas frequentes</span><h2>Ainda tem<br />dúvidas?</h2><p>Há algo mais que gostaria de saber?</p><button className="text-button" onClick={startProject}>Vamos esclarecer</button></div><div className="faq-list">{FAQS.map((faq, index) => <div className={`faq-item${activeFaq === index ? ' faq-open' : ''}`} key={faq.question}><h3><button onClick={() => setActiveFaq(activeFaq === index ? null : index)} aria-expanded={activeFaq === index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`}>{faq.question}<span>{activeFaq === index ? <Minus size={19} /> : <Plus size={19} />}</span></button></h3><div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={activeFaq !== index}><p>{faq.answer}</p></div></div>)}</div></div></section>

      <section id="contact" className="contact-section"><div className="container contact-banner"><div className="contact-orbit" aria-hidden="true" /><div><span className="contact-eyebrow">Tem um projeto em mente?</span><h2>Vamos criar<br />o seu próximo site</h2><p>Conte-nos o que precisa e prepare um email para a Nexzo.</p><Button onClick={startProject} className="button-white">Começar um projeto</Button><div className="contact-links"><a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a className="contact-instagram" href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer">Instagram {INSTAGRAM.handle}<span className="sr-only"> (abre num novo separador)</span></a></div></div></div></section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-top"><div><Brand /><p>Um estúdio independente<br />de design e desenvolvimento.</p></div><div className="footer-links"><a href="#work">Projetos</a><a href="#services">Serviços</a><a href="#about">O estúdio</a><a href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer">Instagram<span className="sr-only"> da Nexzo (abre num novo separador)</span></a><button onClick={startProject}>Vamos conversar</button></div><a className="back-to-top" href="#home" aria-label="Voltar ao início">Topo</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Nexzo</span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><button className="privacy-button" onClick={() => setDialog({ type: 'privacy' })}>Privacidade</button></div></div></footer>

    {dialog?.type === 'contact' && <ContactDialog onClose={() => setDialog(null)} />}
    {dialog?.type === 'project' && <ProjectDialog project={dialog.project} onClose={() => setDialog(null)} onStart={startProject} />}
    {dialog?.type === 'privacy' && <Dialog title="A sua privacidade" onClose={() => setDialog(null)} className="privacy-dialog"><p>Este site não utiliza cookies de publicidade nem ferramentas de análise de visitas. O rascunho do formulário fica guardado apenas no armazenamento local deste navegador para poder voltar a ele.</p><p>O formulário prepara um email para {CONTACT_EMAIL}. Os detalhes são transferidos para a aplicação que escolher quando abrir o email ou o Gmail. O envio da mensagem tem de ser confirmado nessa aplicação. O site não envia emails automaticamente nem guarda os pedidos num servidor.</p><p>Se guardar uma cópia do resumo, o ficheiro de texto fica no seu dispositivo. Pode apagar o rascunho deste navegador através do botão abaixo.</p><p>As fontes são carregadas através do Google Fonts. Os fornecedores de alojamento e de fontes podem tratar dados técnicos de ligação, como o endereço IP.</p><button className="button button-secondary" onClick={() => { try { localStorage.removeItem('nexzo-project-draft'); } catch { /* Sem dados guardados para remover. */ } setDialog({ type: 'privacy-cleared' }); }}>Apagar o meu rascunho</button></Dialog>}
    {dialog?.type === 'privacy-cleared' && <Dialog title="Rascunho apagado" onClose={() => setDialog(null)} className="privacy-dialog"><p>O resumo do projeto foi removido do armazenamento deste navegador.</p><Button onClick={() => setDialog(null)}>Concluir</Button></Dialog>}
  </>;
}
