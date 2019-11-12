/* Action Types */
export const ADD_FOLDER = 'ADD_FOLDER';
export const RENAME_FOLDER = 'RENAME_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';


/* Action Creators */
export const addFolder = (id, name) => ({
  type: ADD_FOLDER,
  id,
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
