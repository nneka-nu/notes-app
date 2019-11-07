import React, { useRef, useEffect } from 'react';
import Quill from 'quill';

const SingleNote = ({ toolbarRef }) => {
  console.log('SingleNote render');

  // const [note, setNote] = useState(defaultNote)
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
      quillInstance.current = new Quill(editorRef.current, {
        modules: {
          toolbar: toolbarRef
        },
        placeholder: 'Enter notes...',
      });
      quillInstance.current.focus()
      // quillInstance.current.setContents(note);
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
      })
  }, [toolbarRef])
  
  return (
    <section className="single-note">
      <div className="datetime">November 4, 2019 at 6:50 PM</div>
      <div className="editor" ref={editorRef}></div>
    </section>
  )
};

export default SingleNote;
