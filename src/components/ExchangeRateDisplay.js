import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrencies,
  setExchangeRates,
  setSourceCurrency,
} from "../redux/actions";
import { fetchCurrencies, fetchLatestExchangeRates } from "../api";
import "./CurrencyConverter.css";

const ExchangeRateDisplay = () => {
  const [sortingCriteria, setSortingCriteria] = useState("names1");

  const dispatch = useDispatch();
  const { currencies, exchangeRates, sourceCurrency } = useSelector(
    (state) => state.currency
  );
  const { darkMode } = useSelector((state) => state.mode);

  useEffect(() => {
    fetchCurrencies().then((currencyData) =>
      dispatch(setCurrencies(currencyData))
    );
    fetchLatestExchangeRates()
      .then((newExchangeRates) => {
        dispatch(setExchangeRates(newExchangeRates));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSortingChange = (criteria) => {
    setSortingCriteria(criteria);
  };

  const sortedCurrencies = Object.keys(exchangeRates).sort(
    (currencyA, currencyB) => {
      if (sortingCriteria === "values1" || sortingCriteria === "values2") {
        const rateA =
          parseFloat(exchangeRates[currencyA]) /
          parseFloat(exchangeRates[sourceCurrency]);
        const rateB =
          parseFloat(exchangeRates[currencyB]) /
          parseFloat(exchangeRates[sourceCurrency]);
        return sortingCriteria === "values1" ? rateA - rateB : rateB - rateA; // Sort by ascending order of rates
      } else {
        return sortingCriteria === "names1"
          ? currencyA.localeCompare(currencyB)
          : currencyB.localeCompare(currencyA); // Sort by currency names
      }
    }
  );

  return (
    <div
      className={`p-4 ${
        darkMode ? "dark" : ""
      } flex flex-col  place-items-center `}
      style={{ width: "100vw" }}
    >
      {/* <div className="justify-self-center"> */}
      <h2 className="p-2  rounded mb-2 md:mb-0 md:mr-2 text-1xl font-semibold mb-2 ">
        Live Exchange Rates
      </h2>
      <div>
        {" "}
        <select
          className={`p-2 border rounded mb-2 md:mb-0 md:mr-2 text-2l font-semibold mb-2 ${
            darkMode ? "dark" : ""
          }`}
          placeholder="Source Currency"
          value={sourceCurrency}
          onChange={(e) => dispatch(setSourceCurrency(e.target.value))}
        >
          {Object.keys(currencies).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencies[currencyCode]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          className="  text-white m-5 p-2 br-5 rounded"
          onClick={() =>
            handleSortingChange(
              sortingCriteria === "values1" ? "values2" : "values1"
            )
          }
        >
          Sort by Values
        </button>
        <button
          className="  text-white m-5 p-2 br-5 rounded"
          onClick={() =>
            handleSortingChange(
              sortingCriteria === "names1" ? "names2" : "names1"
            )
          }
        >
          Sort by Names
        </button>
      </div>
      {/* </div> */}
      <ul role="list" class="divide-y divide-gray-100">
        {sortedCurrencies.map((currency) => (
          <li key={currency} class="flex justify-center gap-x-6 py-5">
            1 {sourceCurrency} ={" "}
            {(
              parseFloat(exchangeRates[currency]) /
              parseFloat(exchangeRates[sourceCurrency])
            ).toFixed(3)}{" "}
            {currency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeRateDisplay;
