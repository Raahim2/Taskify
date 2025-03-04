import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Note({ initialNote = '', onSave }) {
  const [noteText, setNoteText] = useState(initialNote);

  const handleTextChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleSave = () => {
    onSave(noteText);
  };

  return (
    <div>
      <textarea value={noteText} onChange={handleTextChange} />
      <button onClick={handleSave}>Save</button>
      <h2>Preview</h2>
      <ReactMarkdown>{noteText}</ReactMarkdown>
    </div>
  );
}

export default Note;