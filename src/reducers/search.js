import { types } from '../actions';

const initialState ={
  term: '',
  isSearchComplete: false,
}

const search = (state = initialState, action) => {
  if (action.type === types.SET_SEARCH_INFO) {
    return {
      term: action.term,
      isSearchComplete: action.isSearchComplete,
    }
  }
  return state;
};

export default search;
