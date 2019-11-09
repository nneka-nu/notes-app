import React from 'react';
import { connect } from'react-redux';
import moment from 'moment';
import { actions } from '../actions';
import { getNotesByFolder } from '../selectors';
import { editorIsBlank } from '../utils';

const NotesList = ({ notes, selectedNote, setSelectedNote, setCreateButtonDisabled, deleteNote, toggleFolder }) => {
  console.log('NotesList render');

  const handleItemClick = (note, index) => {
    if (selectedNote.id === note.id) {
      return;
    }

    const currentSelectedNoteIndex = notes.findIndex(item => item.id === selectedNote.id); 
    const currentSelectedNote = notes[currentSelectedNoteIndex];
    let emptyNote = true;

    if (currentSelectedNote.note !== '') {
      const quillOps = JSON.parse(currentSelectedNote.note).ops;
      emptyNote = editorIsBlank(quillOps);
    }

    // User selected another note after creating new blank note
    // or after deleting contents of an old note.
    // Delete blank note.
    if (emptyNote) {
      setCreateButtonDisabled(false);
      deleteNote(selectedNote.id);
      let newIndex = 0;
      if (index > selectedNote.index) {
        newIndex = index - 1;
      } else if (index < selectedNote.index) {
        newIndex = index;
      }
      setSelectedNote({
        id: note.id,
        note: note.note,
        index: newIndex,
        className: 'selected'
      });
      return;
    }
    
    // all notes have a value
    setSelectedNote({
      id: note.id,
      note: note.note,
      index,
      className: 'selected'
    });
  }

  return (
    <section className={'notes-list ' + (toggleFolder ? '' : 'folders-hidden')}>
      <ul>
      {notes.map((note, index) => {
        let dateOrTime = '';
        let title = note.note ? 'note has value' : 'New note'
        let subtitle = note.note ? 'note has subtitle': 'No additional text'
        let nowMoment = moment();
        let lastUpdatedMoment = moment(note.lastUpdated);
        let differenceInDays = nowMoment.diff(lastUpdatedMoment, 'days');

        if (differenceInDays !== 0 && differenceInDays <= 6) { // show day
          dateOrTime = lastUpdatedMoment.format('dddd')
        } else if (differenceInDays === 0) { // show time.
          dateOrTime = lastUpdatedMoment.format('h:mm A');
        } else { // show date
          dateOrTime = lastUpdatedMoment.format('MM/D/YY');
        }

        return (
            <li 
              key={note.id} 
              id={note.id} 
              className={selectedNote.id === note.id ? selectedNote.className : ''}
              onClick={() => handleItemClick(note, index)}
            >
              <div className="title">{title}</div>
              <div className="subtitle">
                <span className="last-updated">{dateOrTime}</span> 
                <span className="text">{subtitle}</span>
              </div>
            </li>
        )
      })}
      </ul>
    </section>
  )
};

const mapStateToProps = (state) => ({
    notes: getNotesByFolder(state),
    selectedNote: state.selectedNote,
});

const mapDispatchToProps = {
  setSelectedNote: actions.setSelectedNote,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  deleteNote: actions.deleteNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
