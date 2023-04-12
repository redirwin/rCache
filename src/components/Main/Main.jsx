import React, { useState, useEffect } from "react";
import BalanceBanner from "../BalanceBanner/BalanceBanner";
import NewEntryButton from "../NewEntryButton/NewEntryButton";
import EntriesList from "../EntriesList/EntriesList";
import EntryForm from "../EntryForm/EntryForm";
import Header from "../Header/Header";
import styles from "./Main.module.scss";

export default function Main(props) {
  const [entries, setEntries] = useState(props.entries);
  const [currentView, setCurrentView] = useState("list");
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    props.entries.length && setEntries(props.entries);
  }, [props.entries]);

  const handleNewEntryClick = () => {
    setCurrentView("form");
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setCurrentView("form");
  };

  const handleFormClose = () => {
    setCurrentView("list");
    setSelectedEntry(null);
  };

  const handleEntryDelete = (entry) => {
    const filteredEntries = entries.filter((e) => e.eid !== entry.eid);
    setEntries(filteredEntries);
    setCurrentView("list");
    setSelectedEntry(null);
    props.deleteEntry(props.user, entry);
  };

  const handleFormSubmit = (newEntry) => {
    if (selectedEntry) {
      // update existing entry
      const updatedEntries = entries.map((entry) =>
        entry.eid === selectedEntry.eid ? newEntry : entry
      );
      setEntries(updatedEntries);
      props.saveEntry(props.user, newEntry);
    } else {
      // add new entry
      const newEntries = [...entries, newEntry];
      setEntries(newEntries);
      props.saveEntry(props.user, newEntry);
    }
    setCurrentView("list");
    setSelectedEntry(null);
  };

  const renderView = () => {
    switch (currentView) {
      case "form":
        return (
          <div className={styles.Main}>
            <Header
              currentView={currentView}
              selectedEntry={selectedEntry}
              setCurrentView={setCurrentView}
              setSelectedEntry={setSelectedEntry}
              user={props.user}
            />
            <EntryForm
              handleFormClose={handleFormClose}
              handleFormSubmit={handleFormSubmit}
              selectedEntry={selectedEntry}
              entries={entries}
              setEntries={setEntries}
              handleEntryDelete={handleEntryDelete}
            />
          </div>
        );
      default:
        return (
          <div className={styles.Main}>
            <Header
              currentView={currentView}
              selectedEntry={selectedEntry}
              setCurrentView={setCurrentView}
              setSelectedEntry={setSelectedEntry}
              user={props.user}
            />
            <BalanceBanner entries={entries} />
            <NewEntryButton handleNewEntryClick={handleNewEntryClick} />
            <EntriesList
              entries={entries}
              handleEntryClick={handleEntryClick}
            />
          </div>
        );
    }
  };

  return <div className="Main">{renderView()}</div>;
}
