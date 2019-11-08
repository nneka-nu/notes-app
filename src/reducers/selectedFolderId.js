import { types } from '../actions';

const selectedFolderId = (state = '', action) => {
  if (action.type === types.SET_SELECTED_FOLDER_ID) {
    return action.id;
  }

  return state;
}

export default selectedFolderId;
