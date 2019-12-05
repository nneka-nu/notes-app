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

it('shows the correct modal on delete folder button click', () => {
  const { getAllByTestId, getByTitle }  = renderWithRedux(
    <App />, 
    {
      folders: [{id: 1, name: 'Folder 1'}],
      notes: [],
      selectedFolderId: 1,
    }
  );

  fireEvent.click(getByTitle('Delete folder'));
  const modals = getAllByTestId('modal-wrapper');
  modals.forEach(modal => {
    if (modal.innerHTML.includes('Delete Folder')) {
      expect(modal).toHaveClass('modal show');
    } else {
      expect(modal).not.toHaveClass('modal show');
    }
  });
});

it('deletes folders', () => {
  const { getByTestId, getByTitle }  = renderWithRedux(
    <App />, 
    {
      folders: [{id: 1, name: 'Folder 1'}],
      notes: [],
    }
  );

  const foldersList = getByTestId('folders-list');
  expect(foldersList.children).toHaveLength(1);
  fireEvent.click(getByTitle('Delete folder'));
  fireEvent.click(getByTitle('Delete this folder'));
  expect(foldersList.children).toHaveLength(0);
});

it('shows the correct modal on edit folder button click', () => {
  const { getAllByTestId, getByTitle }  = renderWithRedux(
    <App />, 
    {
      folders: [{id: 1, name: 'Folder 1'}],
      notes: [],
      selectedFolderId: 1,
    }
  );

  fireEvent.click(getByTitle('Rename folder'));
  const modals = getAllByTestId('modal-wrapper');
  modals.forEach(modal => {
    if (modal.innerHTML.includes('Rename Folder')) {
      expect(modal).toHaveClass('modal show');
    } else {
      expect(modal).not.toHaveClass('modal show');
    }
  }); 
});

it('renames folders', () => {
  const { getByTestId, getByTitle, getByLabelText }  = renderWithRedux(
    <App />, 
    {
      folders: [{id: 1, name: 'Folder 1'}],
      notes: [],
    }
  );

  const foldersContainer = getByTestId('folders-container');
  expect(foldersContainer).toHaveTextContent('Folder 1');
  fireEvent.click(getByTitle('Rename folder'));
  const input = getByLabelText('Folder Name');
  fireEvent.change(input, { target: { value: 'Another Folder' } });
  fireEvent.click(getByTitle('Rename this folder'));
  expect(foldersContainer).toHaveTextContent('Another Folder');
  expect(foldersContainer).not.toHaveTextContent('Folder 1');
});

it('shows the correct modal on new folder button click', () => {
  const { getAllByTestId, getByTestId }  = renderWithRedux(
    <App />, 
    {
      folders: [{id: 1, name: 'Folder 1'}],
      notes: [],
      selectedFolderId: 1,
    }
  );

  fireEvent.click(getByTestId('New folder'));
  const modals = getAllByTestId('modal-wrapper');
  modals.forEach(modal => {
    if (modal.innerHTML.includes('New Folder')) {
      expect(modal).toHaveClass('modal show');
    } else {
      expect(modal).not.toHaveClass('modal show');
    }
  }); 
});

it('creates folders', () => {
  const { getByTestId, getByTitle, getByLabelText }  = renderWithRedux(
    <App />, 
    {
      folders: [{id: 1, name: 'Folder 1'}],
      notes: [],
    }
  );

  const foldersContainer = getByTestId('folders-container');
  fireEvent.click(getByTestId('New folder'));
  const input = getByLabelText('Folder Name');
  fireEvent.change(input, { target: { value: 'Folder 2' } });
  fireEvent.click(getByTitle('Create new folder'));
  expect(foldersContainer).toHaveTextContent('Folder 1');
  expect(foldersContainer).toHaveTextContent('Folder 2');
});
