class FooterBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer style="background: var(--primary); color: white; text-align: center; padding: 1rem; margin-top: 2rem; font-size: 0.9rem; box-shadow: 0 -2px 10px var(--shadow);">
        © 2025 Notes App. Dibuat dengan Arya Gunawan.
      </footer>`;
  }
}
customElements.define('footer-bar', FooterBar);
