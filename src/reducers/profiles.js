const defaultState = {
  items: [],
  query: '',
};

const profilesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PROFILES': {
      return {...state, items: action.payload.items};
    }
    case 'PROFILES_QUERY_CHANGE': {
      return { ...state, query: action.payload.value };
    }
    case 'CLEAR_SYSTEM': {
      return defaultState;
    }
    default:
      return state;
  }
};
export default profilesReducer;
