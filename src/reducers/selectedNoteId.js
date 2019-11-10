import { types } from '../actions';

const selectedNoteId = (state = '', action) => {
  if (action.type === types.SET_SELECTED_NOTE_ID) {
    return action.note;
  }

  return state;
}

export default selectedNoteId;
