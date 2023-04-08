import React, { useState } from "react";
import sampleData from "../../sampleData"
import BalanceBanner from "../BalanceBanner/BalanceBanner";
import NewEntryButton from "../NewEntryButton/NewEntryButton";
import EntriesList from "../EntriesList/EntriesList";
import EntryForm from "../EntryForm/EntryForm";
import Header from "../Header/Header";

export default function Home(props) {
  const [entries, setEntries] = useState(sampleData);
  const [currentView, setCurrentView] = useState("list");
  const [selectedEntry, setSelectedEntry] = useState(null);

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
    const filteredEntries = entries.filter((e) => e.uuid !== entry.uuid);
    setEntries(filteredEntries);
    setCurrentView("list");
    setSelectedEntry(null);
  };

  const handleFormSubmit = (newEntry) => {
    if (selectedEntry) {
      // update existing entry
      const updatedEntries = entries.map((entry) =>
        entry.uuid === selectedEntry.uuid ? newEntry : entry
      );
      setEntries(updatedEntries);
    } else {
      // add new entry
      const newEntries = [...entries, newEntry];
      setEntries(newEntries);
    }
    setCurrentView("list");
    setSelectedEntry(null);
  };

  const renderView = () => {
    switch (currentView) {
      case "form":
        return (
          <>
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
          </>
        );
      default:
        return (
          <>
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
          </>
        );
    }
  };

  return <div className="Home">{renderView()}</div>;
}
