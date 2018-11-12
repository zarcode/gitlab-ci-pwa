export default (state = [], action) => {
    switch (action.type) {
      case 'FETCH_PIPELINES_SUCCESS':
        return [
          ...state,
          ...action.response,
        ];
      case 'FETCH_PIPELINES_FAIL':
        return state;
      default:
        return state;
    }
  };
  