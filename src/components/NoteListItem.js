import React from 'react';
import moment from 'moment';
import { isNoteEmpty } from '../utils';

// isolated so list item is highlighted by Profiler on render
const ListItem = ({ title, subtitle, dateOrTime, isSelected, userBeganTyping, onClick }) => {
  let className = isSelected ? 'selected' : '';
  if (isSelected && userBeganTyping) {
    className = 'default';
  }

  return (
    <li 
      className={className}
      onClick={() => onClick()}
    >
      <div className="title">{title}</div>
      <div className="subtitle">
        <span className="last-updated">{dateOrTime}</span> 
        <span className="text">{subtitle}</span>
      </div>
    </li>
  );
};

const NoteListItem = ({ note, isSelected, userBeganTyping, onClick }) => {
  console.log('NoteListItem render', note.id)
  let dateOrTime = '';
  let emptyNote = isNoteEmpty(note.noteAsText);
  let firstLine = '';
  let secondLine = '';
  if (!emptyNote) {
    let noteArray = note.noteAsText.split(/[\n\t\r]/g);
    let filtered = noteArray.filter(item => item.trim().length > 0);
    
    if (filtered.length >= 2) {
      [firstLine, secondLine] = filtered;
    } else {
      firstLine = filtered[0];
    }
  }

  let title = emptyNote ?  'New note' : firstLine;
  let subtitle = !emptyNote && secondLine ? secondLine : 'No additional text';
  let nowMoment = moment();
  let lastUpdatedMoment = moment(note.lastUpdated);
  let differenceInDays = nowMoment.diff(lastUpdatedMoment, 'days');

  if (differenceInDays !== 0 && differenceInDays <= 6) { // show day
    dateOrTime = lastUpdatedMoment.format('dddd');
  } else if (differenceInDays === 0) { // show time.
    dateOrTime = lastUpdatedMoment.format('h:mm A');
  } else { // show date
    dateOrTime = lastUpdatedMoment.format('MM/D/YY');
  }

  return (
    <ListItem 
      title={title} 
      subtitle={subtitle} 
      dateOrTime={dateOrTime} 
      isSelected={isSelected}
      userBeganTyping={userBeganTyping}
      onClick={() => onClick(note)}
    />
  );
};

export default React.memo(NoteListItem);
