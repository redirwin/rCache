import React from "react";
import { CgMenuRound, CgCloseO, CgPlayListAdd } from "react-icons/cg";

export default function Header({
  currentView,
  selectedEntry,
  setCurrentView,
  setSelectedEntry,
}) {
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
      headerIcon = <CgMenuRound />;
      break;
  }

  return (
    <>
      <h1>{headerText}</h1>
      <div id="header-icon">{headerIcon}</div>
    </>
  );
}
