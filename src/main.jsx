import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, ArrowDown, Plus, Minus, Menu, X, Check, CheckCheck, Globe2, Code2, PenTool, Zap, MousePointer2, Download, Send, Monitor, Heart } from 'lucide-react';
import './styles.css';

const PROJECTS = [
  { id: 'forma', name: 'Forma', category: 'Architecture & interiors', kind: 'Web design & development', tags: ['Web design', 'Development'], summary: 'Space to make an impression.', description: 'An architectural approach to a digital home. Generous whitespace, considered typography, and immersive photography bring a contemporary interiors studio to life.', image: '/images/architecture.jpg', color: '#e8e5df', deliverables: ['Art direction & visual identity', 'Responsive website design', 'Interactive project gallery', 'React development'] },
  { id: 'offgrid', name: 'Offgrid', category: 'Outdoor & adventure', kind: 'Branding & web design', tags: ['Branding', 'Web design'], summary: 'A little less ordinary.', description: 'An energetic concept for a brand that belongs outside. A punchy identity and an editorial website connect adventurous people with their next great escape.', image: '/images/mountains.jpg', color: '#d9e2c5', deliverables: ['Brand strategy & identity', 'Digital art direction', 'Responsive e-commerce concept', 'Product storytelling'] },
  { id: 'daybreak', name: 'Daybreak', category: 'Coffee & culture', kind: 'Web design & development', tags: ['Web design', 'Development'], summary: 'A better kind of everyday.', description: 'Good coffee deserves a great story. Warm colors, tactile photography, and easy-to-explore products give this specialty coffee concept an inviting digital home.', image: '/images/coffee.jpg', color: '#ecb27d', deliverables: ['Visual identity', 'Responsive website design', 'Product collection concept', 'React development'] },
];

const SERVICES = [
  { icon: Monitor, title: 'Web design', description: 'A website that feels like you. Thoughtful layouts, clear journeys, and the details that make people stick around.', tags: ['UI / UX design', 'Responsive design', 'Art direction'] },
  { icon: Code2, title: 'Web development', description: 'Beautiful on the surface. Just as good underneath. Fast, accessible React websites built to grow with your business.', tags: ['React development', 'Performance', 'SEO foundations'] },
  { icon: PenTool, title: 'Brand identity', description: 'More than a good-looking logo. A distinct visual world that helps the right people recognize and remember you.', tags: ['Visual identity', 'Logo design', 'Brand guidelines'] },
];

const FAQS = [
  { question: 'What kinds of businesses do you work with?', answer: 'We’re a good fit for ambitious small businesses, independent brands, and founders who want a considered digital presence. Whether you’re starting from scratch or outgrowing your current website, we’ll shape the work around your goals.' },
  { question: 'How long does a website take?', answer: 'The timeline depends on the number of pages, the content, and the features you need. We’ll agree on a realistic schedule together after learning about your project, with clear milestones for design, development, and launch.' },
  { question: 'How much does a project cost?', answer: 'Every project is scoped individually. Share what you want to build and a comfortable budget range in the project brief. We’ll use that to recommend a practical approach and provide a clear quote before any work starts.' },
  { question: 'Can you redesign my existing website?', answer: 'Absolutely. We can revisit the design, improve the content structure, and rebuild your website in React. We’ll first look at what works, what gets in the way, and what you want the new site to achieve.' },
  { question: 'Will my website work on mobile?', answer: 'Yes. Every design is built for phones, tablets, and desktops, with readable typography, accessible controls, and layouts that adapt to the space available.' },
  { question: 'What happens after launch?', answer: 'We’ll walk you through your new site and discuss any ongoing support you need. Maintenance, content updates, and future features can be scoped separately so you know what’s included.' },
];

function Brand({ light = false, onClick }) {
  return <a className={`brand${light ? ' brand-light' : ''}`} href="#home" aria-label="Nexzo home" onClick={onClick}>
    <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 6h7l12 16V6h7v21h-7L10 11v16H3Z" fill="currentColor" /></svg>
    <span>nexzo<span className="brand-period">.</span></span>
  </a>;
}

function Spark({ className = '', ...props }) {
  return <svg className={`spark ${className}`} viewBox="0 0 80 80" fill="none" aria-hidden="true" {...props}><path d="M40 3v74M3 40h74M14 14l52 52M14 66l52-52" stroke="currentColor" strokeWidth="10" /></svg>;
}

