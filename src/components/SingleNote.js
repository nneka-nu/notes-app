import React, { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import { connect } from 'react-redux';
import moment from 'moment';
import { actions } from '../actions';
import { editorIsBlank } from '../utils';

const SingleNote = ({ note, firstNote, updateNote, setCreateButtonDisabled, toolbarRef }) => {
  console.log('SingleNote render', note);
  const [dateTime, setDateTime] = useState('');
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const prevNoteIdRef = useRef();

  useEffect(() => {
    if (dateTime === '') {
      setDateTime(moment(note.lastUpdated).format('MMMM D, YYYY [at] h:mm A'))
    }
  }, [dateTime, note.lastUpdated]);

  useEffect(() => {
    Quill.debug('error');
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

    if (note.note) {
      quillInstance.current.setContents(JSON.parse(note.note));
    } else {
      quillInstance.current.setText('\n');
    }

  }, [note.id, note.note]);

  useEffect(() => {
    quillInstance.current.focus();
    
    const handler = () => {
      // use selected another note and started typing
      if (note.id !== firstNote.id) {
        // TODO dispatch(moveSelectedNoteToTop)
      }

      const contents = quillInstance.current.getContents();
      const emptyNote = editorIsBlank(contents.ops);

      if (emptyNote) {
        setCreateButtonDisabled(true);
      } else {
        setCreateButtonDisabled(false);
      }

      const currentTime = moment().format('h:mm A');
      const previousTime = dateTime.split('at')[1].trim();
      if (currentTime !== previousTime) {
        setDateTime(moment().format('MMMM D, YYYY [at] h:mm A'));
      }
      console.log('text-change', JSON.stringify(contents));
      updateNote(note.id, JSON.stringify(contents), moment().format());
    }
    quillInstance.current.on('text-change', handler);

    return () => {
      quillInstance.current.off('text-change', handler);
    }
  }, [note.id, firstNote.id, updateNote, setCreateButtonDisabled, dateTime]);
  
  return (
    <section className="single-note">
      <div className="datetime">{dateTime}</div>
      <div className="editor" ref={editorRef}></div>
    </section>
  )
};

const mapStateToProps = (state) => ({
  note: state.notes[state.selectedNote.index],
  firstNote: state.notes[0],
});

const mapDispatchToProps = {
  updateNote: actions.updateNote,
  setCreateButtonDisabled: actions.setCreateButtonDisabled,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleNote);
