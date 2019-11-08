import { createSelector } from 'reselect';

const notesSelector = state => state.notes;
const selectedFolderIdSelector = state => state.selectedFolderId;
export const getNotesByFolder = createSelector(
  [notesSelector, selectedFolderIdSelector],
  (notes, selectedFolderId) => {
    return notes.filter(note => note.folderId === selectedFolderId);
  }
)