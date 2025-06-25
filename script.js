import { A, E, O, Q } from 'https://aeoq.github.io/AEOQ.mjs';
import PointerInteraction from 'https://aeoq.github.io/pointer-interaction/script.js';
const tagName = 'drag-gallery';
customElements.define(tagName, class extends HTMLElement {
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
    this.dialog.append(...[...this.children].map((figure, i) =>
      E('figure', [E('slot', {name: `slot-${i}`})])
    ));
    this.append(...[...this.children].map((figure, i) => 
      [...figure.children].map(img => 
        E(img).set({
          alt: img.src.match(/([^./]+)\.[^.]+$/)[1], 
          slot: `slot-${i}`
        })
      )
    ).flat());
    this.Q('figure:empty', figure => figure.remove());
    this.events();
    setTimeout(() => this.hidden = false);
  }
  events() {
    PointerInteraction.events([[
      this.sQ('figure slot'), 
      {drag: PI => PI.drag.to.scroll({x: true, y: false})} 
    ]]); 
    this.sQ('.small,.large', button => button.onclick = () =>
      E(this.dialog).set({'--f': (E(this.dialog).get('--f') || 1) + .1 * (button.classList[0] == 'large' ? 1 : -1)})
    );
    let a = Q(`a[href='#${this.id}']`);
    a && (a.onclick = () => this.open());
  }
  open = () => this.dialog.showModal();
});
