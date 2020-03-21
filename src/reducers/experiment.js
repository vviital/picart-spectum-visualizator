const defaultState = {
  id: '',
  description: '',
  fileID: '',
  name: '',
  ownerID: '',
  researchID: '',
  peaksSearchSettings: {},
  type: '',
};

const researchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_EXPERIMENT': {
      return { ...state, ...action.payload };
    }
    case 'EDIT_EXPERIMENT': {
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
