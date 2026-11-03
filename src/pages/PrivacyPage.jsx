import { useState } from 'react';
import { site } from '../config/site';
import { draftKey } from '../features/contact/projectBrief';
import PageIntro from '../components/ui/PageIntro';
import Button from '../components/ui/Button';

export default function PrivacyPage() {
  const [message, setMessage] = useState('');
  function clearDraft() {
    try { localStorage.removeItem(draftKey); setMessage('O rascunho foi apagado deste navegador.'); }
    catch { setMessage('Não foi possível aceder ao armazenamento. Pode apagá-lo nas definições do navegador.'); }
  }
  return <><PageIntro label="Privacidade" title="Os seus dados, com clareza" description="Como funciona o formulário e o que fica guardado neste navegador." /><article className="container prose-page"><h2>O rascunho do seu projeto</h2><p>Este site não utiliza cookies de publicidade nem ferramentas de análise de visitas. O formulário guarda um rascunho no armazenamento local do navegador para poder continuar a preenchê-lo mais tarde.</p><h2>Preparar e enviar um email</h2><p>O formulário prepara uma mensagem para {site.email}. Os detalhes são transferidos para a aplicação que escolher quando abrir o email ou o Gmail. O envio tem de ser confirmado nessa aplicação. O site não envia emails automaticamente nem guarda os pedidos num servidor.</p><h2>Guardar uma cópia</h2><p>Se descarregar o resumo, o ficheiro de texto fica no seu dispositivo.</p><h2>Fontes e alojamento</h2><p>As fontes são carregadas através do Google Fonts. Os fornecedores de alojamento e de fontes podem tratar dados técnicos de ligação, como o endereço IP.</p><h2>Apagar o rascunho</h2><p>Pode remover o resumo guardado neste navegador. Esta ação não apaga os ficheiros descarregados nem as mensagens enviadas na sua aplicação de email.</p><Button secondary onClick={clearDraft}>Apagar o meu rascunho</Button>{message && <p className="privacy-status" role="status">{message}</p>}</article></>;
}
