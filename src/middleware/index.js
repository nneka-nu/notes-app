import { types } from '../actions';

export const updateNoteScheduler = store => next => action => {
  if (action.type !== types.UPDATE_NOTE) {
    return next(action);
  }

  const timeoutId = setTimeout(() => next(action), 50);

  return function cancel() {
    clearTimeout(timeoutId);
  };
};
