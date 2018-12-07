const initialState = {
    isAuthenticated: false,
    token: null,
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                isAuthenticated: true,
                token: action.token,
            }
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export default auth;
  