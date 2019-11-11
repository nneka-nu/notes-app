import { types } from '../actions';

const lastComponentHasMounted = (state = false, action) => {
  if (action.type === types.SET_LAST_COMPONENT_HAS_MOUNTED) {
    return action.value;
  }
  
  return state;
}

export default lastComponentHasMounted;
