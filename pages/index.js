import { useState, useEffect } from 'react';
import Note from '../components/Note';
import styles from './index.module.css';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskError, setTaskError] = useState('');
  const [noteError, setNoteError] = useState('');


  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setIsDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [notes, tasks, isDarkMode]);

  const handleNoteChange = (event) => {
    setNewNoteText(event.target.value);
    setNoteError('');
  };

  const handleAddNote = () => {
    if (newNoteText.trim() !== '') {
      const newNote = {
        id: Date.now(),
        text: newNoteText,
      };
      setNotes([...notes, newNote]);
      setNewNoteText('');
      setNoteError('');
    } else {
      setNoteError('Note cannot be empty');
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

  const handleTaskChange = (event) => {
    setNewTaskText(event.target.value);
    setTaskError('');
  };

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: newTaskText,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      setTaskError('');
    } else {
      setTaskError('Task cannot be empty');
    }
  };

  const handleTaskDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? styles.darkMode : ''}>
      <div className={styles.header}>
        <h1>Notes & Tasks App</h1>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className={styles.noteInput}>
        <h2>Notes</h2>
        <textarea
          value={newNoteText}
          onChange={handleNoteChange}
          placeholder="Enter your note..."
          className={styles.textarea}
        />
        <button onClick={handleAddNote} className={styles.addButton}>Add Note</button>
        {noteError && <p style={{ color: 'red' }}>{noteError}</p>}
      </div>
      <ul className={styles.noteList}>
        {notes.map((note) => (
          <li key={note.id} className={styles.noteItem}>
            <Note text={note.text} onUpdate={(updatedText) => handleNoteUpdate(note.id, updatedText)} onDelete={() => handleNoteDelete(note.id)} />
          </li>
        ))}
      </ul>
      <div className={styles.taskInput}>
        <h2>Tasks</h2>
        <input
          type="text"
          value={newTaskText}
          onChange={handleTaskChange}
          placeholder="Enter your task..."
          className={styles.taskInput}
        />
        <button onClick={handleAddTask} className={styles.addButton}>Add Task</button>
        {taskError && <p style={{ color: 'red' }}>{taskError}</p>}
      </div>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <span>{task.text}</span>
            <button onClick={() => handleTaskDelete(task.id)} className={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}