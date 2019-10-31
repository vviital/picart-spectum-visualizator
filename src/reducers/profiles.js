const defaultState = {
};

const profilesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PROFILES':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export default profilesReducer;