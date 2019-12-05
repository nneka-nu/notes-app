import React, { forwardRef, useState } from 'react';
import uuidv1 from 'uuid/v1';
import moment from 'moment';
import { GoListUnordered, GoListOrdered, GoTrashcan } from 'react-icons/go';
import { FiColumns, FiEdit } from 'react-icons/fi';
import { connect } from 'react-redux';
import { actions } from '../actions';
import { getNotesByFolder, getNotesBySearch } from '../selectors';
import { isNoteEmpty } from '../utils';
import Modal from './Modal';

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
  const [showModal, setShowModal] = useState(false);

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

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteNote = () => {
    handleCloseModal();
    setShouldDeleteNote(true);
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
          title="Show/hide folders"
          className="columns-icon"
          onClick={handleToggleFolder}
        >
          <FiColumns />
        </button>
        <button
          title="Delete note"
          className="trash-icon"
          disabled={!notesAvailable}
          onClick={handleShowModal}
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
          title="Bold"
          className="ql-bold" 
          disabled={!notesAvailable}>
            B
        </button>
        <button 
          title="Italic"
          className="ql-italic" 
          disabled={!notesAvailable}>
            I
        </button>
        <button 
          title="Underline"
          className="ql-underline" 
          disabled={!notesAvailable}>
            U
        </button>
        <button 
          title="Numbered list"
          className="ql-list" 
          value="ordered" 
          disabled={!notesAvailable}>
          <GoListOrdered />
        </button>
        <button 
          title="Bulleted list"
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
        aria-label="Search"
        value={search.term}
        onChange={handleSearch}
      />
      <Modal
        title="Delete Note"
        show={showModal}
        onHide={handleCloseModal}>
        <div className="text">Are you sure you want to delete this note?</div>
        <div className="modal-buttons">
          <button 
            type="button" 
            className="negative"
            onClick={handleCloseModal}
          >
            No
          </button>
          <button
            title="Delete selected note"
            type="button"
            className="positive"
            onClick={handleDeleteNote}
          >
            Yes
          </button>
        </div>
      </Modal>
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
