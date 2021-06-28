import React, { useState } from "react";
import ProfileModal from "../components/ProfileModal";
import { MdMenu } from "react-icons/md";
import { BiUser } from "react-icons/bi";

function Header(props) {
  const [showProfileModal, setDisplayModal] = useState(false);

  const showSidebar = () => {
    document
      .getElementById("sidebar")
      .classList.add(
        "sidebarVisible",
        "animate__animated",
        "animate__slideInLeft"
      );
    document
      .getElementById("sidebarBackdrop")
      .classList.add(
        "sidebarBackdropVisible",
        "animate__animated",
        "animate__fadeIn"
      );
  };

  return (
    <>
      <div className="header">
        <div className="container px-0">
          {/* GREETINGS */}
          <div className="row justify-content-between no-gutters align-items-center">
            {/* title */}
            <div className="d-flex align-items-center">
              <span
                className="mr-3 sidebarToggle"
                style={{ fontSize: "1.3rem" }}
                onClick={showSidebar}
              >
                <MdMenu />
              </span>
              <h4 className="font-weight-bold headerTitle mb-0">
                {props.title}
              </h4>
            </div>
            {/* avatar */}
            <div className="profilePic" onClick={() => setDisplayModal(true)}>
              <div className="profilePicText d-flex align-items-center">
                {/* {props.firstName && props.firstName.slice(0, 1)} */}
                <BiUser />
              </div>
            </div>
          </div>
          {/* PROFILE MODAL */}
          <ProfileModal
            {...props}
            showProfileModal={showProfileModal}
            closeModal={() => setDisplayModal(false)}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
