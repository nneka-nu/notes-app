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

const folderId = uuidv1();
const noteId = uuidv1();
const note1Date = moment().format();
const notes = [
  {
    id: noteId, 
    noteAsDelta: {
      "ops": [{"insert":"\n"}]
    },
    noteAsText: '',
    folderId, 
    lastUpdated: note1Date
  },
];

const initialState = {
  folders: [{id: folderId, name: 'Notes'}],
  notes,
  selectedFolderId: folderId,
  selectedNote: {id: noteId, index: 0, className: 'default'},
  createButtonDisabled: true
};

let store = createStore(reducers, initialState, composeWithDevTools());

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
