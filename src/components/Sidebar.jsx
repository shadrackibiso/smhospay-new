import React from "react";
import { NavLink } from "react-router-dom";
import { MdReceipt, MdDashboard } from "react-icons/md";
import logo from "../images/logo.svg";

function Sidebar(props) {
  const hideSidebar = () => {
    document.getElementById("sidebar").classList.remove("sidebarVisible");
    document
      .getElementById("sidebarBackdrop")
      .classList.remove("sidebarBackdropVisible");
  };

  return (
    <>
      <div
        className="backdrop sidebarBackdrop"
        id="sidebarBackdrop"
        onClick={hideSidebar}
      ></div>
      <div className="sidebar" id="sidebar">
        <div className="sidebarHeader">
          <img src={logo} width="120px" alt="logo" />
        </div>
        <div className="fullHeight sidebarNavContainer">
          {/* HOME */}
          <NavLink to="/">
            <div
              className={
                props.page === "home" ? "sidebarNav active" : "sidebarNav"
              }
            >
              <div className="sidebarNavIcon">
                <MdDashboard />
              </div>
              <div className="sidebarNavText">Dashboard</div>
            </div>
          </NavLink>
          {/* PAYMENTS */}
          <NavLink to="/payments">
            <div
              className={
                props.page === "payments" ? "sidebarNav active" : "sidebarNav"
              }
            >
              <div className="sidebarNavIcon">
                <MdReceipt />
              </div>
              <div className="sidebarNavText">payments</div>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
