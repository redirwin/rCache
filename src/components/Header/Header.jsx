import React, { useState } from "react";
import { CgMenuRound, CgCloseO, CgPlayListAdd } from "react-icons/cg";
import styles from "./Header.module.scss";
import Menu from "../Menu/Menu";

export default function Header({
  currentView,
  selectedEntry,
  setCurrentView,
  setSelectedEntry,
  user,
}) {
  const [displayMenu, setDisplayMenu] = useState(false);
  let headerText, headerIcon;

  switch (currentView) {
    case "form":
      headerText = selectedEntry ? "Edit Entry" : "New Entry";
      headerIcon = (
        <CgCloseO
          onClick={() => {
            setCurrentView("list");
            setSelectedEntry(null);
          }}
          role="button"
          tabIndex={0}
          aria-label="Close form"
        />
      );
      break;
    default:
      headerText = "rCache";
      !displayMenu
        ? (headerIcon = <CgMenuRound onClick={() => setDisplayMenu(true)} />)
        : (headerIcon = <CgCloseO onClick={() => setDisplayMenu(false)} />);
      break;
  }

  return (
    <div className={styles.Header}>
      <div className={styles.container}>
        <h1>{headerText}</h1>
        <div id="header-icon">{headerIcon}</div>
        {displayMenu && <Menu user={user} />}
      </div>
    </div>
  );
}
