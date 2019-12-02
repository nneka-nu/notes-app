import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import reducer from './reducers';

jest.mock('quill', () => jest.fn(() => {
  return {
    clipboard: {
      addMatcher: () => jest.fn(),
    },
    setText: () => jest.fn(),
    enable: () => jest.fn(),
    focus: () => jest.fn(),
    on: () => jest.fn(),
    off: () => jest.fn(),
  };
}));

const renderWithRedux = (ui, initialState) => {
  const store = createStore(reducer, initialState);
  return render(<Provider store={store}>{ui}</Provider>);
};

global.renderWithRedux = renderWithRedux;
