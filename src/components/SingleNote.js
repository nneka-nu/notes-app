import React, { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import { connect } from 'react-redux';
import moment from 'moment';
import { actions } from '../actions';
import { isNoteEmpty } from '../utils';
import { getNotesByFolder, getNotesBySearch } from '../selectors';

const SingleNote = ({ 
  note, 
  firstNote, 
  searchTerm,
  setSelectedNoteId,
  createButtonDisabled, 
  updateNote, 
  deleteNote,
  setCreateButtonDisabled, 
  moveActiveNoteToTop, 
  toolbarRef }) => {
  console.log('SingleNote render', note);
  const dateTimeRef = useRef();
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const prevNoteIdRef = useRef();
  const prevCreateButtonDisabled = useRef();
  const searchTermRef = useRef();
  const [showDateTime, setShowDateTime] = useState(false);

  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);

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
      if (firstNote && note.id !== firstNote.id && !searchTermRef.current) {
        moveActiveNoteToTop(note.id);
      }

      const contents = quillInstance.current.getContents();
      const text = quillInstance.current.getText();
      const emptyNote = isNoteEmpty(text);

      if (emptyNote && !prevCreateButtonDisabled.current && !searchTermRef.current) {
        setCreateButtonDisabled(true);
      }

      if (emptyNote && searchTermRef.current) {
        deleteNote(note.id);
        setSelectedNoteId(firstNote.id);
        return;
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
  }, [note, firstNote, updateNote, deleteNote, setCreateButtonDisabled, moveActiveNoteToTop, setSelectedNoteId]);

  return (
    <section className="single-note">
      {showDateTime && <div className="datetime">{dateTimeRef.current}</div>}
      <div 
        className="editor" 
        ref={editorRef} 
      >
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { selectedNoteId, createButtonDisabled, search } = state;
  const searchTerm = search.term.trim();
  let notes = searchTerm ? getNotesBySearch(state) : getNotesByFolder(state);
  let note = {};
  const noteIndex = notes.findIndex(val => val.id === selectedNoteId);
  note = noteIndex > -1 ? notes[noteIndex] : '';

  return {
    note,
    firstNote: notes[0],
    createButtonDisabled,
    searchTerm,
  }
};

const mapDispatchToProps = {
  updateNote: actions.updateNote,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  moveActiveNoteToTop: actions.moveActiveNoteToTop,
  setSelectedNoteId: actions.setSelectedNoteId,
  deleteNote: actions.deleteNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleNote);
