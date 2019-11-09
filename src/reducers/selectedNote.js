import { types } from '../actions';

const selectedNote = (state = {}, action) => {
  if (action.type === types.SET_SELECTED_NOTE) {
    return action.note;
  }

  return state;
}

export default selectedNote;
