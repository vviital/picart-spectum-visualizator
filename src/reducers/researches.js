const defaultState = {
};

const researchesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_RESEARCHES':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default researchesReducer;
