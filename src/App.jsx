import React, { useState, useEffect } from 'react'
import './App.scss'
import sampleData from './sampleData'
import BalanceBanner from './components/BalanceBanner/BalanceBanner'
import NewEntryButton from './components/NewEntryButton/NewEntryButton'
import EntriesList from './components/EntriesList/EntriesList'

export default function App() {
  const [entries, setEntries] = useState(sampleData)

  return (
    <div className="App">
      <BalanceBanner entries={entries}/>
      <NewEntryButton/>
      <EntriesList entries={entries}/>
    </div>
  )
}
