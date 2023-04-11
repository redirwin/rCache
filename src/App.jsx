import React, { useEffect, useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import NoPage from "./components/NoPage/NoPage";
import Login from "./components/Login/Login";
import firebase from "firebase/compat/app";
import { onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { getDatabase, ref, set, onValue } from "firebase/database";

export default function App() {
  const [user, setUser] = useState({});
  const [entries, setEntries] = useState([]);
  const app = firebase.initializeApp(firebaseConfig);
  const db = getDatabase(app);

  useEffect(() => {
    onAuthStateChanged(firebase.auth(), (user) => {
      if (user) {
        setUser({ email: user.email, uid: user.uid });
      } else {
        setUser({});
      }
    });
  }, []);

  useEffect(() => {
    const entriesRef = ref(db, `/users/${user.uid}/entries`);
    onValue(entriesRef, (snapshot) => {
      if (snapshot.val()) {
        const dbentries = Object.values(snapshot.val());
        dbentries.length && setEntries(dbentries);
      }
    });
  }, [user]);

  function saveEntry(user, entry) {
    set(ref(db, `/users/${user.uid}/entries/${entry.eid}`), {
      date: entry.date,
      type: entry.type,
      amount: entry.amount,
      description: entry.description,
      note: entry.note,
      timestamp: entry.timestamp,
      eid: entry.eid,
    });
  }

  function deleteEntry(user, entry) {
    set(ref(db, `/users/${user.uid}/entries/${entry.eid}`), null);
  }

  return (
    <div className="App">
      {user.email ? (
        <Routes>
          <Route
            exact
            path="/app"
            element={
              <Main user={user} saveEntry={saveEntry} entries={entries} />
            }
          />
          <Route
            exact
            path="/"
            element={
              <Main
                user={user}
                saveEntry={saveEntry}
                deleteEntry={deleteEntry}
                entries={entries}
              />
            }
          />
          <Route exact path="/privacy" element={<h1>Privacy Policy</h1>} />
          <Route exact path="/terms" element={<h1>Terms of Service</h1>} />
          <Route exact path="/about" element={<h1>About</h1>} />
          <Route exact path="/contact" element={<h1>Contact</h1>} />
          <Route path="*" element={<NoPage user={user} />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            exact
            path="/"
            element={<Login auth={firebase.auth()} />}
          />
          <Route exact path="/privacy" element={<h1>Privacy Policy</h1>} />
          <Route exact path="/terms" element={<h1>Terms of Service</h1>} />
          <Route exact path="/about" element={<h1>About</h1>} />
          <Route exact path="/contact" element={<h1>Contact</h1>} />
          <Route path="*" element={<NoPage user={user} />} />
        </Routes>
      )}
    </div>
  );
}
