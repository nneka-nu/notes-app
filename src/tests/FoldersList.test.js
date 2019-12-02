import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';

it('shows the notes of the selected folder only', () => {
  const { getByTestId, getByText }  = renderWithRedux(
    <App />, 
    {
      folders: [{id: 1, name: 'Notes'}, {id: 2, name: 'Work'}],
      notes: [
        {
          id: 1, 
          noteAsText: 'note 1',
          folderId: 1, 
        },
        {
          id: 2, 
          noteAsText: 'work 1',
          folderId: 2, 
        },
      ],  
    }
  );
  let folderElem = getByText('Notes');
  fireEvent.click(folderElem);
  const notesListElem = getByTestId('list-of-notes');
  expect(notesListElem).toHaveTextContent('note 1');
  expect(notesListElem).not.toHaveTextContent('work 1');
  
  folderElem = getByText('Work');
  fireEvent.click(folderElem);
  expect(notesListElem).toHaveTextContent('work 1');
  expect(notesListElem).not.toHaveTextContent('note 1');
});
