import { getActiveNotes, getArchivedNotes } from '../utils/api.js';

class NoteList extends HTMLElement {
    constructor() {
        super();
        this._notes = [];
        this._showArchived = false;
    }

    async connectedCallback() {
        await this.loadNotes();
        this.render();
    }

    async loadNotes() {
        this.innerHTML = '<loading-indicator></loading-indicator>';

        try {
            this._notes = this._showArchived
                ? await getArchivedNotes()
                : await getActiveNotes();
            this.render();
        } catch (error) {
            this.showError('Failed to load notes. Please try again later.');
            document.querySelector('error-toast').show(error.message);
            console.error('Error:', error);
        }
    }

    set showArchived(value) {
        this._showArchived = value;
        this.loadNotes();
    }

    showError(message) {
        this.innerHTML = `<div class="error" style="color: #ef4444; padding: 1rem; background: rgba(239, 68, 68, 0.1); border-radius: 8px; margin: 1rem 0;">${message}</div>`;
    }

    render() {
        this.innerHTML = '';

        if (this._notes.length === 0) {
            this.innerHTML = `
        <p style="text-align: center; grid-column: 1 / -1;">
          ${this._showArchived ? 'No archived notes' : 'No notes available. Add your first note!'}
        </p>
      `;
            return;
        }

        this._notes.forEach(note => {
            const item = document.createElement('note-item');
            item.setAttribute('title', note.title);
            item.setAttribute('body', note.body);
            item.setAttribute('created', note.createdAt);
            item.setAttribute('note-id', note.id);
            item.setAttribute('archived', note.archived);
            this.appendChild(item);
        });
    }
}

customElements.define('note-list', NoteList);