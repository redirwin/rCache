import React from "react";
// import { CgPlayListAdd } from "react-icons/cg";

export default function NewEntryButton(props) {
 return (
    <div>
    <button onClick={props.handleNewEntryClick}>
      NEW ENTRY
    </button>
  </div>
 )
}
