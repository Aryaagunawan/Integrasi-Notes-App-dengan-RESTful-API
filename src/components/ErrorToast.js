class ErrorToast extends HTMLElement {
    constructor() {
        super();
        this._timeout = null;
    }

    show(message, duration = 5000) {
        this.innerHTML = `
      <div style="position: fixed; bottom: 1rem; right: 1rem; background: #ef4444; color: white; padding: 1rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000; animation: slideIn 0.3s ease-out;">
        <p style="margin: 0;">${message}</p>
      </div>
    `;

        if (this._timeout) {
            clearTimeout(this._timeout);
        }

        this._timeout = setTimeout(() => {
            this.innerHTML = '';
        }, duration);
    }
}

customElements.define('error-toast', ErrorToast);