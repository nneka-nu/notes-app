import { 
  ADD_FOLDER, 
  RENAME_FOLDER, 
  DELETE_FOLDER,
  addFolder,
  renameFolder,
  deleteFolder,
} from './folders';
import {
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  addNote,
  updateNote,
  deleteNote,
} from './notes';
import { SET_SELECTED_FOLDER_ID, setSelectedFolderId } from './selectedFolderId';
import { SET_SELECTED_NOTE, setSelectedNote } from './selectedNote';

export const types = { 
  ADD_FOLDER, 
  RENAME_FOLDER, 
  DELETE_FOLDER,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  SET_SELECTED_FOLDER_ID,
  SET_SELECTED_NOTE,
}

export const actions = { 
  addFolder, 
  renameFolder, 
  deleteFolder,
  addNote,
  updateNote,
  deleteNote,
  setSelectedFolderId,
  setSelectedNote,
}
