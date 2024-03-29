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
import { SET_SHOULD_DELETE_NOTE, setShouldDeleteNote } from './shouldDeleteNote';
import { SET_SEARCH_INFO, setSearchInfo } from './search';

export const types = { 
  ADD_FOLDER, 
  RENAME_FOLDER, 
  DELETE_FOLDER,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  MOVE_ACTIVE_NOTE_TO_TOP,
  SET_SHOULD_DELETE_NOTE,
  SET_SELECTED_FOLDER_ID,
  SET_SELECTED_NOTE_ID,
  SET_CREATE_BUTTON_DISABLED,
  SET_SEARCH_INFO,
};

export const actions = { 
  addFolder, 
  renameFolder, 
  deleteFolder,
  createNote,
  updateNote,
  deleteNote,
  moveActiveNoteToTop,
  setShouldDeleteNote,
  setSelectedFolderId,
  setSelectedNoteId,
  setCreateButtonDisabled,
  setSearchInfo,
};
