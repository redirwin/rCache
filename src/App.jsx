import React, { useState } from "react";
import "./App.scss";
import sampleData from "./sampleData";
import BalanceBanner from "./components/BalanceBanner/BalanceBanner";
import NewEntryButton from "./components/NewEntryButton/NewEntryButton";
import EntriesList from "./components/EntriesList/EntriesList";
import EntryForm from "./components/EntryForm/EntryForm";
import Header from "./components/Header/Header";

export default function App() {
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

  return <div className="App">{renderView()}</div>;
}
