import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import ProfileModal from "../components/ProfileModal";

function Header(props) {
  const [displayPopup, setDisplayPopup] = useState(false);
  const [displayProfileModal, setDisplayProfileModal] = useState(false);

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

  const ProfileMenu = () => (
    <div
      className="popupContainer hide"
      style={{ display: displayPopup && "block" }}
    >
      <div
        className="popupBackdrop"
        onClick={() => setDisplayPopup(false)}
      ></div>
      <div className="popupContent profileMenuContainer">
        <div className="profileMenu">
          <div className="profileMenuItem d-flex align-items-center">
            <span className="mr-3">
              <BiUser className="d-flex align-items-center" />
            </span>
            <span>profile</span>
          </div>
        </div>
      </div>
    </div>
  );

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
            <div className="popupWrapper">
              <div
                className="profilePic cursor-pointer"
                // onClick={() => setDisplayPopup((prevState) => !prevState)}
                onClick={() => setDisplayProfileModal(true)}
              >
                <div className="d-flex align-items-center">
                  <BiUser />
                </div>
              </div>
              {/* Profile Menu */}
              <ProfileMenu />
            </div>
            {/* profile modal */}
            <ProfileModal
              {...props}
              showProfileModal={displayProfileModal}
              closeModal={() => setDisplayProfileModal(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
