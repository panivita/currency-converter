import { useState, useEffect } from "react";

export const useBinanceApi = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/price"
      );
      const data = await response.json();
      setState(data);
    })();
  }, []);

  return state;
};
export const useExchangeRatesapi = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.exchangeratesapi.io/latest?base=USD"
      );
      const data = await response.json();
      const result = [];
      for (const property in data.rates) {
        result.push({ symbol: property, price: data.rates[property] });
      }
      setState(result);
    })();
  }, []);

  return state;
};
