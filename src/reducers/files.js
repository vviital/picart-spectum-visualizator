const defaultState = {
  currentFile: '',
  contents: {}
};

const filesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_FILE_CONTENT': {
      const fileContent = action.payload;
      return {
        ...state,
        contents: {
          ...state.contents,
          [fileContent.id]: fileContent 
        }
      };
    }
    case 'SET_CURRENT_FILE': {
      return {...state, currentFile: action.payload}
    }
    case 'CLEAR_FILE': {
      return {...state, currentFile: ''};
    }
    default:
      return state;
  }
};
export default filesReducer;
