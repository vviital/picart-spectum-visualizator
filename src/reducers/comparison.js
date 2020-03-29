const defaultState = {
  id: '',
  ownerID: '',
  researchID: '',
  experimentID: '',
  active: false,
  finished: false,
  lockedAt: null,
  total: 0,
  processed: 0,
  similarities: [],
  createdAt: 0,
  updatedAt: 0
};

const researchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_COMPARISON': {
      return { ...state, ...action.payload };
    }
    case 'CLEAR_COMPARISON': {
      return defaultState;
    }
    default:
      return state;
  }
};
export default researchReducer;
