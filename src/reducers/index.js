import { combineReducers } from 'redux';
import folders from './folders';
import notes from './notes';

export default combineReducers({
  folders,
  notes,
})
