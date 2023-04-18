import React, { useState, useEffect } from "react";
import BalanceBanner from "../BalanceBanner/BalanceBanner";
import NewEntryButton from "../NewEntryButton/NewEntryButton";
import EntriesList from "../EntriesList/EntriesList";
import EntryForm from "../EntryForm/EntryForm";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Header from "../Header/Header";
import styles from "./Main.module.scss";

export default function Main(props) {
  const [entries, setEntries] = useState(props.entries);
  const [currentView, setCurrentView] = useState("list");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  const handleEntryDelete = () => {
    const filteredEntries = entries.filter((e) => e.eid !== selectedEntry.eid);
    setEntries(filteredEntries);
    setCurrentView("list");
    setSelectedEntry(null);
    props.deleteEntry(props.user, selectedEntry);
    setShowConfirmModal(false);
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
              showConfirmModal={() => setShowConfirmModal(true)} // Add this line
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

  return (
    <div className="Main">
      {renderView()}
      <ConfirmModal
        isOpen={showConfirmModal}
        message="Are you sure you want to delete this entry? This action cannot be undone."
        onConfirm={handleEntryDelete}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
}
