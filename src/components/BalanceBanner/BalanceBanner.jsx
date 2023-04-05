import styles from "./BalanceBanner.module.scss";
import React, { useState, useEffect } from "react";

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
    <div className={styles.BalanceBanner}>
      <h2>CURRENT BALANCE</h2>
      <p>${balance.toLocaleString()}</p>
    </div>
  );
}
