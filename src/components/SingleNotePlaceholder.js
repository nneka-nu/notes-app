import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import { actions } from '../actions';
import { connect } from 'react-redux';

const SingleNotePlaceholder = ( {toolbarRef, setCreateButtonDisabled} ) => {
  console.log('SingleNotePlaceholder render')
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    setCreateButtonDisabled(false);
  });

  useEffect(() => {
    quillInstance.current = new Quill(editorRef.current, {
      modules: {
        toolbar: toolbarRef
      },
      placeholder: '',
    });
    quillInstance.current.enable(false);
  }, [toolbarRef]);

  return (
    <section className="single-note">
      <div className="datetime"></div>
      <div className="editor" ref={editorRef}></div>
    </section>
  )
};

const mapDispatchToProps = {
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
};

export default connect(null, mapDispatchToProps)(SingleNotePlaceholder);