import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.bubble.css';
import '../css/App.css';
import Toolbar from './Toolbar';
import FoldersList from './FoldersList';
import NotesList from './NotesList';
import SingleNote from './SingleNote';

const notesList = [
  {id: 1, title: 'WEB DEV TO...', folder: 'Notes', lastUpdated: '11:02 AM', note: 'Study Java...'},
  {id: 2, title: 'Note this', folder: 'Notes', lastUpdated: '11:02 AM', note: 'Practice redux'},
  {id: 3, title: 'Daily do', folder: 'Notes', lastUpdated: 'Thursday', note: 'WHAT to do...'}
];

const App = () => {
  console.log('App render');
  const [toggleFolder, setToggleFolder] = useState(true);
  const [toolbarRefHasValue, setToolbarRefHasValue] = useState(false);
  const toolbarRef = React.useRef();

  useEffect(() => {
    if (toolbarRef.current) {
      setToolbarRefHasValue(true);
    }
  }, []);

  const handleToggleFolder = () => {
    setToggleFolder(prevToggleFolder => !prevToggleFolder);
  };

  return (
    <main>
      <header className="toolbar">
        <Toolbar 
          ref={toolbarRef}
          onToggleFolder={handleToggleFolder}
        />
      </header>
      <section className="content">
        <FoldersList toggleFolder={toggleFolder} />
        <NotesList notes={notesList} toggleFolder={toggleFolder} />
        {toolbarRefHasValue && 
          <SingleNote 
            toolbarRef={toolbarRef.current}
          />
        }
      </section>
    </main>
  );
};

export default App;
