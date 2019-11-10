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
import { SET_SELECTED_NOTE_ID, setSelectedNoteId } from './selectedNoteId';
import { SET_CREATE_BUTTON_DISABLED, setCreateButtonDisabled } from './createButtonDisabled';
import { SET_NOTE_TO_DELETE, setNoteToDelete } from './noteToDelete';
import { SET_NOTES_IN_ACTIVE_FOLDER, setNotesInActiveFolder} from './notesInActiveFolder';
import { SET_USER_BEGAN_TYPING, setUserBeganTyping } from './userBeganTyping';

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
  SET_SELECTED_NOTE_ID,
  SET_CREATE_BUTTON_DISABLED,
  SET_NOTES_IN_ACTIVE_FOLDER,
  SET_USER_BEGAN_TYPING,
};

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
  setSelectedNoteId,
  setCreateButtonDisabled,
  setNotesInActiveFolder,
  setUserBeganTyping
};
