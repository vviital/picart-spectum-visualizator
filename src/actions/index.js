export const getTokenAsync = (email, password) => ({
    type: 'GET_TOKEN_ASYNC',
    payload: {
        email,
        password
    },
});

export const getLocalStorage = () => ({
    type: 'GET_STORAGE'
});

export const clearLocalStorage = () => ({
    type: 'CLEAR_LOCAL_STORAGE'
});
