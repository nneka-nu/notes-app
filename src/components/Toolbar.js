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
    selectedNote,
    createButtonDisabled,
    notesInActiveFolder,
    setCreateButtonDisabled,
    setSelectedNote,
    onToggleFolder,
    createNote,
    setNoteToDelete } = props;

  const handleCreateNote = (e) => {
    e.currentTarget.blur();
    let newNote = {
      id: uuidv1(), 
      noteAsDelta: {
        "ops": [{"insert":"\n"}]
      },
      noteAsText: '',
      folderId: selectedFolderId, 
      lastUpdated: moment().format()
    };
    setCreateButtonDisabled(true);
    createNote(newNote);
    setSelectedNote({
      id: newNote.id,
      noteAsDelta: {
        "ops": [{"insert":"\n"}]
      },
      noteAsText: '',
      className: 'default'
    });
  };

  return (
    <>
      <div id="quill-toolbar" ref={ref}>
        <button
          className="columns-icon"
          title="Show/hide folders"
          onClick={(e) => {
            e.currentTarget.blur();
            onToggleFolder();
          }}
        >
          <FiColumns />
        </button>
        <button
          title="Delete note"
          className="trash-icon"
          disabled={!notesInActiveFolder}
          onClick={(e) => {
            e.currentTarget.blur()
            if (window.confirm("Are you sure you want to delete this note?")) {
              setNoteToDelete(selectedNote.id);
            }
          }}
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
          disabled={!notesInActiveFolder}>
            B
        </button>
        <button 
          className="ql-italic" 
          disabled={!notesInActiveFolder}>
            I
        </button>
        <button 
          className="ql-underline" 
          disabled={!notesInActiveFolder}>
            U
        </button>
        <button 
          className="ql-list" 
          value="ordered" 
          disabled={!notesInActiveFolder}>
          <GoListOrdered />
        </button>
        <button 
          className="ql-list" 
          value="bullet" 
          disabled={!notesInActiveFolder}>
          <GoListUnordered />
        </button>
      </div>
      <input 
        name="search"
        type="search"
        placeholder="Search"
        disabled={!notesInActiveFolder}
      />
    </>
  )
});

const mapStateToProps = (state) => ({
  selectedFolderId: state.selectedFolderId,
  createButtonDisabled: state.createButtonDisabled,
  selectedNote: state.selectedNote,
  notesInActiveFolder: state.notesInActiveFolder,
});

const mapDispatchToProps = {
  createNote: actions.createNote,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  setSelectedNote: actions.setSelectedNote,
  setNoteToDelete: actions.setNoteToDelete,
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps, 
  null, 
  { forwardRef: true }
)(Toolbar);
