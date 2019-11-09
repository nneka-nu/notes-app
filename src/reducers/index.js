import { combineReducers } from 'redux';
import folders from './folders';
import notes from './notes';
import selectedFolderId from './selectedFolderId';
import selectedNote from './selectedNote';
import createButtonDisabled from './createButtonDisabled';

export default combineReducers({
  folders,
  notes,
  selectedFolderId,
  selectedNote,
  createButtonDisabled,
})
