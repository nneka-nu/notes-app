import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { actions } from '../actions';
import { isNoteEmpty } from '../utils';
import { getNotesByFolder } from '../selectors';

const ListItem = ({ folder, selected, onClick }) => {
  const [className, setClassname] = useState('')
  const buttonRef = useRef();
  const selectedRef = useRef();

  useEffect(() => {
    selectedRef.current = selected;
    if (selected) {
      setClassname('active');
      buttonRef.current.focus();
    } else {
      setClassname('');
    }

  }, [selected, setClassname]);

  const handleButtonBlur = (e) => {
    setClassname('blur')
  }

  const handleButtonClick = () => {
    setClassname('active')
    onClick(folder.id)
  }

  return (
    <li>
      <button 
        type="button"
        ref={buttonRef}
        className={`${className}`}
        onClick={handleButtonClick}
        onBlur={handleButtonBlur}
      >
        {folder.name}
      </button>
    </li>
  );
};

const FoldersList = ({ 
  folders, 
  notes,
  notesByFolder,
  firstNoteByFolder, 
  lastComponentHasMounted,
  selectedFolderId,
  selectedNoteId,
  toggleFolder, 
  setSelectedFolderId,
  setSelectedNoteId,
  setCreateButtonDisabled,
  deleteNote }) => {
  console.log('FoldersList render', selectedFolderId);
  const handleFolderClick = (id) => {
    if (firstNoteByFolder && isNoteEmpty(firstNoteByFolder.noteAsText)) {
      deleteNote(selectedNoteId)
    }

    const firstNoteAtId = notes.filter(note => note.folderId === id)[0];
    
    if (firstNoteAtId) {
      setSelectedNoteId(firstNoteAtId.id);
    } else {
      setSelectedNoteId('');
    }
    setSelectedFolderId(id);
  };

  useEffect(() => {
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

  return (
    <section className={'folders ' + (toggleFolder ? '' : 'hidden')}>
      <div className="folders-header">Folders</div>
      <div className="folders-list">
        <ul>
          {/* set up so editor does not take focus from list item button */}
          {lastComponentHasMounted && folders.map((folder) => (
            <ListItem 
              key={folder.id}
              folder={folder} 
              selected={selectedFolderId === folder.id}
              onClick={handleFolderClick}
            />
          ))}
        </ul>
      </div>
      <div className="folders-footer">
        <div className="new">
          <button type="button"><IconContext.Provider 
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
    notesByFolder,
    firstNoteByFolder: notesByFolder[0],
    lastComponentHasMounted: state.lastComponentHasMounted,
  };
};

const mapDispatchToProps = {
  setSelectedFolderId: actions.setSelectedFolderId,
  setSelectedNoteId: actions.setSelectedNoteId,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  deleteNote: actions.deleteNote,
}

export default connect(mapStateToProps, mapDispatchToProps)(FoldersList);
