import './components/toggle-switch.js';

const template = document.createElement('template');

template.innerHTML = `
  <div>
    <h1>Hello world</h1>
    <toggle-switch></toggle-switch>
  </div>
`;

class App extends HTMLElement {
	constructor() {
		super();
		const rootElement = document.createElement('div');
		rootElement.appendChild(template.content.cloneNode(true));
		this.appendChild(rootElement);
	}
}

window.customElements.define('my-app', App);
