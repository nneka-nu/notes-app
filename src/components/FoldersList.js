import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { actions } from '../actions';
import { isNoteEmpty, isInputValid } from '../utils';
import { getNotesByFolder } from '../selectors';
import FolderListItem from './FolderListItem';

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
  setSearchInfo }) => {
  console.log('FoldersList render', selectedFolderId);
  const foldersListElem = useRef();
  const notesRef = useRef();
  const foldersRef = useRef();
  const firstNoteByFolderRef = useRef();
  const selectedNoteIdRef = useRef();
  const selectedFolderIdRef = useRef();
  const searchRef = useRef();

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
    let name = prompt("Enter folder name");
    if (name === null) { // user hit cancel
      return;
    }

    name = name ? name.trim() : '';
    if (!name || !isInputValid(name)) {
      alert('Invalid input. Only letters, numbers, spaces, underscores, and dashes are allowed.')
      return;
    }

    const allFolderNames = folders.map(folder => folder.name.toLowerCase());
    if (!allFolderNames.includes(name.toLowerCase())) {
      if (firstNoteByFolderRef.current && isNoteEmpty(firstNoteByFolderRef.current.noteAsText)) {
        deleteNote(selectedNoteIdRef.current);
      }

      const id = uuidv1();
      addFolder(id, name);
      setSelectedFolderId(id);
      setSelectedNoteId('');
      setCreateButtonDisabled(false);
      foldersListElem.current.scrollTop = foldersListElem.current.offsetHeight;
    } else {
      alert('That folder name already exists.');
    }
  };

  const handleDeleteFolder = useCallback((id) => {
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
  }, [deleteFolder, deleteNote, setSelectedFolderId, setSelectedNoteId, setCreateButtonDisabled, setSearchInfo]);

  return (
    <section className={'folders ' + (toggleFolder ? '' : 'hidden')}>
      <div className="folders-header">Folders</div>
      <div ref={foldersListElem} className="folders-list">
        <ul>
          {folders.map((folder) => (
            <FolderListItem 
              key={folder.id}
              folder={folder} 
              selected={selectedFolderId === folder.id}
              onClick={handleFolderClick}
              onDeleteFolder={handleDeleteFolder}
            />
          ))}
        </ul>
      </div>
      <div className="folders-footer">
        <div className="new">
          <button 
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
    </section>
  )
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
}

export default connect(mapStateToProps, mapDispatchToProps)(FoldersList);
