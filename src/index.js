import React from 'react';
import ReactDOM from 'react-dom';
import uuidv1 from 'uuid/v1';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import moment from 'moment';
import reducers from './reducers';
import { getSavedState, setSavedState } from './localStorage';
import throttle from 'lodash.throttle';

const folderId = uuidv1();
const noteId = uuidv1();
const lastUpdated = moment().format();
const notes = [
  {
    id: noteId, 
    noteAsDelta: {
      "ops": [{"insert":"\n"}]
    },
    noteAsText: '',
    folderId, 
    lastUpdated
  },
];
const initialState = {
  folders: [{id: folderId, name: 'Notes'}],
  notes,
  selectedFolderId: folderId,
  selectedNoteId: noteId,
  createButtonDisabled: true
};
const savedState = getSavedState();
const store = createStore(
  reducers, 
  savedState || initialState, 
  composeWithDevTools()
);

store.subscribe(throttle(() => {
  let state = {
    ...store.getState(),
    search: {
      term: '',
      progress: '',
    }
  }
  setSavedState(state);
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
