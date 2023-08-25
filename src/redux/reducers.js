import { combineReducers } from "redux";
import {
  SET_CURRENCIES,
  SET_SOURCE_CURRENCY,
  SET_TARGET_CURRENCY,
  SET_AMOUNT,
  SET_CONVERTED_AMOUNT,
  SET_EXCHANGE_RATES,
  SET_DARK_MODE,
} from "./actions";

const initialState = {
  currencies: {},
  sourceCurrency: "USD",
  targetCurrency: "INR",
  amount: 1,
  convertedAmount: 0,
  exchangeRates: {},
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENCIES:
      return { ...state, currencies: action.payload };
    case SET_SOURCE_CURRENCY:
      return { ...state, sourceCurrency: action.payload };
    case SET_TARGET_CURRENCY:
      return { ...state, targetCurrency: action.payload };
    case SET_AMOUNT:
      return { ...state, amount: action.payload };
    case SET_CONVERTED_AMOUNT:
      return { ...state, convertedAmount: action.payload };
    case SET_EXCHANGE_RATES:
      return { ...state, exchangeRates: action.payload };
    // Add other cases for different actions...
    default:
      return state;
  }
};

const darkModeState = {
  darkMode: false, //default value is light mode
};

const modeReducer = (state = darkModeState, action) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return { ...state, darkMode: action.payload };
    default:
      return state;
  }
};

// Combine multiple reducers if needed
const rootReducer = combineReducers({
  currency: currencyReducer,
  mode: modeReducer,
  // Add other reducers...
});

export default rootReducer;
