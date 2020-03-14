const defaultState = {
  items: [],
};

const researchesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_EXPERIMENTS': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
export default researchesReducer;