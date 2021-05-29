import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import logo from "../images/logo.svg";

function Sidebar(props) {
  //   const [redirect, setRedirect] = useState(false);

  return (
    <div className="sidebar d-none d-lg-block">
      <div className="sidebarHeader">
        <img src={logo} width="150px" />
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
              <AiOutlineHome />
            </div>
            <div className="sidebarNavText">home</div>
          </div>
        </NavLink>
        {/* TRANSACTIONS */}
        <NavLink to="/transactions">
          <div
            className={
              props.page === "transactions" ? "sidebarNav active" : "sidebarNav"
            }
          >
            <div className="sidebarNavIcon">
              <AiOutlineHistory />
            </div>
            <div className="sidebarNavText">transactions</div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
