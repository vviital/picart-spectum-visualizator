const defaultState = {
  items: [],
};

const researchesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_EXPERIMENTS': {
      return { ...state, ...action.payload };
    }
    case 'CLEAR_SYSTEM': {
      return defaultState;
    }
    default:
      return state;
  }
};
export default researchesReducer;
