import { createSelector } from 'reselect';
import moment from 'moment';

const notesSelector = state => state.notes;
const selectedFolderIdSelector = state => state.selectedFolderId;
export const getNotesByFolder = createSelector(
  [notesSelector, selectedFolderIdSelector],
  (notes, selectedFolderId) => {
    return notes.filter(note => note.folderId === selectedFolderId)
                .sort((a, b) => moment(b.lastUpdated).diff(moment(a.lastUpdated)));
  }
);

const searchSelector = state => state.search;
export const getNotesBySearch = createSelector(
  [notesSelector, searchSelector],
  (notes, search) => {
    return notes.filter(note => 
      note.noteAsText.toLowerCase().includes(search.term.toLowerCase())
    )
  }
);
