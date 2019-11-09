// import uuidv1 from 'uuid/v1';

/* Action Types */
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

/* Action Creators */
export const createNote = (note) => ({
  type: CREATE_NOTE,
  note
});

export const updateNote = (id, noteAsDelta, noteAsText, lastUpdated) => ({
  type: UPDATE_NOTE,
  id,
  noteAsDelta,
  noteAsText,
  lastUpdated
});

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  id
});
