const defaultState = {
  id: '',
  description: '',
  fileID: '',
  name: '',
  ownerID: '',
  researchID: '',
  peaksSearchSettings: {
    smoothMarkov: false,
    averageWindow: 0,
    deconvolutionIterations: 0,
    sigma: 0,
    threshold: 0
  },
  chemicalElementsSettings: {
    maxElementsPerPeak: 0,
    minIntensity: 0,
    maxIntensity: 0,
    maxIonizationLevel: 0,
    waveLengthRange: 0
  },
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
    case 'CLEAR_EXPERIMENT': {
      return defaultState;
    }
    default:
      return state;
  }
};
export default researchReducer;
