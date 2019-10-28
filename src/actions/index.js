export const getTokenAsync = (email, password) => ({
    type: 'GET_TOKEN_ASYNC',
    payload: {
        email,
        password
    },
});

export const clearLocalStorage = () => ({
    type: 'CLEAR_LOCAL_STORAGE'
});

export const getUser = () => ({
    type: 'GET_USER'
});
