import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { GoTrashcan } from 'react-icons/go';
import { FiEdit2 } from 'react-icons/fi';
import { actions } from '../actions';
import { isInputValid } from '../utils';

const FolderListItem = ({ folder, selected, onClick, renameFolder, onDeleteFolder }) => {
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
    if (selected) {
      setClassname('blur');
    }
  }

  const handleButtonClick = () => {
    setClassname('active')
    onClick(folder.id)
  }

  const handleEditFolder = (e) => {
    e.stopPropagation();
    let name = prompt('Enter a new name.', folder.name);
    if (name === null) { // user canceled prompt.
      return; 
    }

    name = name.trim();
    if (!name || !isInputValid(name)) {
      alert('Invalid input. Only letters, numbers, spaces, underscores, and dashes are allowed.')
      return;
    }

    if (folder.name === name) {
      return;
    }

    renameFolder(folder.id, name);
  }

  const handleDeleteFolder = (e) => {
    e.stopPropagation();
    onDeleteFolder(folder.id)
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
        <div className="name">{folder.name}</div>
        <div className="editing">
          <div 
            className="edit"
            onClick={handleEditFolder}
          >
            <FiEdit2 />
          </div>
          <div 
            className="delete"
            onClick={handleDeleteFolder}
          >
            <GoTrashcan />
          </div>
        </div>
      </button>
    </li>
  );
};

const mapDispatchToProps = {
  renameFolder: actions.renameFolder,
}

export default connect(null, mapDispatchToProps)(FolderListItem);
