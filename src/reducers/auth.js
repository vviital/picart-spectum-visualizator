const defaultState = {
    token: '',
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return Object.assign({}, state, {
                token: action.payload.token,
            });
        default:
            return state;
    }
};
export default authReducer;
