import { useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { site } from '../../config/site';
import { serviceOptions } from '../../data/services';
import Button from '../../components/ui/Button';
import useProjectDraft from './useProjectDraft';
import { createBrief, createEmailLinks } from './projectBrief';

export default function ContactForm() {
  const { search } = useLocation();
  const { form, update } = useProjectDraft(search);
  const [prepared, setPrepared] = useState(false);
  const headingRef = useRef(null);
  const links = createEmailLinks(form, site.email);

  function prepareEmail(event) {
    event.preventDefault();
    setPrepared(true);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function downloadBrief() {
    const url = URL.createObjectURL(new Blob([createBrief(form)], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nexzo-resumo-do-projeto.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  if (prepared) return <section className="contact-form-panel prepared-email" aria-labelledby="prepared-heading">
    <span className="section-label">O próximo passo</span>
    <h2 id="prepared-heading" tabIndex={-1} ref={headingRef}>O seu email está preparado</h2>
    <p>O destinatário é <strong>{site.email}</strong>. Escolha onde abrir a mensagem, reveja os detalhes e confirme o envio nessa aplicação.</p>
    <div className="brief-preview"><dl><div><dt>Nome</dt><dd>{form.name}</dd></div><div><dt>Email</dt><dd>{form.email}</dd></div><div><dt>Projeto</dt><dd>{serviceOptions.find(({ value }) => value === form.service)?.label}</dd></div><div><dt>Investimento previsto</dt><dd>{form.budget || 'A definir'}</dd></div></dl><p>{form.details}</p></div>
    <p className="email-status" role="status">A mensagem ainda não foi enviada.</p>
    <div className="email-actions"><Button href={links.email}>Abrir aplicação de email</Button><Button href={links.gmail} secondary target="_blank" rel="noopener noreferrer">Abrir no Gmail<span className="sr-only"> (abre num novo separador)</span></Button></div>
    <div className="form-secondary-actions"><button type="button" className="text-button" onClick={() => setPrepared(false)}>Editar os detalhes</button><button type="button" className="text-button" onClick={downloadBrief}>Guardar uma cópia</button></div>
  </section>;

  return <section className="contact-form-panel" aria-labelledby="contact-form-heading">
    <h2 id="contact-form-heading">Fale-nos do seu projeto</h2>
    <p className="form-intro">Preencha os detalhes para preparar um email. O envio é concluído na sua aplicação de email ou no Gmail.</p>
    <form className="contact-form" onSubmit={prepareEmail}>
      <div className="form-row"><label>O seu nome<input name="name" value={form.name} onChange={update} autoComplete="name" placeholder="Nome e apelido" maxLength={100} required /></label><label>Endereço de email<input type="email" name="email" value={form.email} onChange={update} autoComplete="email" placeholder="nome@empresa.com" maxLength={254} required /></label></div>
      <label>O que tem em mente?<select name="service" value={form.service} onChange={update}>{serviceOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label>Investimento previsto (opcional)<input name="budget" value={form.budget} onChange={update} placeholder="Valor aproximado em meticais, ou a definir" maxLength={100} /></label>
      <label>Conte-nos um pouco sobre o projeto<textarea name="details" value={form.details} onChange={update} placeholder="O que faz o seu negócio e o que gostaria de alcançar com o novo site?" rows={5} minLength={10} maxLength={5000} required /></label>
      <Button type="submit" className="form-submit">Preparar email</Button>
      <p className="form-note">Destinatário: {site.email}. O rascunho fica apenas neste navegador.</p>
    </form>
  </section>;
}
