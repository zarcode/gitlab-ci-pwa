export default (state = {}, action) => {
    switch (action.type) {
      case 'FETCH_USER_SUCCESS':
        return {
          ...state,
          ...action.response,
        };
      case 'FETCH_USER_FAIL':
        return state;
      default:
        return state;
    }
  };