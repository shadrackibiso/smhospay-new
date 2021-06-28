import React from "react";
import { NavLink } from "react-router-dom";
import { MdReceipt, MdHome, MdAddCircle } from "react-icons/md";

function MobileNav(props) {
  return (
    <div className="navbar py-2 d-md-none">
      {/* ====== */}
      <NavLink to="/">
        <div className={props.page === "home" ? "navBtn active" : "navBtn"}>
          <div className="navBtnIcon">
            <MdHome />
          </div>
          <div className="mobileNavLabel">Home</div>
        </div>
      </NavLink>
      {/* ====== */}
      <NavLink to="/pay">
        <div className={props.page === "pay" ? "navBtn active" : "navBtn"}>
          <div className="navBtnIcon payBtn">
            <MdAddCircle />
          </div>
          <div className="mobileNavLabel">Pay/Give</div>
        </div>
      </NavLink>
      {/* ====== */}
      <NavLink to="/payments">
        <div className={props.page === "payments" ? "navBtn active" : "navBtn"}>
          <div className="navBtnIcon">
            <MdReceipt />
          </div>
          <div className="mobileNavLabel">Payments</div>
        </div>
      </NavLink>
      {/* ====== */}
    </div>
  );
}

export default MobileNav;
