export const getTokenAsync = (value, password) => ({
  type: 'GET_TOKEN_ASYNC',
  payload: {
    value,
    password,
  },
});

export const clearLocalStorage = () => ({
  type: 'CLEAR_LOCAL_STORAGE',
});

export const getUser = () => ({
  type: 'GET_USER',
});
