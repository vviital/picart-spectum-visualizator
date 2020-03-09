const defaultState = {
  description: '',
  name: '',
  ownerID: '',
  researchType: '',
  type: '',
};

const researchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_RESEARCH': {
      return { ...state, ...action.payload };
    }
    case 'EDIT_RESEARCH': {
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    }
    default:
      return state;
  }
};
export default researchReducer;
