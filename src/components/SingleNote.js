import React, { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import { connect } from 'react-redux';
import moment from 'moment';
import { actions } from '../actions';
import { isNoteEmpty } from '../utils';
import { getNotesByFolder } from '../selectors';

const SingleNote = ({ 
  note, 
  firstNote, 
  createButtonDisabled, 
  userBeganTyping, 
  updateNote, 
  setCreateButtonDisabled, 
  moveActiveNoteToTop, 
  setUserBeganTyping,
  setLastComponentHasMounted,
  toolbarRef }) => {
  console.log('SingleNote render', note);
  const dateTimeRef = useRef();
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const prevNoteIdRef = useRef();
  const prevUserBeganTyping = useRef();
  const prevCreateButtonDisabled = useRef();
  const [showDateTime, setShowDateTime] = useState(false);

  useEffect(() => {
    prevUserBeganTyping.current = userBeganTyping;
  }, [userBeganTyping]);

  useEffect(() => {
    prevCreateButtonDisabled.current = createButtonDisabled;
  }, [createButtonDisabled]);

  useEffect(() => {
    if (!note) {
      return;
    }

    dateTimeRef.current = moment(note.lastUpdated).format('MMMM D, YYYY [at] h:mm A');
  }, [note]);

  useEffect(() => {
    quillInstance.current = new Quill(editorRef.current, {
      modules: {
        toolbar: toolbarRef
      },
    });
    // allow plain text pasting only
    quillInstance.current.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      let ops = [];
      delta.ops.forEach(op => {
        if (op.insert && typeof op.insert === 'string') {
          ops.push({
            insert: op.insert
          })
        }
      });
      delta.ops = ops;
      return delta;
    });
  }, [toolbarRef]);

  useEffect(() => {
    if (!note) {
      prevNoteIdRef.current = '';
      quillInstance.current.setText('');
      quillInstance.current.enable(false);
      setShowDateTime(false);
      return;
    }

    quillInstance.current.enable(true);
    setShowDateTime(true);

    if (prevNoteIdRef.current && prevNoteIdRef.current === note.id) {
      return;
    }
    
    prevNoteIdRef.current = note.id;

    if (note.noteAsDelta) {
      try {
        quillInstance.current.setContents(note.noteAsDelta);
      } catch (e) {
        // console.error(e);
      }
    } 
  }, [note]);

  useEffect(() => {
    if (!note) {
      return;
    }

    if (!note.noteAsText) {
      quillInstance.current.focus();
    }
  }, [note]);

  useEffect(() => {
    if (!note) {
      return;
    }

    const handler = () => {
      // user selected another note and started typing.
      if (firstNote && note.id !== firstNote.id) {
        moveActiveNoteToTop(note.id);
      }

      const contents = quillInstance.current.getContents();
      const text = quillInstance.current.getText();
      const emptyNote = isNoteEmpty(text);

      if (emptyNote && !prevCreateButtonDisabled.current) {
        setCreateButtonDisabled(true);
      }

      if (!emptyNote) {
        if (prevCreateButtonDisabled.current) {
          setCreateButtonDisabled(false);
        } 
      }

      const currentTime = moment().format('h:mm A');
      const previousTime = dateTimeRef.current.split('at')[1].trim();
      const nowMoment = moment();
      if (currentTime !== previousTime) {
        dateTimeRef.current = nowMoment.format('MMMM D, YYYY [at] h:mm A');
      }

      updateNote(note.id, contents, text, nowMoment.format());
    }
    quillInstance.current.on('text-change', handler);

    return () => {
      quillInstance.current.off('text-change', handler);
    }
  }, [note, firstNote, updateNote, setCreateButtonDisabled, moveActiveNoteToTop]);

  useEffect(() => {
    setLastComponentHasMounted(true);
  }, [setLastComponentHasMounted]);

  const handleNoteClick = () => {
    if (!prevUserBeganTyping.current) {
      setUserBeganTyping(true)
    }
  }

  return (
    <section className="single-note">
      {showDateTime && <div className="datetime">{dateTimeRef.current}</div>}
      <div 
        className="editor" 
        ref={editorRef} 
        onClick={handleNoteClick}>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { selectedNoteId, createButtonDisabled, userBeganTyping } = state;
  const notes = getNotesByFolder(state);
  const note = notes[notes.findIndex(val => val.id === selectedNoteId)];
  return {
    note,
    firstNote: notes[0],
    createButtonDisabled,
    userBeganTyping,
  }
};

const mapDispatchToProps = {
  updateNote: actions.updateNote,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  moveActiveNoteToTop: actions.moveActiveNoteToTop,
  setUserBeganTyping: actions.setUserBeganTyping,
  setLastComponentHasMounted: actions.setLastComponentHasMounted,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleNote);
