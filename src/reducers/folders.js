import { types } from '../actions';
// [{id, name}]
const folders = (state = [], action) => {
  switch(action.type) {
    case types.ADD_FOLDER:
      return [
        ...state, 
        {
          id: action.id,
          name: action.name
        }
      ];
    case types.RENAME_FOLDER:
      return state.map(folder => {
        if (folder.id === action.id) {
          return {
            ...folder,
            ...{
              name: action.name
            }
          }
        }
        return folder;
      })
    case types.DELETE_FOLDER: 
      return state.filter(folder => folder.id !== action.id);
    default:
      return state;
  }
}

export default folders;
