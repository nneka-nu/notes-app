import React, { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import { connect } from 'react-redux';
import moment from 'moment';
import { actions } from '../actions';
import { isNoteEmpty } from '../utils';

const SingleNote = ({ note, firstNote, updateNote, setCreateButtonDisabled, moveActiveNoteToTop, toolbarRef }) => {
  console.log('SingleNote render', note);
  const [dateTime, setDateTime] = useState('');
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const prevNoteIdRef = useRef();

  useEffect(() => {
      setDateTime(moment(note.lastUpdated).format('MMMM D, YYYY [at] h:mm A'))
  }, [note.lastUpdated]);

  useEffect(() => {
    quillInstance.current = new Quill(editorRef.current, {
      modules: {
        toolbar: toolbarRef
      },
      placeholder: 'Enter notes...',
    });
    quillInstance.current.focus();
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
    if (prevNoteIdRef.current === note.id) {
      return;
    }
    prevNoteIdRef.current = note.id;

    if (note.noteAsDelta) {
      try {
        quillInstance.current.setContents(note.noteAsDelta);
      } catch (e) {
        console.log(e);
      }
    } 
  }, [note.id, note.noteAsDelta]);

  useEffect(() => {
    if (note.noteAsText === '') {
      quillInstance.current.focus();
    }
  });

  useEffect(() => {
    const handler = () => {
      // user selected another note and started typing.
      // move this note to top of list.
      if (note.id !== firstNote.id) {
        moveActiveNoteToTop(note.id);
      }

      const contents = quillInstance.current.getContents();
      const text = quillInstance.current.getText();
      const emptyNote = isNoteEmpty(text);

      if (emptyNote) {
        setCreateButtonDisabled(true);
      } else {
        setCreateButtonDisabled(false);
      }

      const currentTime = moment().format('h:mm A');
      const previousTime = dateTime.split('at')[1].trim();
      const nowMoment = moment();
      if (currentTime !== previousTime) {
        setDateTime(nowMoment.format('MMMM D, YYYY [at] h:mm A'));
      }
      console.log('text-change', JSON.stringify(quillInstance.current.getText()), JSON.stringify(contents));
      updateNote(note.id, contents, text, nowMoment.format());
    }
    quillInstance.current.on('text-change', handler);

    return () => {
      quillInstance.current.off('text-change', handler);
    }
  }, [note.id, firstNote.id, updateNote, setCreateButtonDisabled, moveActiveNoteToTop, dateTime]);
  
  return (
    <section className="single-note">
      <div className="datetime">{dateTime}</div>
      <div className="editor" ref={editorRef}></div>
    </section>
  )
};

const mapStateToProps = (state) => {
  const { notes, selectedNote } = state;
  const note = notes[notes.findIndex(val => val.id === selectedNote.id)];
  return {
    note,
    firstNote: notes[0],
  }
};

const mapDispatchToProps = {
  updateNote: actions.updateNote,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
  moveActiveNoteToTop: actions.moveActiveNoteToTop,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleNote);
