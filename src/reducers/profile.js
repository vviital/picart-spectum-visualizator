const defaultState = {
    name: '',
    surname: '',
    email: '',
    login: '',
};

const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PROFILE': {
            return { ...state, ...action.payload };
        }
        default:
            return state;
    }
};
export default profileReducer;
