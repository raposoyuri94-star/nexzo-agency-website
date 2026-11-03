import { site } from '../../config/site';
import Button from '../ui/Button';
import InstagramLink from '../ui/InstagramLink';

export default function ContactBanner() {
  return (
    <section className="contact-section container">
      <div className="contact-banner">
        <div className="contact-orbit" aria-hidden="true" />
        <div className="contact-banner-content">
          <p>Tem um projeto em mente?</p>
          <h2>
            Vamos criar
            <br />o seu próximo site
          </h2>
          <p>Conte-nos o que precisa e prepare um email para a Nexzo.</p>
          <Button to="/contacto" className="button-white">
            Começar um projeto
          </Button>
          <div className="contact-links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <InstagramLink />
          </div>
        </div>
      </div>
    </section>
  );
}
