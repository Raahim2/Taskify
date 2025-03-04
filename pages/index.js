import { useState, useEffect } from 'react';
import Note from '../components/Note';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

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

  return (
    <div>
      <h1>Notes App</h1>
      <div>
        <textarea
          value={newNoteText}
          onChange={handleNoteChange}
          placeholder="Enter your note..."
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Note text={note.text} onUpdate={(updatedText) => handleNoteUpdate(note.id, updatedText)} onDelete={() => handleNoteDelete(note.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
