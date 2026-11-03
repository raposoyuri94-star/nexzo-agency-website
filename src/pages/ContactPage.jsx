import { site } from '../config/site';
import PageIntro from '../components/ui/PageIntro';
import InstagramLink from '../components/ui/InstagramLink';
import ContactForm from '../features/contact/ContactForm';

export default function ContactPage() {
  return (
    <>
      <PageIntro
        label="Contacto"
        title={
          <>
            O que vamos
            <br />
            criar juntos?
          </>
        }
        description="Conte-nos o que faz o seu negócio e o que tem em mente. Uma ideia ainda por explorar já é um bom ponto de partida."
      />
      <div className="container contact-page-grid">
        <aside className="contact-info">
          <h2>Vamos conversar</h2>
          <p>
            Pode escrever diretamente ou usar o formulário para organizar os detalhes do seu
            projeto.
          </p>
          <a className="contact-address" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <div className="contact-social">
            <span>Encontre-nos também no Instagram</span>
            <InstagramLink />
          </div>
          <div className="contact-expectation">
            <h3>Para onde vão os dados?</h3>
            <p>
              O formulário prepara uma mensagem para {site.email}. Escolha a sua aplicação de email
              ou o Gmail e confirme o envio. Até esse momento, o rascunho fica apenas neste
              navegador.
            </p>
          </div>
        </aside>
        <ContactForm />
      </div>
    </>
  );
}
