import { types } from '../actions';

const userBeganTyping = (state = true, action) => {
  if (action.type === types.SET_USER_BEGAN_TYPING) {
    return action.value;
  }
  
  return state;
}

export default userBeganTyping;
