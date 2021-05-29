import React, {useState} from "react";
import {Redirect} from 'react-router-dom'
import avatar from "../images/avatar.jpg"
import fb from "../config/config";

function ProfileModal(props) {
  const [redirect, setRedirect] = useState(false);
  const logOut = () => {
    fb.auth().signOut().then(localStorage.clear("user"));

    setRedirect(true);
  };

    return (
        <>
        {redirect && <Redirect to="/login" />}
        <div className="modalContainer" style={{display: !props.showProfileModal && 'none'}}>
            <div className="backdrop" onClick={props.closeModal}></div>
            <div className="modalContent p-4 py-5 d-flex align-items-center justify-content-center flex-column text-center">
                <div className="profileModal profilePic">
                <div className="profilePicText">{props.firstName.slice(0,1)}</div>
                </div>
                <h4 className="font-weight-bold mt-3">{props.firstName} {props.lastName}</h4>
                <p>{props.email}</p>
                <button className="mainBtn py-2 px-4 bg-danger border-danger" onClick={logOut}>Logout</button>
            </div>
        </div>
        </>
    );
}

export default ProfileModal;
