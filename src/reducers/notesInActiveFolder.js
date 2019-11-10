import { types } from '../actions';

const notesInActiveFolder = (state = false, action) => {
  if (action.type === types.SET_NOTES_IN_ACTIVE_FOLDER) {
    return action.value;
  }
  return state;
};

export default notesInActiveFolder;