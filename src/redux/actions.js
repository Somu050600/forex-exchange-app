export const SET_CURRENCIES = "SET_CURRENCIES";
export const SET_SOURCE_CURRENCY = "SET_SOURCE_CURRENCY";
export const SET_TARGET_CURRENCY = "SET_TARGET_CURRENCY";
export const SET_AMOUNT = "SET_AMOUNT";
export const SET_CONVERTED_AMOUNT = "SET_CONVERTED_AMOUNT";
export const SET_EXCHANGE_RATES = "SET_EXCHANGE_RATES";
export const SET_DARK_MODE = "SET_DARK_MODE";

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  payload: currencies,
});

export const setSourceCurrency = (currency) => ({
  type: SET_SOURCE_CURRENCY,
  payload: currency,
});

export const setTargetCurrency = (currency) => ({
  type: SET_TARGET_CURRENCY,
  payload: currency,
});

export const setAmount = (amount) => ({
  type: SET_AMOUNT,
  payload: amount,
});

export const setConvertedAmount = (convertedAmount) => ({
  type: SET_CONVERTED_AMOUNT,
  payload: convertedAmount,
});

export const setExchangeRates = (exchangeRates) => ({
  type: SET_EXCHANGE_RATES,
  payload: exchangeRates,
});

export const setDarkMode = (darkMode) => ({
  type: SET_DARK_MODE,
  payload: darkMode,
});

// Define other action creators...
