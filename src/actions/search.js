export const SET_SEARCH_INFO = 'SET_SEARCH_INFO';

export const setSearchInfo = (term, isSearchComplete) => ({
  type: SET_SEARCH_INFO,
  term,
  isSearchComplete,
});