function Button({ children, onClick, href, secondary = false, className = '', arrow = true, ...props }) {
  const Tag = href ? 'a' : 'button';
  return <Tag href={href} onClick={onClick} className={`button ${secondary ? 'button-secondary' : 'button-primary'} ${className}`} {...props}>{children}{arrow && <ArrowUpRight size={18} strokeWidth={1.8} />}</Tag>;
}

function ProjectVisual({ project, hero = false }) {
  return <div className={`project-visual visual-${project.id}${hero ? ' visual-hero' : ''}`} aria-hidden="true">
    <div className="mock-browser"><span /><span /><span /><div>{project.id}.design / concept</div><Plus size={9} /></div>
    {project.id === 'forma' && <div className="forma-site">
      <div className="mini-nav"><span className="forma-logo">forma<span>®</span></span><span>Spaces with purpose.</span><Menu size={11} /></div>
      <div className="forma-content"><h3>Thoughtfully<br />made for living.</h3><div className="mini-copy">Architecture. Interiors. A different perspective.</div><div className="mini-cta">Explore our spaces <ArrowUpRight size={11} /></div></div>
      <img src={project.image} alt="" loading={hero ? 'eager' : 'lazy'} />
      <div className="forma-foot"><span>Considered spaces.<br />Extraordinary living.</span><span>Independent by design. <ArrowUpRight size={11} /></span></div>
    </div>}
    {project.id === 'offgrid' && <div className="offgrid-site">
      <img src={project.image} alt="" loading={hero ? 'eager' : 'lazy'} />
      <div className="mini-nav"><span className="offgrid-logo"><span>↗</span> OFFGRID</span><span>Get out there.</span><Menu size={11} /></div>
      <div className="offgrid-content"><span>For the beautifully restless.</span><h3>GO FIND<br />YOUR OUT.</h3><div className="mini-cta">Explore the unknown <ArrowUpRight size={11} /></div></div>
      <span className="offgrid-coordinate">More outside. More alive.</span><Spark className="offgrid-spark" />
    </div>}
    {project.id === 'daybreak' && <div className="daybreak-site">
      <div className="mini-nav"><span className="daybreak-logo">daybreak<span>☀</span></span><span>Good mornings start here.</span><Menu size={11} /></div>
      <div className="daybreak-content"><h3>Your daily<br />dose of good.</h3><div className="mini-copy">Really good coffee. A brighter kind of day.</div><div className="mini-cta">Meet your morning <ArrowUpRight size={11} /></div></div>
      <div className="coffee-photo"><img src={project.image} alt="" loading={hero ? 'eager' : 'lazy'} /><div className="coffee-stamp">GOOD COFFEE<br /><span>☀</span><br />GOOD DAYS</div></div>
      <div className="daybreak-foot">Thoughtfully sourced. Happily roasted.</div>
    </div>}
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
    <div className="dialog-inner"><button ref={closeRef} className="dialog-close icon-button" onClick={onClose} aria-label="Close dialog"><X size={22} /></button><h2 id="dialog-title">{title}</h2>{children}</div>
  </dialog>;
}

function ProjectDialog({ project, onClose, onStart }) {
  return <Dialog title={project.name} onClose={onClose} className="project-dialog">
    <span className="concept-tag">Independent concept project</span>
    <ProjectVisual project={project} />
    <div className="project-dialog-description"><h3>{project.summary}</h3><p>{project.description}</p></div>
    <div className="deliverables"><h4>The thinking behind it</h4>{project.deliverables.map((item) => <span key={item}><Check size={16} />{item}</span>)}</div>
    <Button onClick={onStart}>Let’s make something like this</Button>
  </Dialog>;
}

