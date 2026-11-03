import PageIntro from '../components/ui/PageIntro';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <>
      <PageIntro
        label="Página não encontrada"
        title="Este endereço não existe"
        description="A página pode ter mudado de endereço. Pode voltar ao início ou conhecer os nossos projetos."
      />
      <div className="container not-found-actions">
        <Button to="/">Voltar ao início</Button>
        <Button to="/projetos" secondary>
          Ver os projetos
        </Button>
      </div>
    </>
  );
}
