import React, { useEffect, useState, useRef } from 'react';
import { GoTrashcan } from 'react-icons/go';
import { FiEdit2 } from 'react-icons/fi';

const FolderListItem = ({ folder, selected, onClick, onDeleteFolder, onRenameFolder }) => {
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
    onRenameFolder(folder.id, folder.name);
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
            title="Rename folder"
            className="edit"
            onClick={handleEditFolder}
          >
            <FiEdit2 />
          </div>
          <div 
            title="Delete folder"
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

export default FolderListItem;
