import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from'react-redux';
import { actions } from '../actions';
import { getNotesByFolder } from '../selectors';
import { isNoteEmpty } from '../utils';
import NoteListItem from './NoteListItem';

const NotesList = ({ 
  notes, 
  selectedNoteId, 
  selectedFolderId,
  shouldDeleteNote,
  userBeganTyping,
  setSelectedNoteId, 
  setCreateButtonDisabled, 
  deleteNote, 
  setShouldDeleteNote,
  setUserBeganTyping,
  toggleFolder }) => {
  console.log('NotesList render');
  const selectedRef = useRef();
  const userBeganTypingRef = useRef();

  useEffect(() => {
    // set selectedRef here to prevent unnecessary NoteListItem re-renders caused by onClick and notes changing
    const noteIndex = notes.findIndex(v => v.id === selectedNoteId);
    const noteData = noteIndex > -1 ? notes[noteIndex] : '';
    selectedRef.current = {
      id: selectedNoteId,
      isNoteEmpty: noteData ? isNoteEmpty(noteData.noteAsText) : true,
    };
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
    const beganTyping = userBeganTypingRef.current;

    if (shouldDeleteNote) {
      const noteToDeleteIndex = notes.findIndex(val => val.id === selectedNoteId);

      if (notes.length === 1) {
        deleteNote(selectedNoteId);
        setShouldDeleteNote(false);
        return;
      }

      let newSelectedIndex;
      if (noteToDeleteIndex === notes.length - 1) {
        newSelectedIndex = noteToDeleteIndex - 1
      } else {
        newSelectedIndex = noteToDeleteIndex + 1
      }

      setSelectedNoteId(notes[newSelectedIndex].id);
      deleteNote(selectedNoteId);
      setShouldDeleteNote(false);
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
          isSelected={selectedNoteId === note.id}
          userBeganTyping={selectedNoteId === note.id ? userBeganTyping : false}
          selectedFolderId={selectedFolderId}
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
    selectedFolderId: state.selectedFolderId,
    shouldDeleteNote: state.shouldDeleteNote,
    userBeganTyping: state.userBeganTyping,
});

const mapDispatchToProps = {
  setSelectedNoteId: actions.setSelectedNoteId,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  deleteNote: actions.deleteNote,
  setShouldDeleteNote: actions.setShouldDeleteNote,
  setUserBeganTyping: actions.setUserBeganTyping,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
