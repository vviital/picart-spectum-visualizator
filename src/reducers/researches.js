const defaultState = {
  items: [],
  query: '',
};

const researchesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_RESEARCHES': {
      return { ...state, ...action.payload };
    }
    case 'RESEARCHES_QUERY_CHANGE': {
      return { ...state, query: action.payload.value }
    }
    case 'CLEAR_SYSTEM': {
      return defaultState;
    }
    default:
      return state;
  }
};
export default researchesReducer;
