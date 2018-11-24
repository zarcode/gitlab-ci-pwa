export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  try {
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
};