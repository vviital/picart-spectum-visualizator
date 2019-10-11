const defaultState = {
    id: '',
    email: '',
    login: '',
    authorized: false
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return Object.assign({}, state, {
                id: action.payload.id,
                email: action.payload.email,
                login: action.payload.login,
                authorized: action.payload.authorized
            });
        case 'SYNC_STORAGE':
            return Object.assign({}, state, {
                id: action.payload.id,
                email: action.payload.email,
                login: action.payload.login,
                authorized: action.payload.authorized
            });
        default:
            return state;
    }
};
export default authReducer;
