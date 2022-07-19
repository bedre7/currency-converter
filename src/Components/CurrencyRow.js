import React from "react";

export default function CurrencyRow(props) {
  return (
    <div>
      <input type="number" className="input" value={props.amount} onChange={props.onChangeAmount}/>
      <select value={props.selectedCurrency} onChange={props.onChangeCurrency}>
        {props.currencyOptions.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
