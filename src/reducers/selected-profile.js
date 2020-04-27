const defaultState = {
  name: '',
  surname: '',
  email: '',
  login: '',
};

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_PROFILE': {
      return { ...state, ...action.payload };
    }
    case 'CLEAR_SYSTEM': {
      return defaultState;
    }
    default:
      return state;
  }
};
export default profileReducer;
