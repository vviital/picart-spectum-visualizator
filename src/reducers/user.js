const defaultState = {
    id: '',
    email: '',
    login: '',
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export default userReducer;