import React, { useState, useEffect } from "react";
import styles from "./EntriesList.module.scss";

export default function Entries(props) {
  const [entriesState, setEntriesState] = useState([]);

  useEffect(() => {
    // Sort entries by date from most recent to oldest
    const sortedEntries = props.entries.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    setEntriesState(sortedEntries);
  }, [props.entries]);

  return (
    <div className={`${styles.EntriesList}`}>
      <h2>RECENT ENTRIES</h2>
      <section>
        {entriesState.map(({ uuid, date, description, amount, type }) => (
          <div
            key={uuid}
            className={styles.entry}
            role="button"
            tabIndex={0}
            onClick={() => props.handleEntryClick({ uuid, date, description, amount, type })}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                props.handleEntryClick({ uuid, date, description, amount, type });
              }
            }}
            aria-label={`Click to edit entry for ${description} on ${new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}`}
          >
            <p className={styles.date}>
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className={styles.desc}>{description}</p>
            <p
              className={`${styles.amount} ${
                type === "spend" ? styles.spend : styles.deposit
              }`}
            >
              $
              {amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
