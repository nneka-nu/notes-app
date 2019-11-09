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
    setCreateButtonDisabled,
    setSelectedNote,
    onToggleFolder,
    createNote } = props;

  const handleCreateNote = (e) => {
    e.currentTarget.blur()
    let newNote = {
      id: uuidv1(), 
      note: '', 
      folderId: selectedFolderId, 
      lastUpdated: moment().format()
    }
    setCreateButtonDisabled(true);
    createNote(newNote);
    setSelectedNote({
      id: newNote.id,
      note: '',
      index: 0,
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
          onClick={(e) => {
            e.currentTarget.blur()
            prompt("Are you sure you want to delete this note?")}}
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
        <button className="ql-bold">B</button>
        <button className="ql-italic">I</button>
        <button className="ql-underline">U</button>
        <button className="ql-list" value="ordered">
          <GoListOrdered />
        </button>
        <button className="ql-list" value="bullet">
          <GoListUnordered />
        </button>
      </div>
      <input 
        name="search"
        type="search"
        placeholder="Search"
      />
    </>
  )
});

const mapStateToProps = (state) => ({
  selectedFolderId: state.selectedFolderId,
  createButtonDisabled: state.createButtonDisabled,
});

const mapDispatchToProps = {
  createNote: actions.createNote,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  setSelectedNote: actions.setSelectedNote,
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps, 
  null, 
  { forwardRef: true }
)(Toolbar);
