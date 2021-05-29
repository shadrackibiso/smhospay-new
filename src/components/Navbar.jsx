import React from "react";
import {NavLink} from 'react-router-dom'
import { AiOutlineHome, AiFillPlusCircle, AiOutlineHistory } from 'react-icons/ai'

function Navbar(props) {
  return (
    <div className="navbar py-2 d-md-none">
        {/* ====== */}
        <NavLink to="/">
            <div className={props.page==='home' ? 'navBtn active' : 'navBtn'}>
                <div className="navBtnIcon">
                    <AiOutlineHome/>
                </div>
                <div className="navBtnText">
                    home
                </div>
            </div>
        </NavLink>
        {/* ====== */}
        <NavLink to="/pay">
            <div className={props.page==='pay' ?'navBtn active' : 'navBtn'}>
                <div className="navBtnIcon payBtn">
                    <AiFillPlusCircle/>
                </div>
                <div className="navBtnText">
                    give/pay
                </div>
            </div>
        </NavLink>
        {/* ====== */}
        <NavLink to="/transactions">
            <div className={props.page==='transactions' ? 'navBtn active' : 'navBtn'}>
                <div className="navBtnIcon">
                    <AiOutlineHistory/>
                </div>
                <div className="navBtnText">
                    transactions
                </div>
            </div>
        </NavLink>
        {/* ====== */}
    </div>
  );
}

export default Navbar;
