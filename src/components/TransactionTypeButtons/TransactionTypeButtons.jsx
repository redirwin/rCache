import React from "react";

export default function TransactionTypeButtons(props) {
  return (
    <div>
      <label htmlFor="transactionType">Transaction Type</label>
      <div>
        <button
          type="button"
          id="deposit"
          name="transactionType"
          value="deposit"
          onClick={() => props.handleTransactionTypeChange("deposit")}
        >
          DEPOSIT
        </button>

        <button
          type="button"
          id="spend"
          name="transactionType"
          value="spend"
          onClick={() => props.handleTransactionTypeChange("spend")}
        >
          SPEND
        </button>
      </div>
      {props.errors && props.errors.transactionType ? (
        <div>{props.errors.transactionType}</div>
      ) : null}
    </div>
  );
}
