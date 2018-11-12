export default (state = [], action) => {
    switch (action.type) {
      case 'FETCH_PROJECTS_SUCCESS':
        return [
          ...state,
          ...action.response,
        ];
      case 'FETCH_PROJECTS_FAIL':
        return state;
      default:
        return state;
    }
  };
  