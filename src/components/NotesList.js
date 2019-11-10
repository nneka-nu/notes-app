import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from'react-redux';
import { actions } from '../actions';
import { getNotesByFolder } from '../selectors';
import { isNoteEmpty } from '../utils';
import NoteListItem from './NoteListItem';

const NotesList = ({ 
  notes, 
  selectedNoteId, 
  noteToDelete,
  userBeganTyping,
  setSelectedNoteId, 
  setCreateButtonDisabled, 
  deleteNote, 
  setNoteToDelete,
  setNotesInActiveFolder,
  setUserBeganTyping,
  toggleFolder }) => {
  console.log('NotesList render');
  const selectedRef = useRef();
  const userBeganTypingRef = useRef();

  useEffect(() => {
    // set ref here to prevent unnecessary NoteListItem re-renders caused by onClick and notes changing
    const noteData = notes[notes.findIndex(v => v.id === selectedNoteId)]
    selectedRef.current = {
      id: selectedNoteId,
      isNoteEmpty: isNoteEmpty(noteData.noteAsText),
    }
  }, [selectedNoteId, notes]);

  useEffect(() => {
    userBeganTypingRef.current = userBeganTyping
  }, [userBeganTyping]);

  const handleItemClick = useCallback((note) => {
    const selected = selectedRef.current;
    const beganTyping = userBeganTypingRef.current;

    if (selected.id === note.id) {
      return;
    }
   
    /* User selected another note after creating a new blank note 
      or after deleting contents of an old note.
      Delete blank note. */
    if (selected.isNoteEmpty) {
      setCreateButtonDisabled(false);
      deleteNote(selected.id);
      setSelectedNoteId(note.id);
      if (beganTyping) {
        setUserBeganTyping(false);
      }
      return;
    }
    
    // all notes have a value
    setSelectedNoteId(note.id);
    if (beganTyping) {
      setUserBeganTyping(false);
    }
  }, [deleteNote, setCreateButtonDisabled, setSelectedNoteId, setUserBeganTyping]);

  useEffect(() => {
    setNotesInActiveFolder(notes.length > 0);
  }, [notes.length, setNotesInActiveFolder]);

  useEffect(() => {
    const beganTyping = userBeganTypingRef.current;

    if (noteToDelete) {
      const noteToDeleteIndex = notes.findIndex(val => val.id === noteToDelete);

      if (notes.length === 1) {
        deleteNote(noteToDelete);
        setNoteToDelete('');
        setNotesInActiveFolder(false);
        setCreateButtonDisabled(false);
        return;
      }

      let newSelectedIndex;
      if (noteToDeleteIndex === notes.length - 1) {
        newSelectedIndex = noteToDeleteIndex - 1
      } else {
        newSelectedIndex = noteToDeleteIndex + 1
      }

      setSelectedNoteId(notes[newSelectedIndex].id);
      
      deleteNote(noteToDelete);
      setNoteToDelete('');
      setCreateButtonDisabled(false);
      if (beganTyping) {
        setUserBeganTyping(false);
      }
    }
  });

  return (
    <section className={'notes-list ' + (toggleFolder ? '' : 'folders-hidden')}>
      <ul>
      {notes.map((note) => (
        <NoteListItem 
          key={note.id}
          isSelected={selectedNoteId === note.id ? true : false}
          userBeganTyping={selectedNoteId === note.id ? userBeganTyping : false}
          note={note}
          onClick={handleItemClick}
        />
      ))}
      </ul>
    </section>
  );
};

const mapStateToProps = (state) => ({
    notes: getNotesByFolder(state),
    selectedNoteId: state.selectedNoteId,
    noteToDelete: state.noteToDelete,
    userBeganTyping: state.userBeganTyping,
});

const mapDispatchToProps = {
  setSelectedNoteId: actions.setSelectedNoteId,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  deleteNote: actions.deleteNote,
  setNoteToDelete: actions.setNoteToDelete,
  setNotesInActiveFolder: actions.setNotesInActiveFolder,
  setUserBeganTyping: actions.setUserBeganTyping,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
