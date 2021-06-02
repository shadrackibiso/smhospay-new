import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiFillPlusCircle,
  AiOutlineHistory,
} from "react-icons/ai";

function MobileNav(props) {
  return (
    <div className="navbar py-2 d-md-none">
      {/* ====== */}
      <NavLink to="/">
        <div className={props.page === "home" ? "navBtn active" : "navBtn"}>
          <div className="navBtnIcon">
            <AiOutlineHome />
          </div>
        </div>
      </NavLink>
      {/* ====== */}
      <NavLink to="/pay">
        <div className={props.page === "pay" ? "navBtn active" : "navBtn"}>
          <div className="navBtnIcon payBtn">
            <AiFillPlusCircle />
          </div>
        </div>
      </NavLink>
      {/* ====== */}
      <NavLink to="/payments">
        <div className={props.page === "payments" ? "navBtn active" : "navBtn"}>
          <div className="navBtnIcon">
            <AiOutlineHistory />
          </div>
        </div>
      </NavLink>
      {/* ====== */}
    </div>
  );
}

export default MobileNav;
