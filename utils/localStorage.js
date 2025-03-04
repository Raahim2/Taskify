export const loadNotes = () => {
  try {
    const notesJSON = localStorage.getItem('notes');
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (error) {
    console.error("Error loading notes from localStorage:", error);
    return [];
  }
};

export const saveNotes = (notes) => {
  try {
    localStorage.setItem('notes', JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes to localStorage:", error);
  }
};


export const addNote = (newNote) => {
    const notes = loadNotes();
    notes.push(newNote);
    saveNotes(notes);
}

export const deleteNote = (noteId) => {
    const notes = loadNotes();
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    saveNotes(updatedNotes);
}


export const updateNote = (updatedNote) => {
    const notes = loadNotes();
    const index = notes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
        notes[index] = updatedNote;
        saveNotes(notes);
    }
}