export const saveAny = (key, state) => {
  const serializedState = JSON.stringify(state);
  try {
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const loadAny = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveState = (state) => saveAny('state', state);

export const loadState = () => loadAny('state');
