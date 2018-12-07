export const login = (token) => ({
    type: 'LOGIN_REQUESTED',
    token,
});

export const loginSuccess = (token) => ({
    type: 'LOGIN_SUCCESS',
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
  