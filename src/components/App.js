import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'quill/dist/quill.bubble.css';
import '../css/App.css';
import Toolbar from './Toolbar';
import FoldersList from './FoldersList';
import NotesList from './NotesList';
import SingleNote from './SingleNote';
import SingleNotePlaceholder from './SingleNotePlaceholder';

const App = ({ notesAvailable }) => {
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
        <NotesList toggleFolder={toggleFolder} />
        {toolbarRefHasValue && 
          notesAvailable &&
          <SingleNote 
            toolbarRef={toolbarRef.current}
          />
        }
        {toolbarRefHasValue && 
          !notesAvailable && 
          <SingleNotePlaceholder 
            toolbarRef={toolbarRef.current} />}
      </section>
    </main>
  );
};

const mapStateToProps = (state) => ({
  notesAvailable: state.notes.length > 0,
});

export default connect(mapStateToProps, null)(App);
