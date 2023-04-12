import React, { useState, useEffect } from "react";
import styles from "./BalanceBanner.module.scss";

export default function Balance(props) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const { totalSpending, totalDeposits } = props.entries.reduce(
      (acc, entry) => {
        if (entry.type === "spend") {
          acc.totalSpending += entry.amount;
        } else if (entry.type === "deposit") {
          acc.totalDeposits += entry.amount;
        }
        return acc;
      },
      { totalSpending: 0, totalDeposits: 0 }
    );

    setBalance(totalDeposits - totalSpending);
  }, [props.entries]);

  return (
    <div
      className={`${styles.BalanceBanner} ${
        balance >= 0 ? styles.positive : styles.negative
      }`}
    >
      <h2>CURRENT BALANCE</h2>
      <p>${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

    </div>
  );
}
