import { types } from '../actions';

const noteToDelete = (state = '', action) => {
  if (action.type === types.SET_NOTE_TO_DELETE) {
    return action.id;
  }
  return state;
};

export default noteToDelete;