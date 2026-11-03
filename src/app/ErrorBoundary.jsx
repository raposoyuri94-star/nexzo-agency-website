import { Component } from 'react';
import { site } from '../config/site';

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError)
      return (
        <main className="error-page container">
          <h1>Não foi possível abrir esta página</h1>
          <p>Volte a carregar o site para tentar novamente.</p>
          <a className="button button-primary" href={site.basePath}>
            Voltar ao início
          </a>
        </main>
      );
    return this.props.children;
  }
}
