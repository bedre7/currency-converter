import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./Components/CurrencyRow";
import { FetchQuery } from "./FetchQuery";
import { BASE_URL } from "./config";
import Card from "./Components/Card";

const App = function () {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInChanged, setAmountInChanged] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();

  let toAmount, fromAmount;

  if (amountInChanged) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    (async function fetchData() {
      try {
        const data = await FetchQuery(`${BASE_URL}/USD`);
        const symbols = Object.keys(data.conversion_rates);
        const TRY = "TRY";
        console.log(symbols); 
        setFromCurrency(symbols[0]);
        setToCurrency(TRY);
        setCurrencyOptions(symbols);
        setExchangeRate(data.conversion_rates[TRY]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;
    (async function fetchData() {
      try {
        const data = await FetchQuery(`${BASE_URL}/${fromCurrency}`);
        setExchangeRate(data.conversion_rates[toCurrency]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [fromCurrency, toCurrency]);

  const handleFromChange = (event) => {
    setAmount(event.target.value);
    setAmountInChanged(true);
  };

  const handleToChange = (event) => {
    setAmount(event.target.value);
    setAmountInChanged(false);
  };

  const swapHandler = (event) => {
    let from = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(from);
  };

  return (
    <Card>
      <h1>€onver₺</h1>
      <CurrencyRow
        selectedCurrency={fromCurrency}
        currencyOptions={currencyOptions}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromChange}
      />
      <div className="equals">=</div>
      <CurrencyRow
        selectedCurrency={toCurrency}
        currencyOptions={currencyOptions}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToChange}
      />
      <button className="swap" onClick={swapHandler}>
        Swap
      </button>
    </Card>
  );
};

export default App;
