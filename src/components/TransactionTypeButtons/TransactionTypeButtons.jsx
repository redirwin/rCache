import React from "react";
import styles from "./TransactionTypeButtons.module.scss";

export default function TransactionTypeButtons(props) {
  return (
    <div className={styles.TransactionTypeButtons}>
      <label htmlFor="transactionType">Transaction Type</label>
      <div>
        <button
          type="button"
          id="deposit"
          name="transactionType"
          value="deposit"
          onClick={() => props.handleTransactionTypeChange("deposit")}
          className={`${styles.depositButton} ${
            props.currentType === "deposit" ? styles.active : ""
          }`}
        >
          DEPOSIT
        </button>

        <button
          type="button"
          id="spend"
          name="transactionType"
          value="spend"
          onClick={() => props.handleTransactionTypeChange("spend")}
          className={`${styles.spendButton} ${
            props.currentType === "spend" ? styles.active : ""
          }`}
        >
          SPEND
        </button>
      </div>
      {props.errors && props.errors.transactionType ? (
        <div className={styles.formikError}>{props.errors.transactionType}</div>
      ) : null}
    </div>
  );
}
