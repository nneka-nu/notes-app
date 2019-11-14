import React from 'react';
import moment from 'moment';
import { isNoteEmpty } from '../utils';
import NoteListItem from './NoteListItem';

const NoteListItemWrapper = ({ 
  note, 
  folderName,
  isSelected, 
  selectedFolderId,
  searchTerm,
  onClick }) => {
  let dateOrTime = '';
  const emptyNote = isNoteEmpty(note.noteAsText);
  let firstLine = '';
  let secondLine = '';
  let title = '';
  let subtitle = '';
  const noteArray = note.noteAsText.split(/[\n\t\r]/g);
  const filtered = noteArray.filter(item => item.trim().length > 0);

  if (!emptyNote && !searchTerm) {
    if (filtered.length >= 2) {
      [firstLine, secondLine] = filtered;
    } else {
      firstLine = filtered[0];
    }
  }

  let noteTitle = noteArray[0];
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    for (let i = 0; i < noteArray.length; i++) {
      let text = noteArray[i];
      if (!firstLine && text.toLowerCase().includes(term)) {
        firstLine = text;
        continue;
      }
      if (text.toLowerCase().includes(term)) {
        secondLine = text;
        break;
      }
    }
  }

  if (!searchTerm) {
    title = emptyNote ?  'New note' : firstLine;
    subtitle = !emptyNote && secondLine ? secondLine : 'No additional text';
  } else {
    title = secondLine ? firstLine : noteTitle;
    subtitle = secondLine ? secondLine : firstLine;
  }

  const nowMoment = moment();
  const lastUpdatedMoment = moment(note.lastUpdated);
  const differenceInDays = nowMoment.diff(lastUpdatedMoment, 'days');

  if (differenceInDays !== 0 && differenceInDays <= 6) { // show day
    dateOrTime = lastUpdatedMoment.format('dddd');
  } else if (differenceInDays === 0) { // show time.
    dateOrTime = lastUpdatedMoment.format('h:mm A');
  } else { // show date
    dateOrTime = lastUpdatedMoment.format('MM/D/YY');
  }

  return (
      <NoteListItem 
        noteId={note.id}
        title={title} 
        subtitle={subtitle} 
        dateOrTime={dateOrTime} 
        isSelected={isSelected}
        selectedFolderId={selectedFolderId}
        folderName={folderName}
        searchTerm={searchTerm}
        onClick={() => onClick(note)}
      />
  );
};

export default React.memo(NoteListItemWrapper);
