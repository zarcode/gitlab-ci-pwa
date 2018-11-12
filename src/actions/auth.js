export const login = (token) => ({
    type: 'LOGIN',
    token,
});

export const logout = () => ({
    type: 'LOGOUT',
});

export const fetchUser = () => ({
    type: 'FETCH_USER',
  });

export const userSuccess = (response) => ({
        type: 'FETCH_USER_SUCCESS',
        response,
    });

export const userFail = (error) => ({
    type: 'FETCH_USER_FAIL',
    error,
});
  