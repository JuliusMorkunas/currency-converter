import { formatToCurrency } from '../../utils/helpers';
import { getCurrencyFromTo, setCurrencyFromTo } from '../../utils/localStorage';
import { getExchangeRate } from '../../utils/api';

const namespace = 'cc/converter';

// Actions
export const TOGGLE_CURRENCY_FROM = `${namespace}/TOGGLE_CURRENCY_FROM`;
export const TOGGLE_CURRENCY_TO = `${namespace}/TOGGLE_CURRENCY_TO`;
export const SELECT_CURRENCY_FROM = `${namespace}/SELECT_CURRENCY_FROM`;
export const SELECT_CURRENCY_TO = `${namespace}/SELECT_CURRENCY_TO`;
export const SWITCH_CURRENCIES = `${namespace}/SWITCH_CURRENCIES`;
export const CHANGE_AMOUNT_FROM = `${namespace}/CHANGE_AMOUNT_FROM`;
export const CHANGE_AMOUNT_TO = `${namespace}/CHANGE_AMOUNT_TO`;
export const GET_RATE = `${namespace}/GET_RATE`;
export const GET_RATE_CANCEL = `${namespace}/GET_RATE_CANCEL`;
export const GET_RATE_SUCCESS = `${namespace}/GET_RATE_SUCCESS`;
export const GET_RATE_FAILURE = `${namespace}/GET_RATE_FAILURE`;
export const INITIALIZE = `${namespace}/INITIALIZE`;

// Reducer
const currencies = [
  'eur',
  'gbp',
  'rub',
  'pln',
  'ron',
  'uah',
  'try',
  'usd',
  'dkk',
  'huf',
  'nok',
  'sek',
  'zar',
  'chf',
  'cad',
  'aud',
  'bgn',
  'hkd',
  'inr',
  'ils',
  'mxn',
  'php',
];

const { currencyFrom: currentCurrencyFrom, currencyTo: currentCurrencyTo } = getCurrencyFromTo();

export const initialState = {
  currencyFrom: currentCurrencyFrom || currencies[0],
  currencyTo: currentCurrencyTo || currencies[1],
  currencies,
  amountFrom: '1.00',
  amountTo: '',
  rate: '',
  isOpenFrom: false,
  isOpenTo: false,
  isInitialized: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INITIALIZE: {
      return { ...state, isInitialized: true };
    }
    case TOGGLE_CURRENCY_FROM: {
      return { ...state, isOpenFrom: action.payload || !state.isOpenFrom };
    }
    case TOGGLE_CURRENCY_TO: {
      return { ...state, isOpenTo: action.payload || !state.isOpenTo };
    }
    case SELECT_CURRENCY_FROM: {
      return { ...state, currencyFrom: action.payload };
    }
    case SELECT_CURRENCY_TO: {
      return { ...state, currencyTo: action.payload };
    }
    case SWITCH_CURRENCIES: {
      return { ...state, currencyFrom: state.currencyTo, currencyTo: state.currencyFrom };
    }
    case CHANGE_AMOUNT_FROM: {
      return { ...state, amountFrom: action.payload };
    }
    case CHANGE_AMOUNT_TO: {
      return { ...state, amountTo: action.payload };
    }
    case GET_RATE_SUCCESS: {
      return {
        ...state,
        rate: action.payload,
      };
    }
    case GET_RATE_FAILURE: {
      return { ...state, rate: 0 };
    }
    case GET_RATE:
    case GET_RATE_CANCEL:
    default:
      return state;
  }
}

// Private
const recalculateAfterRateUpdate = async (dispatch, getState) => {
  const {
    converter: { amountFrom = 0 },
  } = getState();
  const rate = await getRate()(dispatch, getState);
  const nextAmountTo = formatToCurrency(rate ? amountFrom * rate : 0);
  onChangeAmountTo(nextAmountTo)(dispatch);
  if (!rate) {
    const nextAmountFrom = formatToCurrency(0);
    onChangeAmountFrom(nextAmountFrom)(dispatch);
  }
};

// Action Creators
export const initialize = () => (dispatch, getState) => {
  const {
    converter: { amountFrom, rate },
  } = getState();
  if (!amountFrom) {
    return;
  }
  dispatch({
    type: CHANGE_AMOUNT_TO,
    payload: formatToCurrency(amountFrom * rate),
  });
  dispatch({
    type: INITIALIZE,
  });
};

export const onChangeAmountFrom = value => dispatch => {
  dispatch({
    type: CHANGE_AMOUNT_FROM,
    payload: value,
  });
};

export const onChangeAmountTo = value => dispatch => {
  dispatch({
    type: CHANGE_AMOUNT_TO,
    payload: value,
  });
};

export const toggleCurrencyFrom = isOpen => dispatch => {
  dispatch({
    type: TOGGLE_CURRENCY_FROM,
    payload: isOpen,
  });
};

export const toggleCurrencyTo = isOpen => dispatch => {
  dispatch({
    type: TOGGLE_CURRENCY_TO,
    payload: isOpen,
  });
};

export const switchCurrencies = () => async (dispatch, getState) => {
  dispatch({
    type: SWITCH_CURRENCIES,
  });
  const {
    converter: { currencyFrom, currencyTo },
  } = getState();
  setCurrencyFromTo({ currencyFrom, currencyTo });
  await recalculateAfterRateUpdate(dispatch, getState);
};

export const selectCurrencyFrom = currency => async (dispatch, getState) => {
  dispatch({
    type: SELECT_CURRENCY_FROM,
    payload: currency,
  });
  toggleCurrencyFrom()(dispatch);
  setCurrencyFromTo({ currencyFrom: currency });
  await recalculateAfterRateUpdate(dispatch, getState);
};

export const selectCurrencyTo = currency => async (dispatch, getState) => {
  dispatch({
    type: SELECT_CURRENCY_TO,
    payload: currency,
  });
  toggleCurrencyTo()(dispatch);
  setCurrencyFromTo({ currencyTo: currency });
  await recalculateAfterRateUpdate(dispatch, getState);
};

export const getRate = () => async (dispatch, getState) => {
  dispatch({
    type: GET_RATE,
  });
  const {
    converter: { currencyFrom, currencyTo },
  } = getState();
  if (!currencyFrom || !currencyTo) {
    dispatch({
      type: GET_RATE_CANCEL,
    });
    return;
  }
  try {
    const response = await getExchangeRate({
      from: currencyFrom.toUpperCase(),
      to: currencyTo.toUpperCase(),
      amount: 100, // Using relatively big hardcoded value to prevent AMOUNT_TOO_LOW API error
    });
    if (response.rate) {
      dispatch({
        type: GET_RATE_SUCCESS,
        payload: response.rate,
      });
      return response.rate;
    } else {
      dispatch({
        type: GET_RATE_FAILURE,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_RATE_FAILURE,
    });
  }
};
