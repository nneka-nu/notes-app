import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';

it('sets the selected list item class name to "selected"', () => {
  const { getAllByTestId }  = renderWithRedux(
    <App />, 
    {
      folders: [{id: 1, name: 'Notes'}],
      notes: [
        {
          id: 1, 
          noteAsText: 'note 1',
          folderId: 1, 
        },
        {
          id: 2, 
          noteAsText: 'note 2',
          folderId: 1, 
        },
      ],
      selectedFolderId: 1,
      selectedNoteId: 1,
    }
  );
  const listItems = getAllByTestId('note-list-item');
  expect(listItems.length).toEqual(2);

  fireEvent.click(listItems[0]);
  expect(listItems[0].className).toEqual('selected');
  expect(listItems[1].className).toEqual('');

  fireEvent.click(listItems[1]);
  expect(listItems[0]).not.toHaveClass('selected');
  expect(listItems[1]).toHaveClass('selected');
});
