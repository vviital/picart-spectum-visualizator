const defaultState = {
  items: []
};

const profilesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PROFILES':
      return {...state, items: action.payload.items};
    default:
      return state;
  }
};
export default profilesReducer;
