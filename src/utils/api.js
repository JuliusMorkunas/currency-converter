import { API_URL } from './constants';

const validateResponse = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const readResponseAsJSON = response => {
  return response.json();
};

export const getExchangeRate = async ({ from, to, amount }) => {
  if (API_URL) {
    const params = {
      from: encodeURIComponent(from),
      to: encodeURIComponent(to),
      amount: encodeURIComponent(amount),
    };
    return await fetch(
      `${API_URL}/fx-rates?from=${params.from}&to=${params.to}&amount=${params.amount}`,
    )
      .then(validateResponse)
      .then(readResponseAsJSON);
  }
};
