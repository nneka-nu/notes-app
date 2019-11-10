import { combineReducers } from 'redux';
import folders from './folders';
import notes from './notes';
import selectedFolderId from './selectedFolderId';
import selectedNoteId from './selectedNoteId';
import createButtonDisabled from './createButtonDisabled';
import noteToDelete from './noteToDelete';
import notesInActiveFolder from './notesInActiveFolder'
import userBeganTyping from "./userBeganTyping";

export default combineReducers({
  folders,
  notes,
  selectedFolderId,
  selectedNoteId,
  createButtonDisabled,
  noteToDelete,
  notesInActiveFolder,
  userBeganTyping,
})
