import React from "react";

export default function Header({ currentView, selectedEntry }) {
  let headerText;

  switch (currentView) {
    case "form":
      headerText = selectedEntry ? "Edit Entry" : "New Entry";
      break;
    default:
      headerText = "rCache";
      break;
  }

  return <h1>{headerText}</h1>;
}
