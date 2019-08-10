import { STORAGE_KEY } from './constants';

export const setCurrencyFromTo = currencyProps => {
  try {
    const currentLocalState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const nextLocalState = {
      ...currentLocalState,
      ...currencyProps,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLocalState));
    return nextLocalState;
  } catch {
    return {};
  }
};

export const getCurrencyFromTo = () => {
  try {
    const currentLocalState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return currentLocalState ? currentLocalState : {};
  } catch {
    return {};
  }
};
