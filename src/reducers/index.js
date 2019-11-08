import { combineReducers } from 'redux';
import folders from './folders';
import notes from './notes';
import selectedFolderId from './selectedFolderId';
import selectedNote from './selectedNote'; 

export default combineReducers({
  folders,
  notes,
  selectedFolderId,
  selectedNote,
})
