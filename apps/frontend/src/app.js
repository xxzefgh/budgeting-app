import { LitElement, html, css } from 'lit-element';

export class AppElement extends LitElement {
  render() {
    return html`
      Hello world
    `;
  }
}

customElements.define('app-root', AppElement);
