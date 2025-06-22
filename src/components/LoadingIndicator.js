class LoadingIndicator extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
      <div class="loading-container" style="display: flex; justify-content: center; padding: 2rem;">
        <div class="loading" style="width: 40px; height: 40px; border: 4px solid rgba(0,0,0,0.1); border-radius: 50%; border-top-color: var(--accent); animation: spin 1s ease-in-out infinite;"></div>
      </div>
    `;
    }
}

customElements.define('loading-indicator', LoadingIndicator);