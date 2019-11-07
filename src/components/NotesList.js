import React from 'react';

const NotesList = ({ notes, toggleFolder }) => {
  console.log('NotesList render')
  
  return (
    <section className={'notes-list ' + (toggleFolder ? '' : 'folders-hidden')}>
      <ul>
      {notes.map(note => (
        <li key={note.id}>
          <div className="title">{note.title}</div>
          <div className="subtitle">
            <span className="last-updated">{note.lastUpdated}</span> {note.note}
          </div>
        </li>
      ))}
      </ul>
    </section>
  )
};

export default NotesList;
