import { 
  ADD_FOLDER, 
  RENAME_FOLDER, 
  DELETE_FOLDER,
  addFolder,
  renameFolder,
  deleteFolder,
} from './folders';
import {
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  createNote,
  updateNote,
  deleteNote,
} from './notes';
import { SET_SELECTED_FOLDER_ID, setSelectedFolderId } from './selectedFolderId';
import { SET_SELECTED_NOTE, setSelectedNote } from './selectedNote';
import { SET_CREATE_BUTTON_DISABLED, setCreateButtonDisabled } from './createButtonDisabled';

export const types = { 
  ADD_FOLDER, 
  RENAME_FOLDER, 
  DELETE_FOLDER,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  SET_SELECTED_FOLDER_ID,
  SET_SELECTED_NOTE,
  SET_CREATE_BUTTON_DISABLED,
}

export const actions = { 
  addFolder, 
  renameFolder, 
  deleteFolder,
  createNote,
  updateNote,
  deleteNote,
  setSelectedFolderId,
  setSelectedNote,
  setCreateButtonDisabled,
}
