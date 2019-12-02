import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from'react-redux';
import { Flipper } from 'react-flip-toolkit';
import { actions } from '../actions';
import { getNotesByFolder, getNotesBySearch } from '../selectors';
import { isNoteEmpty } from '../utils';
import NoteListItemWrapper from './NoteListItemWrapper';
import { setSearchInfo } from '../actions/search';

const NotesList = ({ 
  notes, 
  selectedNoteId, 
  selectedFolderId,
  search,
  allNotes,
  folders,
  shouldDeleteNote,
  setSelectedNoteId, 
  setCreateButtonDisabled, 
  deleteNote, 
  setShouldDeleteNote,
  toggleFolder }) => {
  const selectedRef = useRef();
  const selectedFolderIdRef = useRef();
  const selectedNoteIdRef = useRef();
  const allNotesRef = useRef(); // no search/folder filter
  const notesRef = useRef();
  const flipKey = notes.map(note => note.lastUpdated).join('');

  const handleItemClick = useCallback((note) => {
    const selected = selectedRef.current;
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
      return;
    }
    
    // all notes have a value
    setSelectedNoteId(note.id);
  }, [deleteNote, setCreateButtonDisabled, setSelectedNoteId]);

  useEffect(() => {
    selectedFolderIdRef.current = selectedFolderId;
    selectedNoteIdRef.current = selectedNoteId;
    allNotesRef.current = allNotes;
    notesRef.current = notes;
  }, [selectedFolderId, selectedNoteId, allNotes, notes]);

  useEffect(() => {
    if (search.term.trim()) {
      if (notesRef.current.length > 0) {
        setSelectedNoteId(notesRef.current[0].id);
      } else {
        setSelectedNoteId('');
      }
    }
  }, [search, setSelectedNoteId]);

  useEffect(() => {
    if (search.isSearchComplete && selectedFolderIdRef.current) {
      let selectedfolderNotes = allNotesRef.current.filter(note => 
        note.folderId === selectedFolderIdRef.current
      );
      if (selectedfolderNotes.length > 0) {
        setSelectedNoteId(selectedfolderNotes[0].id);
      } else {
        setSelectedNoteId('');
      }
      setSearchInfo('', false);
    }
  }, [search, setSelectedNoteId]);

  useEffect(() => {
    // set selectedRef here to prevent unnecessary NoteListItemWrapper re-renders caused by onClick and notes changing
    const noteIndex = notes.findIndex(v => v.id === selectedNoteId);
    const noteData = noteIndex > -1 ? notes[noteIndex] : '';
    selectedRef.current = {
      id: selectedNoteId,
      isNoteEmpty: noteData ? isNoteEmpty(noteData.noteAsText) : true,
    };
  }, [selectedNoteId, notes]);

  useEffect(() => {
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
    }
  });

  return (
    <section className={'notes-list ' + (toggleFolder ? '' : 'folders-hidden')}>
      <Flipper flipKey={flipKey}>
        <ul data-testid="list-of-notes">
          {notes.map((note) => {
            const folder = folders.filter(folder => folder.id === note.folderId);
            const folderName = folder.length > 0 ? folder[0].name : '';
            return (
              <NoteListItemWrapper 
                key={note.id}
                isSelected={selectedNoteId === note.id}
                selectedFolderId={selectedFolderId}
                folderName={folderName}
                searchTerm={search.term}
                note={note}
                onClick={handleItemClick}
              />
            )
          })}
        </ul>
      </Flipper>
    </section>
  );
};


const mapStateToProps = (state) => {
  let notes = [];
  const term = state.search.term;
  if (term) {
    notes = getNotesBySearch(state);
  } else {
    notes = getNotesByFolder(state);
  }

  return {
    notes,
    allNotes: state.notes,
    folders: state.folders,
    selectedNoteId: state.selectedNoteId,
    selectedFolderId: state.selectedFolderId,
    shouldDeleteNote: state.shouldDeleteNote,
    search: state.search,
  }
};

const mapDispatchToProps = {
  setSelectedNoteId: actions.setSelectedNoteId,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  deleteNote: actions.deleteNote,
  setShouldDeleteNote: actions.setShouldDeleteNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
