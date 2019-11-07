import uuidv1 from 'uuid/v1';

/* Action Types */
export const ADD_FOLDER = 'ADD_FOLDER';
export const RENAME_FOLDER = 'RENAME_FOLDER'; // ON DOUBLE CLICK
export const DELETE_FOLDER = 'DELETE_FOLDER';


/* Action Creators */
export const addFolder = (name) => ({
  type: ADD_FOLDER,
  id: uuidv1(),
  name
});

export const renameFolder = (id, name) => ({
  type: RENAME_FOLDER,
  id,
  name
});

export const deleteFolder = (id) => ({
  type: DELETE_FOLDER,
  id
});