function ContactDialog({ onClose }) {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim();
  const [complete, setComplete] = useState(false);
  const [form, setForm] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nexzo-project-draft')) || { name: '', email: '', service: 'A new website', budget: '', details: '' }; }
    catch { return { name: '', email: '', service: 'A new website', budget: '', details: '' }; }
  });
  useEffect(() => { try { localStorage.setItem('nexzo-project-draft', JSON.stringify(form)); } catch { /* The form also works without browser storage. */ } }, [form]);
  const update = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const brief = () => `NEXZO — PROJECT BRIEF\n\nName: ${form.name}\nEmail: ${form.email}\nProject: ${form.service}\nBudget: ${form.budget || 'Let’s discuss'}\n\nAbout the project\n${form.details}\n`;
  function downloadBrief() {
    const url = URL.createObjectURL(new Blob([brief()], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nexzo-project-brief.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function submit(event) {
    event.preventDefault();
    if (contactEmail) window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`A new project with ${form.name}`)}&body=${encodeURIComponent(brief())}`;
    else downloadBrief();
    setComplete(true);
  }
  return <Dialog title={complete ? 'A good beginning.' : 'Tell us what’s next.'} onClose={onClose} className="contact-dialog">
    {complete ? <div className="contact-success"><div className="success-icon"><CheckCheck size={34} /></div><h3>{contactEmail ? 'Your brief is ready to send.' : 'Your project brief is ready.'}</h3><p>{contactEmail ? 'Finish sending it in your email app. You can also download a copy for your records.' : 'Your brief has been downloaded. It’s a handy starting point for your project conversation. Nothing has been sent or submitted.'}</p><Button onClick={downloadBrief} secondary arrow={false}><Download size={17} />Download a copy</Button><button className="text-button" onClick={() => setComplete(false)}>Back to my brief <ArrowRight size={15} /></button></div> : <>
      <p className="dialog-intro">A rough idea is a great place to start. Tell us a little about yours.</p>
      <form onSubmit={submit} className="contact-form">
        <div className="form-row"><label>Your name<input name="name" value={form.name} onChange={update} placeholder="Alex Taylor" autoComplete="name" maxLength={100} required /></label><label>Email address<input type="email" name="email" value={form.email} onChange={update} placeholder="alex@company.com" autoComplete="email" maxLength={254} required /></label></div>
        <label>What are you thinking?<select name="service" value={form.service} onChange={update}><option>A new website</option><option>A website redesign</option><option>Brand identity</option><option>Branding and a website</option><option>Something else</option></select></label>
        <label>Budget range <span className="optional">(optional)</span><select name="budget" value={form.budget} onChange={update}><option value="">Let’s figure it out together</option><option>Under $2,500</option><option>$2,500–$5,000</option><option>$5,000–$10,000</option><option>$10,000+</option></select></label>
        <label>A little about your project<textarea name="details" value={form.details} onChange={update} placeholder="What do you do, and what would you love your new website to do for you?" rows={4} minLength={10} maxLength={5000} required /></label>
        <Button type="submit" className="form-submit" arrow={false}>{contactEmail ? 'Continue in email' : 'Create my project brief'}{contactEmail ? <Send size={17} /> : <Download size={17} />}</Button>
        <p className="form-note">{contactEmail ? 'Your email app will open with your project details. You choose when to send.' : 'Create a downloadable brief to start the conversation. Your draft stays in this browser.'}</p>
      </form>
    </>}
  </Dialog>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [activeFaq, setActiveFaq] = useState(0);
  const [filter, setFilter] = useState('All work');
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const startProject = () => { setMenuOpen(false); setDialog({ type: 'contact' }); };
  const visibleProjects = PROJECTS.filter((project) => filter === 'All work' || project.tags.includes(filter));

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
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className={`header${scrolled ? ' header-scrolled' : ''}`}>
      <div className="container nav-container"><Brand onClick={() => setMenuOpen(false)} />
        <nav className={`nav${menuOpen ? ' nav-open' : ''}`} aria-label="Main navigation" id="main-navigation">
          {[['work', 'Our work'], ['services', 'What we do'], ['about', 'The studio'], ['faq', 'FAQs']].map(([id, text]) => <a key={id} className={activeSection === id ? 'nav-active' : ''} href={`#${id}`} onClick={() => setMenuOpen(false)} aria-current={activeSection === id ? 'location' : undefined}>{text}</a>)}
          <button className="mobile-contact" onClick={startProject}>Let’s talk <ArrowUpRight size={17} /></button>
        </nav>
        <Button onClick={startProject} className="nav-cta">Let’s talk</Button>
        <button className="menu-toggle icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main id="main-content">
      <section id="home" className="hero">
        <div className="hero-grid" />
        <div className="container hero-copy"><div className="availability"><span />Independent minds. Ambitious websites.</div>
          <h1>Big ideas.<br />Better websites<span className="hero-period">.</span></h1>
          <Spark className="hero-spark" />
          <p>We turn your next big thing into a website that<br className="desktop-break" /> looks the part. And works even harder.</p>
          <div className="hero-actions"><Button onClick={startProject}>Let’s build something</Button><a className="explore-link" href="#work">Explore our work <ArrowDown size={16} /></a></div>
          <div className="hero-footnote"><span className="little-check"><Check size={11} /></span>Thoughtfully designed. Beautifully built. Uniquely yours.</div>
        </div>
        <div className="showcase" aria-label="A preview of our concept website designs">
          <div className="showcase-caption"><span className="caption-line" />A little glimpse of what’s possible.</div>
          <button className="showcase-card showcase-left" onClick={() => setDialog({ type: 'project', project: PROJECTS[1] })} aria-label="Explore the Offgrid concept project"><ProjectVisual project={PROJECTS[1]} hero /></button>
          <button className="showcase-card showcase-right" onClick={() => setDialog({ type: 'project', project: PROJECTS[2] })} aria-label="Explore the Daybreak concept project"><ProjectVisual project={PROJECTS[2]} hero /></button>
          <button className="showcase-card showcase-center" onClick={() => setDialog({ type: 'project', project: PROJECTS[0] })} aria-label="Explore the Forma concept project"><ProjectVisual project={PROJECTS[0]} hero /></button>
          <div className="cursor-label"><MousePointer2 size={23} fill="currentColor" /><span>Your next website?</span></div>
          <div className="showcase-badge"><Spark /><span>Made with care.<br /><strong>Built for what’s next.</strong></span></div>
        </div>
        <div className="container values-strip"><span>Good design is good business.</span><div><span><Monitor size={16} />Design with purpose</span><span><Code2 size={17} />Built in React</span><span><Globe2 size={16} />Ready for every screen</span></div></div>
      </section>

      <section id="work" className="section work-section">
        <div className="container"><div className="section-topline"><span className="section-label"><span />The work</span><span className="quiet-note">A few possibilities, brought to life.</span></div>
          <div className="section-heading"><h2>Proof in the pixels.</h2><p>Different businesses. Different personalities.<br />The same attention to every last detail.</p></div>
          <div className="work-toolbar"><div className="filter-tabs" role="group" aria-label="Filter concept projects">{['All work', 'Web design', 'Development', 'Branding'].map((item) => <button key={item} className={filter === item ? 'filter-active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'All work' && <span>03</span>}</button>)}</div><span className="concept-note">Self-initiated concepts <ArrowDown size={13} /></span></div>
          <div className="project-grid" aria-live="polite">{visibleProjects.map((project) => <button className={`project-card project-${project.id}`} key={project.id} onClick={() => setDialog({ type: 'project', project })}>
            <div className="project-image-wrap"><ProjectVisual project={project} /><span className="project-open"><ArrowUpRight size={24} /></span></div>
            <div className="project-info"><div><h3>{project.name}<span>{project.category}</span></h3><p>{project.kind}</p></div><span className="project-concept">Concept</span></div>
          </button>)}</div>
          <div className="work-bottom"><p>Your business could be our next favorite project.</p><button className="text-button" onClick={startProject}>Let’s make it happen <ArrowUpRight size={17} /></button></div>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="container"><div className="section-topline"><span className="section-label"><span />What we do</span><Spark className="section-spark" /></div>
          <div className="section-heading"><h2>From first spark<br />to final click.</h2><p>Everything your business needs to show up<br className="desktop-break" /> online. All under one small, creative roof.</p></div>
          <div className="services-grid">{SERVICES.map(({ icon: Icon, title, description, tags }) => <article className="service" key={title}><div className="service-icon"><Icon size={27} strokeWidth={1.5} /></div><h3>{title}</h3><p>{description}</p><div className="service-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
          <div className="service-support"><span><Zap size={18} />Have something a little different in mind?</span><button className="text-button" onClick={startProject}>We’re all ears <ArrowUpRight size={17} /></button></div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="container about-grid"><div className="about-art"><img src="/images/studio.jpg" alt="A light-filled workspace with glass-walled offices and hanging lamps" loading="lazy" /><div className="about-image-overlay" /><div className="studio-note"><Spark /><span>A little curiosity.<br />A lot of possibility.</span></div><span className="image-caption">The spirit of the studio. Image: Unsplash.</span></div>
          <div className="about-copy"><span className="section-label"><span />Meet Nexzo</span><h2>A small studio.<br />On your side.</h2><p className="about-lead">We’re here for the ones building something of their own.</p><p>The new venture. The family business. The idea that won’t leave you alone. We help give it a home on the web that feels as considered as the business behind it.</p><p>We keep things personal, ask the right questions, and care about the details. Because your website should feel like your next step forward.</p><div className="about-promises"><span><Check size={17} />Direct, honest conversations</span><span><Check size={17} />Thoughtful work, from start to finish</span><span><Check size={17} />A website that feels like you</span></div><button className="text-button" onClick={startProject}>A good project starts with hello <ArrowUpRight size={18} /></button></div>
        </div>
      </section>

      <section id="process" className="section process-section">
        <div className="container"><div className="section-topline"><span className="section-label"><span />How we get there</span><span className="quiet-note">No mystery. Just good collaboration.</span></div><div className="section-heading"><h2>Big things.<br />Simple process.</h2><p>From “what if” to “it’s live.”<br />We’ll make the whole thing feel easy.</p></div>
          <div className="process-grid">{[{ title: 'A good conversation', copy: 'We listen, ask questions, and get to know your business. Together, we find the right direction.' }, { title: 'Make it feel like you', copy: 'We turn that direction into a design. You see it, share your thoughts, and help us make it just right.' }, { title: 'Build. Polish. Launch.', copy: 'We bring the design to life, check the details on every screen, and get you ready for your next chapter.' }].map((step, index) => <article className="process-step" key={step.title}><div className="process-number"><span>0{index + 1}</span>{index < 2 ? <ArrowRight size={21} /> : <Check size={21} />}</div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
        </div>
      </section>

      <section id="faq" className="section faq-section"><div className="container faq-grid"><div className="faq-intro"><span className="section-label"><span />A few good questions</span><h2>Glad you<br />asked.</h2><p>Still curious about something?</p><button className="text-button" onClick={startProject}>Let’s talk it through <ArrowUpRight size={17} /></button><Spark className="faq-spark" /></div><div className="faq-list">{FAQS.map((faq, index) => <div className={`faq-item${activeFaq === index ? ' faq-open' : ''}`} key={faq.question}><h3><button onClick={() => setActiveFaq(activeFaq === index ? null : index)} aria-expanded={activeFaq === index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`}>{faq.question}<span>{activeFaq === index ? <Minus size={19} /> : <Plus size={19} />}</span></button></h3><div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={activeFaq !== index}><p>{faq.answer}</p></div></div>)}</div></div></section>

      <section id="contact" className="contact-section"><div className="container contact-banner"><div className="contact-orbit" aria-hidden="true" /><Spark className="contact-spark" /><div><span className="contact-eyebrow"><span />Good things start with a conversation.</span><h2>Let’s make<br />your next big thing.</h2><p>Your idea. Our curiosity. A really good website.</p><Button onClick={startProject} className="button-white">Start a project</Button></div><span className="contact-doodle" aria-hidden="true">hello!</span><span className="contact-corner">A little spark goes a long way. <Spark /></span></div></section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-top"><div><Brand /><p>An independent web studio.<br />For your next chapter.</p></div><div className="footer-links"><a href="#work">Our work</a><a href="#services">What we do</a><a href="#about">The studio</a><button onClick={startProject}>Let’s talk <ArrowUpRight size={14} /></button></div><a className="back-to-top" href="#home" aria-label="Back to top"><ArrowUpRight size={21} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Nexzo. Made with intention.</span><span>Designed with care. Built with <Heart size={12} /> and React.</span><button className="privacy-button" onClick={() => setDialog({ type: 'privacy' })}>Privacy</button></div></div></footer>

    {dialog?.type === 'contact' && <ContactDialog onClose={() => setDialog(null)} />}
    {dialog?.type === 'project' && <ProjectDialog project={dialog.project} onClose={() => setDialog(null)} onStart={startProject} />}
    {dialog?.type === 'privacy' && <Dialog title="Your privacy, simply." onClose={() => setDialog(null)} className="privacy-dialog"><p>This website does not use analytics or advertising cookies. If you write a project brief, your draft is saved in this browser’s local storage so you can come back to it. It is not submitted to a server.</p><p>Downloading a brief saves a text file on your device. If a studio email address has been configured, choosing “Continue in email” opens your own email app; the site does not send the message for you.</p><p>Fonts are served by Google Fonts. Site hosting and font providers may process standard connection information such as an IP address.</p><button className="button button-secondary" onClick={() => { try { localStorage.removeItem('nexzo-project-draft'); } catch { /* No stored data to clear. */ } setDialog({ type: 'privacy-cleared' }); }}>Clear my saved draft</button></Dialog>}
    {dialog?.type === 'privacy-cleared' && <Dialog title="Draft cleared." onClose={() => setDialog(null)} className="privacy-dialog"><p>Your saved project brief has been removed from this browser.</p><Button onClick={() => setDialog(null)} arrow={false}>Done</Button></Dialog>}
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
