import React from "react";
import { CgPlayListAdd } from "react-icons/cg";
import styles from "./NewEntryButton.module.scss";

export default function NewEntryButton(props) {
 return (
    <div className={styles.NewEntryButton}>
    <button onClick={props.handleNewEntryClick}>
      NEW ENTRY
      <CgPlayListAdd />
    </button>
  </div>
 )
}
