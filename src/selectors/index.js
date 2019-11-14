import { createSelector } from 'reselect';

const notesSelector = state => state.notes;
const selectedFolderIdSelector = state => state.selectedFolderId;
export const getNotesByFolder = createSelector(
  [notesSelector, selectedFolderIdSelector],
  (notes, selectedFolderId) => {
    return notes.filter(note => note.folderId === selectedFolderId);
  }
);

const searchSelector = state => state.search;
export const getNotesBySearch = createSelector(
  [notesSelector, searchSelector],
  (notes, search) => {
    return notes.filter(note => {
      return note.noteAsText.toLowerCase().includes(search.term.toLowerCase());
    });
  }
);
