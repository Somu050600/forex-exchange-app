import axios from "axios";

const API_URL = "https://openexchangerates.org/api";
const API_KEY = "d1176212716e4a139bdef8dbd6e7a29d"; //process.env.API_KEY;

export const fetchCurrencies = async () => {
  try {
    const response = await axios.get(`${API_URL}/currencies.json`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchLatestExchangeRates = async () => {
  try {
    const response = await axios.get(`${API_URL}/latest.json`, {
      params: {
        app_id: API_KEY,
      },
    });
    return response.data.rates;
  } catch (error) {
    throw error;
  }
};

export const fetchHistoricalData = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/historical/${date}.json`, {
      params: {
        app_id: API_KEY,
        // base: "EUR",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
