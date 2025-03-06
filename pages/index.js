import { useState, useEffect } from 'react';
import Note from '../components/Note';
import styles from './index.module.css';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setIsDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [notes, isDarkMode]);

  const handleNoteChange = (event) => {
    setNewNoteText(event.target.value);
  };

  const handleAddNote = () => {
    if (newNoteText.trim() !== '') {
      const newNote = {
        id: Date.now(),
        text: newNoteText,
      };
      setNotes([...notes, newNote]);
      setNewNoteText('');
    }
  };

  const handleNoteUpdate = (id, newText) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, text: newText };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const handleNoteDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? styles.darkMode : ''}>
      <div className={styles.header}>
        <h1>Notes App</h1>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className={styles.noteInput}>
        <textarea
          value={newNoteText}
          onChange={handleNoteChange}
          placeholder="Enter your note..."
          className={styles.textarea}
        />
        <button onClick={handleAddNote} className={styles.addButton}>Add Note</button>
      </div>
      <ul className={styles.noteList}>
        {notes.map((note) => (
          <li key={note.id} className={styles.noteItem}>
            <Note text={note.text} onUpdate={(updatedText) => handleNoteUpdate(note.id, updatedText)} onDelete={() => handleNoteDelete(note.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}