import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import { connect } from 'react-redux';
import moment from 'moment';
import { actions } from '../actions';

const SingleNote = ({ note, updateNote, toolbarRef }) => {
  console.log('SingleNote render', note.note);

  const editorRef = useRef(null);
  const quillInstance = useRef(null);

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
        let ops = []
        delta.ops.forEach(op => {
          if (op.insert && typeof op.insert === 'string') {
            ops.push({
              insert: op.insert
            })
          }
        })
        delta.ops = ops
        return delta
      });
  }, [toolbarRef]);

  useEffect(() => {
    if (note.note) {
      quillInstance.current.setContents(JSON.parse(note.note));
    } else {
      quillInstance.current.setText('\n');
    }

  });

  useEffect(() => {
    const handler = () => {
      let contents = JSON.stringify(quillInstance.current.getContents());
      updateNote(note.id, contents, moment().format())
    }
    quillInstance.current.on('text-change', handler);

    return () => {
      quillInstance.current.off('text-change', handler);
    }
  }, [note.id, updateNote]);
  
  return (
    <section className="single-note">
      <div className="datetime">{moment(note.lastUpdated).format('MMMM D, YYYY [at] h:mm A')}</div>
      <div className="editor" ref={editorRef}></div>
    </section>
  )
};

const mapStateToProps = (state) => ({
  note: state.selectedNote
})

const mapDispatchToProps = {
  updateNote: actions.updateNote
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleNote);
