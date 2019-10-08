export const getToken = (email, password) => ({
    type: 'GET_TOKEN_ASYNC',
    payload: {
        email,
        password
    },
});