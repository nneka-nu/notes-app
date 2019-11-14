import React, { forwardRef } from 'react';
import uuidv1 from 'uuid/v1';
import moment from 'moment';
import { GoListUnordered, GoListOrdered, GoTrashcan } from 'react-icons/go';
import { FiColumns, FiEdit } from 'react-icons/fi';
import { connect } from 'react-redux';
import { actions } from '../actions';
import { getNotesByFolder, getNotesBySearch } from '../selectors';
import { isNoteEmpty } from '../utils';

const Toolbar = forwardRef((props, ref) => {
  const { 
    selectedFolderId,
    createButtonDisabled,
    notesAvailable,
    firstNote,
    search,
    setCreateButtonDisabled,
    setSelectedNoteId,
    onToggleFolder,
    createNote,
    setShouldDeleteNote,
    setSearchInfo,
    deleteNote } = props;

  const handleCreateNote = () => {
    setSearchInfo('', false);
    const defaultNote = {
      "ops": [{"insert":"\n"}]
    };
    let newNote = {
      id: uuidv1(), 
      noteAsDelta: defaultNote,
      noteAsText: '',
      folderId: selectedFolderId, 
      lastUpdated: moment().format()
    };
    setCreateButtonDisabled(true);
    createNote(newNote);
    setSelectedNoteId(newNote.id);
  };

  const handleToggleFolder = () => {
    onToggleFolder();
  };

  const handleDeleteNote = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setShouldDeleteNote(true);
    }
  };

  const handleSearch = (e) => {
    if (firstNote && isNoteEmpty(firstNote.noteAsText)) {
      deleteNote(firstNote.id);
    }
    let term = e.target.value;
    if (!term.trim()) {
      setSearchInfo('', true)
      return;
    }
    setSearchInfo(term, false);
  };

  return (
    <>
      <div id="quill-toolbar" ref={ref}>
        <button
          className="columns-icon"
          title="Show/hide folders"
          onClick={handleToggleFolder}
        >
          <FiColumns />
        </button>
        <button
          title="Delete note"
          className="trash-icon"
          disabled={!notesAvailable}
          onClick={handleDeleteNote}
        >
          <GoTrashcan />
        </button>
        <button
          title="Create note"
          className="create-icon"
          disabled={createButtonDisabled}
          onClick={handleCreateNote}
        >
          <FiEdit />
        </button>
        <button 
          className="ql-bold" 
          disabled={!notesAvailable}>
            B
        </button>
        <button 
          className="ql-italic" 
          disabled={!notesAvailable}>
            I
        </button>
        <button 
          className="ql-underline" 
          disabled={!notesAvailable}>
            U
        </button>
        <button 
          className="ql-list" 
          value="ordered" 
          disabled={!notesAvailable}>
          <GoListOrdered />
        </button>
        <button 
          className="ql-list" 
          value="bullet" 
          disabled={!notesAvailable}>
          <GoListUnordered />
        </button>
      </div>
      <input 
        name="search"
        type="search"
        placeholder="Search"
        value={search.term}
        onChange={handleSearch}
      />
    </>
  );
});

const mapStateToProps = (state) => {
  let notes = [];
  const term = state.search.term;
  if (term) {
    notes = getNotesBySearch(state);
  } else {
    notes = getNotesByFolder(state);
  }

  return {
    selectedFolderId: state.selectedFolderId,
    createButtonDisabled: state.createButtonDisabled,
    notesAvailable: notes.length > 0,
    firstNote: notes[0],
    search: state.search,
  };
};

const mapDispatchToProps = {
  createNote: actions.createNote,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  setSelectedNoteId: actions.setSelectedNoteId,
  setShouldDeleteNote: actions.setShouldDeleteNote,
  setSearchInfo: actions.setSearchInfo,
  deleteNote: actions.deleteNote,
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps, 
  null, 
  { forwardRef: true }
)(Toolbar);
