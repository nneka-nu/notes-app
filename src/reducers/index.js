import { combineReducers } from 'redux';
import folders from './folders';
import notes from './notes';
import selectedFolderId from './selectedFolderId';
import selectedNoteId from './selectedNoteId';
import createButtonDisabled from './createButtonDisabled';
import shouldDeleteNote from './shouldDeleteNote';
import userBeganTyping from './userBeganTyping';
import lastComponentHasMounted from './lastComponentHasMounted';

export default combineReducers({
  folders,
  notes,
  selectedFolderId,
  selectedNoteId,
  createButtonDisabled,
  shouldDeleteNote,
  userBeganTyping,
  lastComponentHasMounted,
})
