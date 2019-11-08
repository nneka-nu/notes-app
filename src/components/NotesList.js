import React from 'react';
import { connect } from'react-redux';
import moment from 'moment';
import { actions } from '../actions';
import { getNotesByFolder } from '../selectors';

const NotesList = ({ notes, setSelectedNote, toggleFolder }) => {
  console.log('NotesList render')
  
  const handleItemClick = (note) => {
    setSelectedNote(note);
  }
  return (
    <section className={'notes-list ' + (toggleFolder ? '' : 'folders-hidden')}>
      <ul>
      {notes.map(note => {
        let dateOrTime = '';
        let title = note.note ? 'note has value' : 'New note'
        let subtitle = note.note ? 'note has subtitle': 'No additional text'
        let nowMoment = moment();
        let lastUpdatedMoment = moment(note.lastUpdated);
        let differenceInDays = nowMoment.diff(lastUpdatedMoment, 'days');

        if (differenceInDays !== 0 && differenceInDays <= 6) { // show day
          dateOrTime = lastUpdatedMoment.format('dddd')
        } else if (differenceInDays === 0) { // show time.
          dateOrTime = lastUpdatedMoment.format('h:mm A');
        } else { // show date
          dateOrTime = lastUpdatedMoment.format('MM/D/YY');
        }
        return (
          <li key={note.id} id={note.id} onClick={() => handleItemClick(note)}>
            <div className="title">{title}</div>
            <div className="subtitle">
              <span className="last-updated">{dateOrTime}</span> 
              <span className="text">{subtitle}</span>
            </div>
          </li>
        )
      })}
      </ul>
    </section>
  )
};

const mapStateToProps = (state) => ({
    notes: getNotesByFolder(state),
});

const mapDispatchToProps = {
  setSelectedNote: actions.setSelectedNote
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
