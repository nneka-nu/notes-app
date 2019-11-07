import uuidv1 from 'uuid/v1';

/* Action Types */
export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

/* Action Creator */
export const addNote = (note, folderId, lastUpdated) => ({
  type: ADD_NOTE,
  id: uuidv1(),
  note,
  folderId,
  lastUpdated
});

export const updateNote = (id, note, lastUpdated) => ({
  type: UPDATE_NOTE,
  id,
  note,
  lastUpdated
});

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  id
});
