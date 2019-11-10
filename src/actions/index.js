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
  MOVE_ACTIVE_NOTE_TO_TOP,
  createNote,
  updateNote,
  deleteNote,
  moveActiveNoteToTop,
} from './notes';
import { SET_SELECTED_FOLDER_ID, setSelectedFolderId } from './selectedFolderId';
import { SET_SELECTED_NOTE, setSelectedNote } from './selectedNote';
import { SET_CREATE_BUTTON_DISABLED, setCreateButtonDisabled } from './createButtonDisabled';
import { SET_NOTE_TO_DELETE, setNoteToDelete } from './noteToDelete';
import { SET_NOTES_IN_ACTIVE_FOLDER, setNotesInActiveFolder} from './notesInActiveFolder';

export const types = { 
  ADD_FOLDER, 
  RENAME_FOLDER, 
  DELETE_FOLDER,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  MOVE_ACTIVE_NOTE_TO_TOP,
  SET_NOTE_TO_DELETE,
  SET_SELECTED_FOLDER_ID,
  SET_SELECTED_NOTE,
  SET_CREATE_BUTTON_DISABLED,
  SET_NOTES_IN_ACTIVE_FOLDER,
}

export const actions = { 
  addFolder, 
  renameFolder, 
  deleteFolder,
  createNote,
  updateNote,
  deleteNote,
  moveActiveNoteToTop,
  setNoteToDelete,
  setSelectedFolderId,
  setSelectedNote,
  setCreateButtonDisabled,
  setNotesInActiveFolder,
}
