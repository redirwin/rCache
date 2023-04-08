import React from "react";
import { CgMenuRound, CgCloseO, CgPlayListAdd } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";


export default function Header({
  currentView,
  selectedEntry,
  setCurrentView,
  setSelectedEntry,
  user,
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

  const navigate = useNavigate();

  return (
    <>
      <h1>{headerText}</h1>
      {user.email && (
        <button
          onClick={() => {
            firebase.auth().signOut();
            navigate("/");
          }}
        >
          Sign Out
        </button>
      )}
      <div id="header-icon">{headerIcon}</div>
    </>
  );
}
