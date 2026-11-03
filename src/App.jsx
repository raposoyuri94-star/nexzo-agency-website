import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, Plus, Minus, Menu, X, Check, CheckCheck, Globe2, Code2, Zap, MousePointer2, Download, Send, Monitor, Heart, ExternalLink } from 'lucide-react';
import { PROJECTS, SERVICES, FAQS, SERVICE_OPTIONS } from './content';

function Brand({ onClick }) {
  return <a className="brand" href="#home" aria-label="Nexzo, início" onClick={onClick}>
    <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 6h7l12 16V6h7v21h-7L10 11v16H3Z" fill="currentColor" /></svg>
    <span>nexzo<span className="brand-period">.</span></span>
  </a>;
}

function Spark({ className = '' }) {
  return <svg className={`spark ${className}`} viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M40 3v74M3 40h74M14 14l52 52M14 66l52-52" stroke="currentColor" strokeWidth="10" /></svg>;
}

function Button({ children, onClick, href, secondary = false, className = '', arrow = true, ...props }) {
  const Tag = href ? 'a' : 'button';
  return <Tag href={href} onClick={onClick} className={`button ${secondary ? 'button-secondary' : 'button-primary'} ${className}`} {...props}>{children}{arrow && <ArrowUpRight size={18} strokeWidth={1.8} />}</Tag>;
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
    <div className="project-dialog-actions"><Button onClick={onStart}>Criar um projeto assim</Button><a className="text-button" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">Ver código do projeto <ExternalLink size={15} /><span className="sr-only"> (abre num novo separador)</span></a></div>
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
    const legacyBudgets = { 'Under $2,500': 'Até 2 500 USD', '$2,500–$5,000': '2 500–5 000 USD', '$5,000–$10,000': '5 000–10 000 USD', '$10,000+': 'Mais de 10 000 USD' };
    draft.budget = legacyBudgets[draft.budget] || draft.budget;
    return draft;
  } catch { return { ...emptyDraft }; }
}

