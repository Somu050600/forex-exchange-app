import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrencies,
  setSourceCurrency,
  setTargetCurrency,
  setAmount,
  setConvertedAmount,
  setExchangeRates,
} from "../redux/actions";
import { fetchCurrencies, fetchLatestExchangeRates } from "../api";
import HistoricalChart from "./HistoricalChart";
import "./CurrencyConverter.css";

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const {
    currencies,
    sourceCurrency,
    targetCurrency,
    amount,
    convertedAmount,
    exchangeRates,
  } = useSelector((state) => state.currency);
  const [targetCurrencies, setTargetCurrencies] = useState([
    sourceCurrency,
    // targetCurrency,
  ]);

  const { darkMode } = useSelector((state) => state.mode);

  useEffect(() => {
    fetchCurrenciesData();
  }, []);

  useEffect(() => {
    if (Object.keys(exchangeRates).length > 0) {
      handleConvert();
    }
  }, [exchangeRates, amount, sourceCurrency, targetCurrency]);

  const fetchCurrenciesData = async () => {
    try {
      const currencyData = await fetchCurrencies();
      dispatch(setCurrencies(currencyData));
      const latestRates = await fetchLatestExchangeRates();
      dispatch(setExchangeRates(latestRates));
      console.log("fetched");
    } catch (error) {
      console.error(error);
    }
  };

  const handleConvert = () => {
    try {
      const currency1 = exchangeRates[sourceCurrency];
      const currency2 = exchangeRates[targetCurrency];
      console.log(currency1, currency2, exchangeRates);

      // Perform currency conversion using the exchange rate
      const convertedAmountValue =
        (parseFloat(amount) * parseFloat(currency2)) / parseFloat(currency1);
      dispatch(setConvertedAmount(convertedAmountValue));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`p-4 ${
        darkMode ? "dark" : ""
      } flex flex-col  place-items-center `}
    >
      <h2 className="text-2xl font-semibold mb-4">Currency Converter</h2>
      <div className="flex flex-col md:flex-row mb-4">
        <select
          className={`p-2 border rounded mb-2 md:mb-0 md:mr-2 text-2l font-semibold mb-2 ${
            darkMode ? "dark" : ""
          }`}
          value={sourceCurrency}
          onChange={(e) => {
            dispatch(setSourceCurrency(e.target.value));
            setTargetCurrencies([e.target.value]);
          }}
        >
          {Object.keys(currencies).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencies[currencyCode]}
            </option>
          ))}
        </select>
        <input
          className={`p-2 pl-4 border rounded mb-2 md:mb-0 md:w-24 md:mr-2 ${
            darkMode ? "dark" : ""
          }`}
          type="number"
          value={amount}
          onChange={(e) => {
            dispatch(setAmount(parseInt(e.target.value)));
          }}
        />
        <select
          className={`p-2 border rounded mb-2 md:mb-0 md:mr-2 text-2l font-semibold mb-2 ${
            darkMode ? "dark" : ""
          }`}
          value={targetCurrency}
          onChange={(e) => {
            dispatch(setTargetCurrency(e.target.value));
            // setTargetCurrencies([sourceCurrency, e.target.value]);
          }}
        >
          {Object.keys(currencies).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencies[currencyCode]}
            </option>
          ))}
        </select>
      </div>
      <p className="mb-4">
        Converted Amount:{" "}
        <span className="p-2 border rounded mb-2 font-semibold">
          {convertedAmount.toFixed(3)}
        </span>
      </p>

      <div className="mb-4">
        <HistoricalChart
          targetCurrencies={targetCurrencies}
          targetCurrency={targetCurrency}
        />
      </div>
    </div>
  );
};
export default CurrencyConverter;
