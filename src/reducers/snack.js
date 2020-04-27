const defaultState = {
  open: false,
  type: '',
  message: '',
};

const snackReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SNACK': {
      return { ...state, ...action.payload };
    }
    case 'CLEAR_SNACK': {
      return {
        ...state,
        open: false,
      };
    }
    case 'CLEAR_SYSTEM': {
      return defaultState;
    }
    default:
      return state;
  }
};
export default snackReducer;
