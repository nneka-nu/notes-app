import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';

it('shows or hides the folders\' sidebar', () => {
  const { getByTitle, getByTestId }  = renderWithRedux(<App />);
  const element = getByTestId('folders-container');
  expect(element).not.toHaveClass('hidden');
  fireEvent.click(getByTitle('Show/hide folders'));
  expect(element).toHaveClass('hidden');
  fireEvent.click(getByTitle('Show/hide folders'));
  expect(element).not.toHaveClass('hidden');
});

it('creates a new note on create button click', () => {
  const { getByTitle, getByTestId }  = renderWithRedux(
    <App />,
    {
      folders: [{id: 1, name: 'Notes'}],
      notes: [],
      selectedFolderId: 1,
      selectedNoteId: '',
    }
  );
  fireEvent.click(getByTitle('Create note'));
  expect(getByTestId('list-of-notes')).toHaveTextContent('New note');
});

it(`disables all toolbar buttons except the create button and toggle folder 
  button if there are no notes in the selected folder`, () => {
  const { getByTitle }  = renderWithRedux(
    <App />, 
    {
      folders: [{id: 1, name: 'Notes'}],
      notes: [],
      selectedFolderId: 1,
      selectedNoteId: '',
    }
  );
  expect(getByTitle('Show/hide folders')).toBeEnabled();
  expect(getByTitle('Create note')).toBeEnabled();
  expect(getByTitle('Delete note')).toBeDisabled();
  expect(getByTitle('Bold')).toBeDisabled();
  expect(getByTitle('Italic')).toBeDisabled();
  expect(getByTitle('Underline')).toBeDisabled();
  expect(getByTitle('Bulleted list')).toBeDisabled();
  expect(getByTitle('Numbered list')).toBeDisabled();
});

it('disables the create button after the user creates a new note', () => {
  const { getByTitle }  = renderWithRedux(<App />);
  const createButton = getByTitle('Create note');
  fireEvent.click(createButton);
  expect(createButton).toBeDisabled();
});

it('enables the create button when there are no notes in the selected folder', () => {
  const { getByTitle }  = renderWithRedux(
    <App />, 
    {
      folders: [{id: 1, name: 'Notes'}],
      notes: [],
      selectedFolderId: 1,
      selectedNoteId: '',
    }
  );
  expect(getByTitle('Create note')).toBeEnabled();
});

it('filters notes based on user input', () => {
  const { getByLabelText, getByTestId }  = renderWithRedux(
    <App />, 
    {
      folders: [{id: 1, name: 'Notes'}, {id: 2, name: 'Work'}],
      notes: [
        {
          id: 1, 
          noteAsText: 'work 1: research',
          folderId: 2, 
        },
        {
          id: 2, 
          noteAsText: 'notes 1: note-taking',
          folderId: 1, 
        },
      ],
      selectedFolderId: 1,
      selectedNoteId: 2,
    }
  );
  const input = getByLabelText('Search');
  fireEvent.change(input, { target: { value: 'note-taking' } });
  expect(input.value).toBe('note-taking');
  const element = getByTestId('list-of-notes');
  expect(element).toHaveTextContent('note-taking');
  expect(element).not.toHaveTextContent('research');

  fireEvent.change(input, { target: { value: 'work' } });
  expect(input.value).toBe('work');
  expect(element).toHaveTextContent('research');
  expect(element).not.toHaveTextContent('note-taking');
});
