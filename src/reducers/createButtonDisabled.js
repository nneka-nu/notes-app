import { types } from '../actions';

const createButtonDisabled = (state = false, action) => {
  if (action.type === types.SET_CREATE_BUTTON_DISABLED) {
    return action.value;
  }

  return state;
}

export default createButtonDisabled;