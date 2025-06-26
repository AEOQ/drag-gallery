import { A, E, O, Q } from 'https://aeoq.github.io/AEOQ.mjs';
import PointerInteraction from 'https://aeoq.github.io/pointer-interaction/script.js';
const tagName = 'drag-gallery';
customElements.define(tagName, class extends HTMLElement {
  #counter = 0;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).append(
      E('link', {rel: 'stylesheet', href: `https://aeoq.github.io/${tagName}/style.css` }),
      this.dialog = E('dialog', [
        E('div', [
          E('button', {classList: 'small'}, '🔎➖'),
          E('button', {classList: 'large'}, '➕🔍')
        ]),
        E('form', {method: 'dialog'}, [E('button')])
      ])
    );
  }
  connectedCallback() {
    this.arrange();
    this.events();
    setTimeout(() => this.hidden = false);
  }
  arrange() {
    let figures = [...this.querySelectorAll('figure')];
    this.dialog.append(...figures.map((figure, i) =>
      E('figure', [E('slot', {name: `slot-${this.#counter + i}`})])
    ));
    this.append(...figures.flatMap((figure, i) => 
      [...figure.children].map(img => E(img).set({
        slot: `slot-${this.#counter + i}`, 
        classList: img.classList + (img.alt ? ' lookup' : '')
      }))
    ));
    figures.forEach(figure => figure.remove());
    this.#counter++;
  }
  events() {
    new MutationObserver(([{addedNodes}]) => addedNodes?.length > 0 && this.arrange()).observe(this, {childList: true});
    PointerInteraction.events([[
      this.sQ('figure slot'), 
      {drag: PI => PI.drag.to.scroll({x: true, y: false})} 
    ]]);
    this.Q('img.lookup', img => img.ondblclick = () => open(`https://www.google.com/search?q=${img.alt}&udm=2`));
    this.sQ('.small,.large', button => button.onclick = () =>
      E(this.dialog).set({'--f': (E(this.dialog).get('--f') || 1) + .1 * (button.classList[0] == 'large' ? 1 : -1)})
    );
    let a = Q(`a[href='#${this.id}']`);
    a && (a.onclick = () => this.open());
    this.id && window.location.hash == this.id && this.open();
  }
  open = () => this.dialog.showModal();
});
