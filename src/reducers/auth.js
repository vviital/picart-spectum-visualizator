const defaultState = {
    id: '',
    email: '',
    login: '',
    token: '',
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return Object.assign({}, state, {
                id: action.payload.id,
                email: action.payload.email,
                login: action.payload.login,
                token: action.payload.token,
            });
        case 'SYNC_STORAGE':
            return Object.assign({}, state, {
                id: action.payload.id,
                email: action.payload.email,
                login: action.payload.login,
                token: action.payload.token,
            });
        default:
            return state;
    }
};
export default authReducer;
