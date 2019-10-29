const defaultState = {
    id: '',
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return Object.assign({}, state, {
                id: action.payload.id,
            });
        default:
            return state;
    }
};
export default userReducer;