import './css/style.css';
import './components/HeaderBar.js';
import './components/FooterBar.js';
import './components/NoteItem.js';
import './components/NoteList.js';
import './components/NoteForm.js';
import './components/LoadingIndicator.js';
import './components/ErrorToast.js';

// Theme setup
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// Handle note events
document.addEventListener('noteUpdated', () => {
    const noteList = document.querySelector('note-list');
    const activeTab = document.querySelector('.tab.active');
    noteList.showArchived = activeTab.dataset.tab === 'archived';
});

document.addEventListener('noteDeleted', () => {
    const noteList = document.querySelector('note-list');
    const activeTab = document.querySelector('.tab.active');
    noteList.showArchived = activeTab.dataset.tab === 'archived';
});

// Tab navigation
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const noteList = document.querySelector('note-list');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            noteList.showArchived = tab.dataset.tab === 'archived';
        });
    });
});
