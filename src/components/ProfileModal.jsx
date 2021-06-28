import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../config/config";
import { BiUser } from "react-icons/bi";

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
            <div className="profilePicText d-flex align-items-center">
              <BiUser />
            </div>
          </div>
          <h4 className="font-weight-bold mt-3">
            {props.firstName && props.firstName}{" "}
            {props.lastName && props.lastName}
          </h4>
          <p className="mb-1">{props.email}</p>
          <p style={{ display: !props.titheNumber && "none" }}>
            Tithe Number: {props.titheNumber}
          </p>
          <button
            className="mainBtnRound mt-3 py-2 px-4 bg-danger border-danger"
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
