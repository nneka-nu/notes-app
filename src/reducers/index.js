import { combineReducers } from 'redux';
import folders from './folders';
import notes from './notes';
import selectedFolderId from './selectedFolderId';
import selectedNoteId from './selectedNoteId';
import createButtonDisabled from './createButtonDisabled';
import shouldDeleteNote from './shouldDeleteNote';
import lastComponentHasMounted from './lastComponentHasMounted';
import search from './search';

export default combineReducers({
  folders,
  notes,
  selectedFolderId,
  selectedNoteId,
  search,
  createButtonDisabled,
  shouldDeleteNote,
  lastComponentHasMounted,
});
