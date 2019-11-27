const defaultState = {
  name: '',
  type: '',
  researchType: '',
  description: '',
};

const researchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_RESEARCH': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
export default researchReducer;
