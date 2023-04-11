import React, { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebase from "firebase/compat/app";

export default function FirebaseAuth(props) {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(props.auth);
    ui.start(".firebase-auth-container", {
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true,
        },
      ],
      // signInSuccessUrl: "/app",
    });
  }, [props.auth]);

  return (
    <div>
      <h1>Welcome to rCache</h1>
      <p>Please sign in to continue</p>
      <div className={"firebase-auth-container"}></div>
    </div>
  );
}
