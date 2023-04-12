import React from "react";
import styles from "./Menu.module.scss";
import firebase from "firebase/compat/app";

export default function Menu(props) {
  return (
    <div className={styles.Menu}>
      <ul>
        {/* <li>
          <a href='/app'>Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/terms">Terms & Privacy</a>
        </li> */}
        <li>
          {props.user.email && (
            <a
              href='/'
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              Sign Out
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}