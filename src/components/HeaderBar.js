class HeaderBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header style="background: var(--primary); padding: 1.2rem; color: white; font-size: 2rem; text-align: center; font-weight: bold; box-shadow: 0 2px 10px var(--shadow); position: relative;">
        📝 Notes App
        <button class="theme-toggle">🌗</button>
      </header>`;

    this.querySelector('.theme-toggle').addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  }
}
customElements.define('header-bar', HeaderBar);
