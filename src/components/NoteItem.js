import { archiveNote, unarchiveNote, deleteNote } from '../utils/api.js';

class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'body', 'created', 'note-id', 'archived'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  async handleDelete(noteId) {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        // Tambahkan animasi fade-out sebelum penghapusan
        this.style.animation = 'fadeOut 0.3s forwards';

        // Tunggu animasi selesai
        await new Promise(resolve => setTimeout(resolve, 300));

        await deleteNote(noteId);
        this.dispatchEvent(new CustomEvent('noteDeleted', { bubbles: true }));
      } catch (error) {
        // Kembalikan tampilan jika terjadi error saat penghapusan
        this.style.animation = '';
        alert('Failed to delete note. Please try again.');
        console.error('Error:', error);
      }
    }
  }

  render() {
    const noteId = this.getAttribute('note-id');
    const isArchived = this.getAttribute('archived') === 'true';
    const title = this.getAttribute('title') || 'Tanpa Judul';
    const body = this.getAttribute('body') || '';
    const created = this.getAttribute('created');
    const createdDate = created ? new Date(created).toLocaleDateString() : '-';

    this.innerHTML = `
      <article style="
        background: var(--card-bg); 
        padding: 1.2rem; 
        border-radius: 10px; 
        box-shadow: 0 4px 10px var(--shadow); 
        display: flex; 
        flex-direction: column; 
        gap: 0.5rem; 
        position: relative;
      ">
        <h3 style="margin: 0; color: var(--accent);">${title}</h3>
        <p style="margin: 0.5rem 0;">${body}</p>
        <small style="color: gray;">${createdDate}</small>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
          <button class="archive-btn" style="background: ${isArchived ? '#10b981' : '#f59e0b'}; padding: 0.5rem; font-size: 0.8rem;">
            ${isArchived ? 'Unarchive' : 'Archive'}
          </button>
          <button class="delete-btn" style="background: #ef4444; padding: 0.5rem; font-size: 0.8rem;">Delete</button>
        </div>
      </article>
    `;

    this.querySelector('.archive-btn').addEventListener('click', async () => {
      try {
        if (isArchived) {
          await unarchiveNote(noteId);
        } else {
          await archiveNote(noteId);
        }
        this.dispatchEvent(new CustomEvent('noteUpdated', { bubbles: true }));
      } catch (error) {
        alert(`Failed to ${isArchived ? 'unarchive' : 'archive'} note. Please try again.`);
        console.error('Error:', error);
      }
    });

    this.querySelector('.delete-btn').addEventListener('click', () => {
      this.handleDelete(noteId);
    });
  }
}

customElements.define('note-item', NoteItem);
