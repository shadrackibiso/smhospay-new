import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../config/config";

function ProfileModal(props) {
  const [redirect, setRedirect] = useState(false);
  const logOut = () => {
    auth.signOut().then(localStorage.clear("user"));
    setRedirect(true);
  };

  return (
    <>
      {redirect && <Redirect to="/login" />}
      <div
        className="modalContainer"
        style={{ display: !props.showProfileModal && "none" }}
      >
        {/* MODAL BACKDROP */}
        <div className="backdrop" onClick={props.closeModal}></div>
        {/* MODAL CONTENT */}
        <div className="modalContent p-4 py-5 d-flex align-items-center justify-content-center flex-column text-center animate__animated animate__zoomIn">
          <div className="profileModal profilePic">
            <div className="profilePicText">
              {props.firstName && props.firstName.slice(0, 1)}
            </div>
          </div>
          <h4 className="font-weight-bold mt-3">
            {props.firstName && props.firstName}{" "}
            {props.lastName && props.lastName}
          </h4>
          <p>TN: {props.titheNumber}</p>
          <button
            className="mainBtn mt-3 py-2 px-4 bg-danger border-danger"
            onClick={logOut}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileModal;
