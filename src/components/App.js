import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.bubble.css';
import '../css/App.css';
import Toolbar from './Toolbar';
import FoldersList from './FoldersList';
import NotesList from './NotesList';
import SingleNote from './SingleNote';

const App = () => {
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
    <main data-testid="app-wrapper">
      <header className="toolbar">
        <Toolbar 
          ref={toolbarRef}
          onToggleFolder={handleToggleFolder}
        />
      </header>
      <section className="content">
        <FoldersList toggleFolder={toggleFolder} />
        <NotesList toggleFolder={toggleFolder} />
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
