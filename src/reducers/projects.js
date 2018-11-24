const initialState = {
  list: [],
  loading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PROJECTS':
        return {
          ...state,
          loading: true,
        };
      case 'FETCH_PROJECTS_SUCCESS':
        return {
          loading: false,
          list: [
            ...state.list,
            ...action.response,
          ]
        }
      case 'FETCH_PROJECTS_FAIL':
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  };
  