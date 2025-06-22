import { addNote } from '../utils/api.js';

class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.form = null;
        this.titleInput = null;
        this.bodyInput = null;
        this.errorTitle = null;
        this.errorBody = null;
        this.statusDiv = null;
        this.submitBtn = null;
        this.btnText = null;
        this.loadingIndicator = null;
    }

    connectedCallback() {
        this.render();
        this.cacheElements();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
      <form novalidate>
        <h2>Tambah Catatan</h2>
        <input type="text" id="title" placeholder="Judul catatan" required minlength="3" />
        <small class="error-title" style="color: #ef4444; display: none;">Judul minimal 3 karakter</small>
        <textarea id="body" rows="5" placeholder="Isi catatan..." required minlength="5"></textarea>
        <small class="error-body" style="color: #ef4444; display: none;">Isi catatan minimal 5 karakter</small>
        <button type="submit" class="submit-btn">
          <span class="btn-text">💾 Simpan Catatan</span>
          <span class="loading" style="display: none;"></span>
        </button>
        <div class="form-status" style="margin-top: 1rem;"></div>
      </form>
    `;
    }

    cacheElements() {
        this.form = this.querySelector('form');
        this.titleInput = this.querySelector('#title');
        this.bodyInput = this.querySelector('#body');
        this.errorTitle = this.querySelector('.error-title');
        this.errorBody = this.querySelector('.error-body');
        this.statusDiv = this.querySelector('.form-status');
        this.submitBtn = this.querySelector('.submit-btn');
        this.btnText = this.submitBtn.querySelector('.btn-text');
        this.loadingIndicator = this.submitBtn.querySelector('.loading');
    }

    setupEventListeners() {
        this.titleInput.addEventListener('input', this.validate.bind(this));
        this.bodyInput.addEventListener('input', this.validate.bind(this));
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    validate() {
        const titleValid = this.titleInput.value.trim().length >= 3;
        const bodyValid = this.bodyInput.value.trim().length >= 5;

        this.errorTitle.style.display = titleValid ? 'none' : 'block';
        this.errorBody.style.display = bodyValid ? 'none' : 'block';

        return titleValid && bodyValid;
    }

    showLoading() {
        this.btnText.style.display = 'none';
        this.loadingIndicator.style.display = 'inline-block';
        this.loadingIndicator.innerHTML = `
      <div style="width: 20px; height: 20px; border: 3px solid rgba(255,255,255,.3); 
      border-radius: 50%; border-top-color: #fff; animation: spin 1s ease-in-out infinite;">
      </div>`;
        this.submitBtn.disabled = true;
    }

    hideLoading() {
        this.btnText.style.display = 'inline-block';
        this.loadingIndicator.style.display = 'none';
        this.submitBtn.disabled = false;
    }

    showSuccess(message) {
        this.statusDiv.textContent = message;
        this.statusDiv.style.color = '#10b981';
    }

    showError(message) {
        this.statusDiv.textContent = message;
        this.statusDiv.style.color = '#ef4444';
    }

    resetForm() {
        this.form.reset();
        this.errorTitle.style.display = 'none';
        this.errorBody.style.display = 'none';
        this.statusDiv.textContent = '';
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        try {
            this.showLoading();
            this.statusDiv.textContent = '';

            await addNote({
                title: this.titleInput.value.trim(),
                body: this.bodyInput.value.trim()
            });

            this.showSuccess('Note saved successfully!');
            document.querySelector('note-list').dispatchEvent(new CustomEvent('noteUpdated', { bubbles: true }));

            setTimeout(() => {
                this.resetForm();
            }, 2000);
        } catch (error) {
            this.showError(`Failed to save note: ${error.message}`);
            console.error('Error:', error);
        } finally {
            this.hideLoading();
        }
    }
}

customElements.define('note-form', NoteForm);