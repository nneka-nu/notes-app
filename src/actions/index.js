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

export const types = { 
  ADD_FOLDER, 
  RENAME_FOLDER, 
  DELETE_FOLDER,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
}

export const actions = { 
  addFolder, 
  renameFolder, 
  deleteFolder,
  addNote,
  updateNote,
  deleteNote,
}
