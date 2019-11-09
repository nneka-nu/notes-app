import { types } from '../actions';

/* [{id, note, folderId, lastUpdated}] */
const notes = (state = [], action) => {
  switch(action.type) {
    case types.CREATE_NOTE:
      return [
        action.note,
        ...state,
      ];
    case types.UPDATE_NOTE:
      return state.map(note => {
        if (note.id === action.id) {
          return {
            ...note, 
            ...{
              noteAsDelta: action.noteAsDelta,
              noteAsText: action.noteAsText,
              lastUpdated: action.lastUpdated
            }
          }
        }
        return note;
      })
    case types.DELETE_NOTE:
      return state.filter(note => note.id !== action.id);
    default:
      return state;
  }
}

export default notes;
