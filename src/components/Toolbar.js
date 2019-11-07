import React, { forwardRef } from 'react';
import { GoListUnordered, GoListOrdered, GoTrashcan } from 'react-icons/go';
import { FiColumns } from 'react-icons/fi';

const Toolbar = forwardRef((props, ref) => {
  console.log('Toolbar render')

  return (
    <>
      <div id="quill-toolbar" ref={ref}>
        <button
          className="columns-icon"
          title="Show/hide folders"
          onClick={(e) => {
            e.currentTarget.blur();
            props.onToggleFolder();
          }}
        >
          <FiColumns />
        </button>
        <button
          title="Delete note"
          className="trash-icon"
          onClick={(e) => {
            e.currentTarget.blur()
            prompt("Are you sure you want to delete this note?")}}
        >
          <GoTrashcan />
        </button>
        <button className="ql-bold">B</button>
        <button className="ql-italic">I</button>
        <button className="ql-underline">U</button>
        <button className="ql-list" value="ordered">
          <GoListOrdered />
        </button>
        <button className="ql-list" value="bullet">
          <GoListUnordered />
        </button>
      </div>
      <input 
        name="search"
        type="search"
        placeholder="Search"
      />
    </>
  )
});

export default Toolbar;
