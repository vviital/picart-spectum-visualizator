const defaultState = {
    id: '',
    email: '',
    login: '',
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return Object.assign({}, state, {
                id: action.payload.id,
                email: action.payload.email,
                login: action.payload.login,
            });
        default:
            return state;
    }
};
export default userReducer;