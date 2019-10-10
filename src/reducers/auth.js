const defaultState = {
    id: '',
    email: '',
    login: '',
    authorized: false,
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return Object.assign({}, state, {
                id: action.payload.id,
                email: action.payload.email,
                login: action.payload.login,
                authorized: true
            });
        default:
            return state;
    }
};
export default authReducer;