function ContactDialog({ onClose }) {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim();
  const [complete, setComplete] = useState(false);
  const [form, setForm] = useState(readDraft);
  useEffect(() => { try { localStorage.setItem('nexzo-project-draft', JSON.stringify(form)); } catch { /* O formulário também funciona sem armazenamento local. */ } }, [form]);
  const update = (event) => setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  const brief = () => `NEXZO — RESUMO DO PROJETO\n\nNome: ${form.name}\nEmail: ${form.email}\nProjeto: ${SERVICE_OPTIONS.find(({ value }) => value === form.service)?.label || form.service}\nInvestimento previsto: ${form.budget || 'A definir'}\n\nSobre o projeto\n${form.details}\n`;

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
    if (contactEmail) window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`Um novo projeto com ${form.name}`)}&body=${encodeURIComponent(brief())}`;
    else downloadBrief();
    setComplete(true);
  }

  return <Dialog title={complete ? 'Um bom começo.' : 'O que vamos criar?'} onClose={onClose} className="contact-dialog">
    {complete ? <div className="contact-success"><div className="success-icon"><CheckCheck size={34} /></div><h3>{contactEmail ? 'O seu resumo está pronto a enviar.' : 'O resumo do seu projeto está pronto.'}</h3><p>{contactEmail ? 'Conclua o envio na sua aplicação de email. Também pode guardar uma cópia para si.' : 'O ficheiro foi descarregado. Guarde-o para a primeira conversa sobre o seu projeto. Nenhuma informação foi enviada.'}</p><Button onClick={downloadBrief} secondary arrow={false}><Download size={17} />Descarregar uma cópia</Button><button className="text-button" onClick={() => setComplete(false)}>Voltar ao meu resumo <ArrowRight size={15} /></button></div> : <>
      <p className="dialog-intro">Uma ideia ainda por explorar já é um bom ponto de partida. Conte-nos a sua.</p>
      <form onSubmit={submit} className="contact-form">
        <div className="form-row"><label>O seu nome<input name="name" value={form.name} onChange={update} placeholder="Nome e apelido" autoComplete="name" maxLength={100} required /></label><label>Endereço de email<input type="email" name="email" value={form.email} onChange={update} placeholder="nome@empresa.com" autoComplete="email" maxLength={254} required /></label></div>
        <label>O que tem em mente?<select name="service" value={form.service} onChange={update}>{SERVICE_OPTIONS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label>Investimento previsto (opcional)<input name="budget" value={form.budget} onChange={update} placeholder="Valor aproximado e moeda, ou a definir" maxLength={100} /></label>
        <label>Conte-nos um pouco sobre o projeto<textarea name="details" value={form.details} onChange={update} placeholder="O que faz o seu negócio e o que gostaria de alcançar com o novo site?" rows={4} minLength={10} maxLength={5000} required /></label>
        <Button type="submit" className="form-submit" arrow={false}>{contactEmail ? 'Continuar por email' : 'Criar o resumo do projeto'}{contactEmail ? <Send size={17} /> : <Download size={17} />}</Button>
        <p className="form-note">{contactEmail ? 'A sua aplicação de email abre com os detalhes do projeto. O envio é feito por si.' : 'Crie um ficheiro para preparar a primeira conversa. O rascunho fica apenas neste navegador.'}</p>
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
          <button className="mobile-contact" onClick={startProject}>Vamos conversar <ArrowUpRight size={17} /></button>
        </nav>
        <Button onClick={startProject} className="nav-cta"><span className="nav-cta-label">Vamos conversar</span><span className="nav-cta-short">Conversar</span></Button>
        <button className="menu-toggle icon-button" aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main id="main-content">
      <section id="home" className="hero">
        <div className="hero-grid" />
        <div className="container hero-copy"><div className="availability"><span />Ideias independentes. Sites com ambição.</div>
          <h1>Grandes ideias.<br />Sites à altura<span className="hero-period">.</span></h1>
          <Spark className="hero-spark" />
          <p>Transformamos a sua próxima grande ideia num site<br className="desktop-break" /> com personalidade. E feito para o seu negócio.</p>
          <div className="hero-actions"><Button onClick={startProject}>Vamos criar algo</Button><a className="explore-link" href="#work">Ver os projetos <ArrowDown size={16} /></a></div>
          <div className="hero-footnote"><span className="little-check"><Check size={11} /></span>Pensado ao detalhe. Bem construído. Com a sua identidade.</div>
        </div>
        <div className="showcase" aria-label="Capturas dos projetos Morrow Coffee e Hair Kulture">
          <div className="showcase-caption"><span className="caption-line" />Ideias que já ganharam forma.</div>
          <button className="showcase-card showcase-left" onClick={() => setDialog({ type: 'project', project: PROJECTS[1] })} aria-label="Conhecer o projeto Hair Kulture"><ProjectVisual project={PROJECTS[1]} hero /></button>
          <button className="showcase-card showcase-right" onClick={() => setDialog({ type: 'project', project: PROJECTS[0] })} aria-label="Conhecer a ementa do Morrow Coffee"><ProjectVisual project={PROJECTS[0]} hero detail /></button>
          <button className="showcase-card showcase-center" onClick={() => setDialog({ type: 'project', project: PROJECTS[0] })} aria-label="Conhecer o projeto Morrow Coffee"><ProjectVisual project={PROJECTS[0]} hero /></button>
          <div className="cursor-label"><MousePointer2 size={23} fill="currentColor" /><span>O seu próximo site?</span></div>
          <div className="showcase-badge"><Spark /><span>Criado com cuidado.<br /><strong>Pronto para o próximo passo.</strong></span></div>
        </div>
        <div className="container values-strip"><span>Bom design faz bem ao negócio.</span><div><span><Monitor size={16} />Design com propósito</span><span><Code2 size={17} />Feito em React</span><span><Globe2 size={16} />Para todos os ecrãs</span></div></div>
      </section>

      <section id="work" className="section work-section">
        <div className="container"><div className="section-topline"><span className="section-label"><span />Os nossos projetos</span><span className="quiet-note">Da ideia ao site, com atenção a cada detalhe.</span></div>
          <div className="section-heading"><h2>O trabalho fala por si.</h2><p>Negócios diferentes. Identidades próprias.<br />O mesmo cuidado em cada projeto.</p></div>
          <div className="work-toolbar"><div className="filter-tabs" role="group" aria-label="Filtrar projetos">{['Todos', 'Design', 'Desenvolvimento', 'Lojas online'].map((item) => <button key={item} className={filter === item ? 'filter-active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'Todos' && <span>{String(PROJECTS.length).padStart(2, '0')}</span>}</button>)}</div><span className="portfolio-note">Projetos Nexzo <ArrowDown size={13} /></span></div>
          <div className="project-grid" aria-live="polite">{visibleProjects.map((project) => <button className={`project-card project-${project.id}`} key={project.id} onClick={() => setDialog({ type: 'project', project })}>
            <div className="project-image-wrap"><ProjectVisual project={project} /><span className="project-open"><ArrowUpRight size={24} /></span></div>
            <div className="project-info"><div><h3>{project.name}<span>{project.category}</span></h3><p>{project.kind}</p></div><span className="project-type">React</span></div>
          </button>)}</div>
          <div className="work-bottom"><p>O seu negócio pode ser o próximo a ganhar forma.</p><button className="text-button" onClick={startProject}>Vamos dar o primeiro passo <ArrowUpRight size={17} /></button></div>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="container"><div className="section-topline"><span className="section-label"><span />O que fazemos</span><Spark className="section-spark" /></div>
          <div className="section-heading"><h2>Da primeira ideia<br />ao último clique.</h2><p>Tudo o que o seu negócio precisa para estar online.<br className="desktop-break" /> Num só estúdio, com as pessoas certas.</p></div>
          <div className="services-grid">{SERVICES.map(({ icon: Icon, title, description, tags }) => <article className="service" key={title}><div className="service-icon"><Icon size={27} strokeWidth={1.5} /></div><h3>{title}</h3><p>{description}</p><div className="service-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
          <div className="service-support"><span><Zap size={18} />Tem algo diferente em mente?</span><button className="text-button" onClick={startProject}>Queremos ouvir a sua ideia <ArrowUpRight size={17} /></button></div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="container about-grid"><div className="about-art"><img src="/images/studio.jpg" alt="Espaço de trabalho luminoso com gabinetes envidraçados e candeeiros suspensos" loading="lazy" /><div className="about-image-overlay" /><div className="studio-note"><Spark /><span>Um pouco de curiosidade.<br />Muitas possibilidades.</span></div><span className="image-caption">O espírito do estúdio. Imagem ilustrativa: Unsplash.</span></div>
          <div className="about-copy"><span className="section-label"><span />Conheça a Nexzo</span><h2>Um pequeno estúdio.<br />Ao seu lado.</h2><p className="about-lead">Para quem está a construir algo seu.</p><p>O novo negócio. A empresa da família. Aquela ideia que não sai da cabeça. Damos-lhe um lugar na web com o mesmo cuidado que dedica ao que faz.</p><p>Gostamos de proximidade, de fazer as perguntas certas e de cuidar dos detalhes. Porque o seu site deve representar o próximo passo do seu negócio.</p><div className="about-promises"><span><Check size={17} />Conversas diretas e honestas</span><span><Check size={17} />Cuidado do princípio ao fim</span><span><Check size={17} />Um site com a sua identidade</span></div><button className="text-button" onClick={startProject}>Um bom projeto começa com um olá <ArrowUpRight size={18} /></button></div>
        </div>
      </section>

      <section id="process" className="section process-section">
        <div className="container"><div className="section-topline"><span className="section-label"><span />Como trabalhamos</span><span className="quiet-note">Sem complicações. Com colaboração.</span></div><div className="section-heading"><h2>Grandes planos.<br />Processo simples.</h2><p>Do «e se?» ao «já está online».<br />Com clareza em cada etapa.</p></div>
          <div className="process-grid">{[{ title: 'Uma boa conversa', copy: 'Ouvimos, fazemos perguntas e conhecemos o seu negócio. Juntos, encontramos a direção certa.' }, { title: 'Dar forma à sua ideia', copy: 'Transformamos essa direção num design. Partilhamos consigo, ouvimos a sua opinião e afinamos os detalhes.' }, { title: 'Construir e lançar', copy: 'Damos vida ao design, verificamos o site em vários ecrãs e preparamos tudo para o próximo capítulo.' }].map((step, index) => <article className="process-step" key={step.title}><div className="process-number"><span>0{index + 1}</span>{index < 2 ? <ArrowRight size={21} /> : <Check size={21} />}</div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
        </div>
      </section>

      <section id="faq" className="section faq-section"><div className="container faq-grid"><div className="faq-intro"><span className="section-label"><span />Perguntas frequentes</span><h2>Ainda tem<br />dúvidas?</h2><p>Há algo mais que gostaria de saber?</p><button className="text-button" onClick={startProject}>Vamos esclarecer <ArrowUpRight size={17} /></button><Spark className="faq-spark" /></div><div className="faq-list">{FAQS.map((faq, index) => <div className={`faq-item${activeFaq === index ? ' faq-open' : ''}`} key={faq.question}><h3><button onClick={() => setActiveFaq(activeFaq === index ? null : index)} aria-expanded={activeFaq === index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`}>{faq.question}<span>{activeFaq === index ? <Minus size={19} /> : <Plus size={19} />}</span></button></h3><div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={activeFaq !== index}><p>{faq.answer}</p></div></div>)}</div></div></section>

      <section id="contact" className="contact-section"><div className="container contact-banner"><div className="contact-orbit" aria-hidden="true" /><Spark className="contact-spark" /><div><span className="contact-eyebrow"><span />As boas ideias começam com uma conversa.</span><h2>Vamos criar<br />o seu próximo capítulo.</h2><p>A sua ideia. A nossa curiosidade. Um site à altura.</p><Button onClick={startProject} className="button-white">Começar um projeto</Button></div><span className="contact-doodle" aria-hidden="true">olá!</span><span className="contact-corner">Tudo começa com uma ideia. <Spark /></span></div></section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-top"><div><Brand /><p>Um estúdio digital independente.<br />Para o seu próximo capítulo.</p></div><div className="footer-links"><a href="#work">Projetos</a><a href="#services">Serviços</a><a href="#about">O estúdio</a><button onClick={startProject}>Vamos conversar <ArrowUpRight size={14} /></button></div><a className="back-to-top" href="#home" aria-label="Voltar ao início"><ArrowUpRight size={21} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Nexzo. Feito com intenção.</span><span>Design com cuidado. Criado com <Heart size={12} aria-label="carinho" /> e React.</span><button className="privacy-button" onClick={() => setDialog({ type: 'privacy' })}>Privacidade</button></div></div></footer>

    {dialog?.type === 'contact' && <ContactDialog onClose={() => setDialog(null)} />}
    {dialog?.type === 'project' && <ProjectDialog project={dialog.project} onClose={() => setDialog(null)} onStart={startProject} />}
    {dialog?.type === 'privacy' && <Dialog title="A sua privacidade." onClose={() => setDialog(null)} className="privacy-dialog"><p>Este site não utiliza cookies de publicidade nem ferramentas de análise de visitas. Se preencher o resumo de um projeto, o rascunho fica guardado no armazenamento local deste navegador para poder voltar a ele. Não é enviado para um servidor.</p><p>Ao descarregar o resumo, guarda um ficheiro de texto no seu dispositivo. Se existir um endereço de contacto configurado, a opção «Continuar por email» abre a sua aplicação de email. O site não envia a mensagem por si.</p><p>As fontes são carregadas através do Google Fonts. Os fornecedores de alojamento e de fontes podem tratar dados técnicos de ligação, como o endereço IP.</p><button className="button button-secondary" onClick={() => { try { localStorage.removeItem('nexzo-project-draft'); } catch { /* Sem dados guardados para remover. */ } setDialog({ type: 'privacy-cleared' }); }}>Apagar o meu rascunho</button></Dialog>}
    {dialog?.type === 'privacy-cleared' && <Dialog title="Rascunho apagado." onClose={() => setDialog(null)} className="privacy-dialog"><p>O resumo do projeto foi removido do armazenamento deste navegador.</p><Button onClick={() => setDialog(null)} arrow={false}>Concluir</Button></Dialog>}
  </>;
}
