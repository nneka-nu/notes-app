import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const FoldersList = ({ toggleFolder }) => {
  return (
    <section className={'folders ' + (toggleFolder ? '' : 'active')}>
      <div className="folders-header">Folders</div>
      <div className="folders-list">
        Folders List...
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

export default FoldersList;
