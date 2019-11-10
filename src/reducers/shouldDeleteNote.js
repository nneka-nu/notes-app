import { types } from '../actions';

const shouldDeleteNote = (state = false, action) => {
  if (action.type === types.SET_SHOULD_DELETE_NOTE) {
    return action.value;
  }
  return state;
};

export default shouldDeleteNote;
