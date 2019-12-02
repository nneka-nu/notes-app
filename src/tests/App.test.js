import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import reducer from '../reducers';
import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(reducer);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, 
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
