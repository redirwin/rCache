import React, { useEffect, useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import NoPage from "./components/NoPage/NoPage";
import FirebaseAuth from "./firebaseAuth";
import firebase from "firebase/compat/app";
import { onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

export default function App() {
  firebase.initializeApp(firebaseConfig);
 const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(firebase.auth(), (user) => {
      if (user) {
        setUser({ email: user.email, uid: user.uid });
        console.log(user.uid, user.email)
      } else {
        setUser({});
      }
    });
  }, []);

  return (
    <div className="App">
      {user.email ? (
        <Routes>
          <Route exact path="/app" element={<Home user={user}/>} />
          <Route exact path="/" element={<Home user={user}/>} />
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
            element={<FirebaseAuth auth={firebase.auth()} />}
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
