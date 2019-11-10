import React, { forwardRef } from 'react';
import uuidv1 from 'uuid/v1';
import moment from 'moment';
import { GoListUnordered, GoListOrdered, GoTrashcan } from 'react-icons/go';
import { FiColumns, FiEdit } from 'react-icons/fi';
import { connect } from 'react-redux';
import { actions } from '../actions';

const Toolbar = forwardRef((props, ref) => {
  console.log('Toolbar render')
  const { 
    selectedFolderId,
    createButtonDisabled,
    notesAvailable,
    setCreateButtonDisabled,
    setSelectedNoteId,
    onToggleFolder,
    createNote,
    setShouldDeleteNote,
    setUserBeganTyping } = props;

  const handleCreateNote = (e) => {
    e.currentTarget.blur();
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
    setUserBeganTyping(true);
  };

  const handleToggleFolder = (e) => {
    e.currentTarget.blur();
    onToggleFolder();
  }

  const handleDeleteNote = (e) => {
    e.currentTarget.blur()
    if (window.confirm("Are you sure you want to delete this note?")) {
      setShouldDeleteNote(true);
    }
  }

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
        disabled={!notesAvailable}
      />
    </>
  );
});

const mapStateToProps = (state) => ({
  selectedFolderId: state.selectedFolderId,
  createButtonDisabled: state.createButtonDisabled,
  notesAvailable: state.notes.length > 0,
});

const mapDispatchToProps = {
  createNote: actions.createNote,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  setSelectedNoteId: actions.setSelectedNoteId,
  setShouldDeleteNote: actions.setShouldDeleteNote,
  setUserBeganTyping: actions.setUserBeganTyping,
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps, 
  null, 
  { forwardRef: true }
)(Toolbar);
