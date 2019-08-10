import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  getRate,
  switchCurrencies,
  selectCurrencyFrom,
  selectCurrencyTo,
  onChangeAmountFrom,
  initialize,
  GET_RATE,
  GET_RATE_CANCEL,
  GET_RATE_SUCCESS,
  GET_RATE_FAILURE,
  SWITCH_CURRENCIES,
  SELECT_CURRENCY_FROM,
  SELECT_CURRENCY_TO,
  CHANGE_AMOUNT_TO,
  TOGGLE_CURRENCY_FROM,
  TOGGLE_CURRENCY_TO,
  CHANGE_AMOUNT_FROM,
  INITIALIZE,
} from './converter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getRate', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should dispatch GET_RATE_SUCCESS when fetched successfully', () => {
    fetchMock.getOnce('*', {
      body: { rate: 1.5 },
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [{ type: GET_RATE }, { type: GET_RATE_SUCCESS, payload: 1.5 }];
    const store = mockStore({
      converter: { amountFrom: 1, currencyFrom: 'eur', currencyTo: 'gbp' },
    });

    return store.dispatch(getRate()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch GET_RATE_FAILURE when fetched unsuccessfully', () => {
    fetchMock.getOnce('*', {
      throws: { error: 'some error' },
    });
    const expectedActions = [{ type: GET_RATE }, { type: GET_RATE_FAILURE }];
    const store = mockStore({
      converter: { amountFrom: 1, currencyFrom: 'eur', currencyTo: 'gbp' },
    });

    return store.dispatch(getRate()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch GET_RATE_CANCEL when no from or to currency is selected', () => {
    const expectedActions = [{ type: GET_RATE }, { type: GET_RATE_CANCEL }];
    const store = mockStore({
      converter: { amountFrom: 1, currencyFrom: 'eur' },
    });

    return store.dispatch(getRate()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('switchCurrencies', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should dispatch SWITCH_CURRENCIES and re-fetch rate', () => {
    fetchMock.getOnce('*', {
      body: { rate: 1.5 },
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: SWITCH_CURRENCIES },
      { type: GET_RATE },
      { type: GET_RATE_SUCCESS, payload: 1.5 },
      { type: CHANGE_AMOUNT_TO, payload: '1.50' },
    ];
    const store = mockStore({
      converter: { amountFrom: 1, amountTo: 2, currencyFrom: 'eur', currencyTo: 'gbp' },
    });

    return store.dispatch(switchCurrencies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('selectCurrencyFrom', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should dispatch SELECT_CURRENCY_FROM and re-fetch rate', () => {
    fetchMock.getOnce('*', {
      body: { rate: 1.5 },
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: SELECT_CURRENCY_FROM, payload: 'gbp' },
      { type: TOGGLE_CURRENCY_FROM },
      { type: GET_RATE },
      { type: GET_RATE_SUCCESS, payload: 1.5 },
      { type: CHANGE_AMOUNT_TO, payload: '1.50' },
    ];
    const store = mockStore({
      converter: { amountFrom: 1, amountTo: 2, currencyFrom: 'eur', currencyTo: 'gbp' },
    });

    return store.dispatch(selectCurrencyFrom('gbp')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('selectCurrencyTo', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should dispatch SELECT_CURRENCY_TO and re-fetch rate', () => {
    fetchMock.getOnce('*', {
      body: { rate: 1.5 },
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: SELECT_CURRENCY_TO, payload: 'eur' },
      { type: TOGGLE_CURRENCY_TO },
      { type: GET_RATE },
      { type: GET_RATE_SUCCESS, payload: 1.5 },
      { type: CHANGE_AMOUNT_TO, payload: '1.50' },
    ];
    const store = mockStore({
      converter: { amountFrom: 1, amountTo: 2, currencyFrom: 'eur', currencyTo: 'gbp' },
    });

    return store.dispatch(selectCurrencyTo('eur')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('onChangeAmountFrom', () => {
  it('should dispatch CHANGE_AMOUNT_FROM', () => {
    const expectedActions = [{ type: CHANGE_AMOUNT_FROM, payload: '15' }];
    const store = mockStore({
      converter: {},
    });
    store.dispatch(onChangeAmountFrom('15'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('initialize', () => {
  it('should dispatch INITIALIZE after calculating amountTo', () => {
    const expectedActions = [{ type: CHANGE_AMOUNT_TO, payload: '31.00' }, { type: INITIALIZE }];
    const store = mockStore({
      converter: { amountFrom: '15.5', rate: 2 },
    });
    store.dispatch(initialize());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
