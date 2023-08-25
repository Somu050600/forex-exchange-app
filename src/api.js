import axios from "axios";

const API_URL = "http://data.fixer.io/api";
const API_KEY = "8255247a89ed945c4effdb6bb68e51a2"; //process.env.API_KEY;

export const fetchCurrencies = async () => {
  try {
    const response = await axios.get(`${API_URL}/symbols`, {
      params: {
        access_key: API_KEY,
      },
    });
    return response.data.symbols;
  } catch (error) {
    throw error;
  }
};

export const fetchLatestExchangeRates = async () => {
  try {
    const response = await axios.get(`${API_URL}/latest`, {
      params: {
        access_key: API_KEY,
      },
    });
    return response.data.rates;
  } catch (error) {
    throw error;
  }
};

export const fetchHistoricalData = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/${date}`, {
      params: {
        access_key: API_KEY,
        base: "EUR",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
