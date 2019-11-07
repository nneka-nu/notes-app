import { types } from '../actions';

/* [{id, note, folderId, lastUpdated}] */
const notes = (state = [], action) => {
  switch(action.type) {
    case types.ADD_NOTE:
      return [
        ...state,
        {
          id: action.id,
          note: action.note,
          folderId: action.folderId,
          lastUpdated: action.lastUpdated,
        }
      ];
    case types.UPDATE_NOTE:
      return state.map(note => {
        if (note.id === action.id) {
          return {
            ...note, 
            ...{
              note: action.note,
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
