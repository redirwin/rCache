import React, { useState, useEffect } from "react";
import styles from "./EntriesList.module.scss";

export default function Entries(props) {
  const [sortedEntries, setSortedEntries] = useState([]);

  useEffect(() => {
    // Sort entries by date from most recent to oldest
    const sortedEntries = props.entries.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA > dateB) {
        return -1;
      } else if (dateA < dateB) {
        return 1;
      } else {
        // If dates are equal, sort by timestamp
        const timeA = a.timestamp ? new Date(a.timestamp) : null;
        const timeB = b.timestamp ? new Date(b.timestamp) : null;

        if (!timeA && !timeB) {
          return 0;
        } else if (!timeA) {
          return 1;
        } else if (!timeB) {
          return -1;
        } else {
          return timeB - timeA;
        }
      }
    });
    setSortedEntries(sortedEntries);
    // console.log(sortedEntries)
  }, [props.entries]);

  return (
    <div className={`${styles.EntriesList}`}>
      <h2>RECENT ENTRIES</h2>
      <section>
        {sortedEntries.map(({ eid, date, description, amount, type, note }) => (
          <div
            key={eid}
            className={styles.entry}
            role="button"
            tabIndex={0}
            onClick={() => props.handleEntryClick({ eid, date, description, amount, type, note })}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                props.handleEntryClick({ eid, date, description, amount, type, note });
              }
            }}
            aria-label={`Click to edit entry for ${description} on ${new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              timeZone: 'UTC',
            })}`}
          >
            <p className={styles.date}>
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                timeZone: 'UTC',
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
