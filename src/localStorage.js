export const storageKey = 'Notes_App_Data';

export const getSavedState = () => {
  try {
    const savedState = localStorage.getItem(storageKey);
    if (savedState === null) {
      return undefined;
    }
    return JSON.parse(savedState);
  } catch (e) {
    return undefined;
  }
};

export const setSavedState = (state) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (e) {
    // console.log(e);
  }
};
