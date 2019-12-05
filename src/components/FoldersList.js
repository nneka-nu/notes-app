import React, { useEffect, useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { actions } from '../actions';
import { isNoteEmpty, isInputValid } from '../utils';
import { getNotesByFolder } from '../selectors';
import FolderListItem from './FolderListItem';
import Modal from './Modal';

const FoldersList = ({ 
  folders, 
  notes,
  firstNoteByFolder, 
  selectedFolderId,
  selectedNoteId,
  search,
  toggleFolder, 
  setSelectedFolderId,
  setSelectedNoteId,
  setCreateButtonDisabled,
  deleteNote,
  addFolder, 
  deleteFolder,
  setSearchInfo,
  renameFolder }) => {
  const foldersListElem = useRef();
  const notesRef = useRef();
  const foldersRef = useRef();
  const firstNoteByFolderRef = useRef();
  const selectedNoteIdRef = useRef();
  const selectedFolderIdRef = useRef();
  const searchRef = useRef();
  const [showFolderDeleteModal, setShowFolderDeleteModal] = useState(false);
  const [showFolderCreateOrRenameModal, setShowFolderCreateOrRenameModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const folderToDelete = useRef({id: '', name: ''});
  const folderToRename = useRef({id: '', name: ''});
  const folderNameInputRef = useRef();
  const modalToShow = useRef();
  const FOLDER_CREATE = 'folder-create';
  const FOLDER_DELETE = 'folder-delete';
  const FOLDER_RENAME = 'folder-rename';

  useEffect(() => {
    if (folderNameInputRef.current) {
      folderNameInputRef.current.focus();
    }
  });
  
  useEffect(() => {
    notesRef.current = notes;
    foldersRef.current = folders;
    selectedNoteIdRef.current = selectedNoteId;
    selectedFolderIdRef.current = selectedFolderId;
    firstNoteByFolderRef.current = firstNoteByFolder;
    searchRef.current = search;
  }, [notes, selectedFolderId, firstNoteByFolder, selectedNoteId, folders, search]);

  useEffect(() => {
    if (foldersRef.current.length === 0) {
      return;
    }

    if (!firstNoteByFolder) {
      setCreateButtonDisabled(false);
      return;
    }

    if (isNoteEmpty(firstNoteByFolder.noteAsText)) {
      setCreateButtonDisabled(true);
    } else {
      setCreateButtonDisabled(false);
    }
  }, [firstNoteByFolder, setCreateButtonDisabled]);

  const handleFolderClick = useCallback((id) => {
    if (selectedFolderIdRef.current === id) {
      return;
    }

    if (!searchRef.current.term && firstNoteByFolderRef.current && isNoteEmpty(firstNoteByFolderRef.current.noteAsText)) {
      deleteNote(selectedNoteIdRef.current);
    }

    const firstNoteAtId = notesRef.current.filter(note => note.folderId === id)[0];
    
    if (firstNoteAtId) {
      setSelectedNoteId(firstNoteAtId.id);
    } else {
      setSelectedNoteId('');
    }
    setSelectedFolderId(id);
    setSearchInfo('', false);
  }, [deleteNote, setSelectedNoteId, setSelectedFolderId, setSearchInfo]);

  const handleNewFolderClick = () => {
    setSearchInfo('', false);
    modalToShow.current = FOLDER_CREATE;
    setShowFolderCreateOrRenameModal(true);
  };

  const handleNewFolderCreateOrRename = () => {
    let name = folderNameInputRef.current.value;
    name = name ? name.trim() : '';
    if (!name || !isInputValid(name)) {
      setErrorMessage(`Invalid input. Only letters, numbers, spaces, 
        underscores, and dashes are allowed.`);
      return;
    }
    
    name = name.split(' ').filter(item => item !== '').join(' '); // remove extra spaces between words

    const allFolderNames = folders.map(folder => folder.name.toLowerCase());
    if (!allFolderNames.includes(name.toLowerCase())) {
      handleCloseModal();

      if (modalToShow.current === FOLDER_RENAME) {
        renameFolder(folderToRename.current.id, name);
        return;
      }

      if (firstNoteByFolderRef.current && isNoteEmpty(firstNoteByFolderRef.current.noteAsText)) {
        deleteNote(selectedNoteIdRef.current);
      }

      const id = uuidv1();
      addFolder(id, name);
      setSelectedFolderId(id);
      setSelectedNoteId('');
      setCreateButtonDisabled(false);
      foldersListElem.current.scrollTop = foldersListElem.current.offsetHeight;
      return;
    }

    if (modalToShow.current === FOLDER_RENAME &&
      name.toLowerCase() === folderToRename.current.name.toLowerCase()) {
      handleCloseModal();
      return;
    }

    setErrorMessage('That folder already exists.');
  };

  const handleDeleteFolder = () => {
    handleCloseModal(FOLDER_DELETE);
    const { id } = folderToDelete.current;

    if (!id) { return; }

    setSearchInfo('', false);
    const allFolders = foldersRef.current;
    let folderIndex = allFolders.findIndex(folder => folder.id === id);
    if (folderIndex === -1) {
      return;
    }
    const notesAtFolderToDelete = notesRef.current.filter(note => note.folderId === id);
    if (selectedFolderIdRef.current === id) {
        const folder = (folderIndex === allFolders.length - 1) ? 
        allFolders[folderIndex - 1] : 
        allFolders[folderIndex + 1];

        if (!folder) {
          deleteFolder(id);
          notesAtFolderToDelete.forEach(note => {
            deleteNote(note.id);
          });
          setSelectedFolderId('');
          setSelectedNoteId('');
          setCreateButtonDisabled(true);
          return;
        }

        setSelectedFolderId(folder.id);
        const notesAtFolder = notesRef.current.filter(note => note.folderId === folder.id);
        const noteId = notesAtFolder.length > 0 ? notesAtFolder[0].id : '';
        setSelectedNoteId(noteId);    
    }
    deleteFolder(id);
    notesAtFolderToDelete.forEach(note => {
      deleteNote(note.id);
    });
  };

  const handleShowFolderDeleteModal = useCallback((id) => {
    setSearchInfo('', false);
    const folder = folders.filter(folder => folder.id === id);
    folderToDelete.current = {id, name: folder[0].name};
    setShowFolderDeleteModal(true);
    modalToShow.current = FOLDER_DELETE;
  }, [folders, setSearchInfo]);

  const handleShowFolderRenameModal = useCallback((id, name) => {
    setSearchInfo('', false);
    folderToRename.current = {id, name};
    if (folderNameInputRef.current) {
      folderNameInputRef.current.value = name;
    }
    modalToShow.current = FOLDER_RENAME;
    setShowFolderCreateOrRenameModal(true);
  }, [setSearchInfo]);

  const handleCloseModal = (type = 'folder-create-rename') => {
    setErrorMessage('');
    if (type === FOLDER_DELETE) {
      setShowFolderDeleteModal(false);  
    } else {
      setShowFolderCreateOrRenameModal(false);
      folderNameInputRef.current.value = '';
    }
  };

  return (
    <section data-testid="folders-container" className={'folders ' + (toggleFolder ? '' : 'hidden')}>
      <div className="folders-header">Folders</div>
      <div ref={foldersListElem} className="folders-list">
        <ul data-testid="folders-list">
          {folders.map((folder) => (
            <FolderListItem 
              key={folder.id}
              folder={folder} 
              selected={selectedFolderId === folder.id}
              onClick={handleFolderClick}
              onDeleteFolder={handleShowFolderDeleteModal}
              onRenameFolder={handleShowFolderRenameModal}
            />
          ))}
        </ul>
      </div>
      <div className="folders-footer">
        <div className="new">
          <button 
            data-testid="New folder"
            type="button"
            onClick={handleNewFolderClick}
          >
            <IconContext.Provider 
              value={{ color: "rgb(119, 119, 119)", size: "1.25em", className: "icon-plus" }}
            >
            <div><AiFillPlusCircle /></div>
            </IconContext.Provider>
            <span className="text">New Folder</span>
          </button>
        </div>
      </div>
      {modalToShow.current === FOLDER_DELETE && 
        <Modal
          title="Delete Folder"
          show={showFolderDeleteModal}
          onHide={() => handleCloseModal(FOLDER_DELETE)}>
          <div className="text">
            Are you sure you want to delete this folder 
            ({folderToDelete.current.name}) and its notes?
          </div>
          <div className="modal-buttons">
            <button 
              type="button" 
              className="negative"
              onClick={() => handleCloseModal(FOLDER_DELETE)}
            >
              No
            </button>
            <button
              title="Delete this folder"
              type="button"
              className="positive"
              onClick={handleDeleteFolder}
            >
              Yes
            </button>
          </div>
        </Modal>  
      }
      {(modalToShow.current === FOLDER_CREATE || modalToShow.current === FOLDER_RENAME) && 
        <Modal
          title={modalToShow.current === FOLDER_CREATE ? "Create New Folder" : "Rename Folder"}
          show={showFolderCreateOrRenameModal}
          onHide={handleCloseModal}>
          <form onSubmit={(e) => e.preventDefault()}>
            <input 
              ref={folderNameInputRef} 
              type="text"
              aria-label="Folder Name"
              defaultValue={modalToShow.current === FOLDER_CREATE ? '' : folderToRename.current.name}
            />
            <span className="error">{errorMessage}</span>
            <div className="modal-buttons">
              <button 
                type="button" 
                className="negative"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                title={modalToShow.current === FOLDER_CREATE ? 'Create new folder' : 'Rename this folder'}
                type="submit"
                className="positive"
                onClick={handleNewFolderCreateOrRename}
              >
                Save
              </button>
            </div>  
          </form>
        </Modal>
        }   
    </section>
  );
};

const mapStateToProps = (state) => {
  const notesByFolder = getNotesByFolder(state);

  return {
    folders: state.folders,
    selectedNoteId: state.selectedNoteId,
    selectedFolderId: state.selectedFolderId,
    notes: state.notes,
    firstNoteByFolder: notesByFolder[0],
    search: state.search,
  };
};

const mapDispatchToProps = {
  setSelectedFolderId: actions.setSelectedFolderId,
  setSelectedNoteId: actions.setSelectedNoteId,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  deleteNote: actions.deleteNote,
  addFolder: actions.addFolder,
  deleteFolder: actions.deleteFolder,
  setSearchInfo: actions.setSearchInfo,
  renameFolder: actions.renameFolder,
}

export default connect(mapStateToProps, mapDispatchToProps)(FoldersList);
