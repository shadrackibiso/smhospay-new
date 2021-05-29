import React from "react";
import "../css/home.css";
import Header from "../components/Header";
import { FaHandHoldingUsd } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PayModal from "../components/PayModal";
import PayForm from "../components/PayForm";
// import {NavLink, Redirect} from 'react-router-dom'
import numeral from "numeral";
import PaymentStats from "../components/PaymentStats";
import RecentTransactions from "../components/RecentTransactions";

function Dashboard(props) {
  return (
    <>
      <div className="pageContainer">
        {/* SIDEBAR */}
        <Sidebar page="home" />
        {/* MAIN CONTENT */}
        <div className="contentWrap">
          {/* HEADER */}
          <Header {...props} title="Dashboard" />
          {/* CONTENT BODY */}
          <div className="fullHeight">
            <div className="container px-0">
              {/* PAYMENT STATS */}
              <PaymentStats {...props} />
              {/* ====== */}
              <div className="mt-5 mt-md-5">
                <div className="row">
                  {/* QUICK PAYMENT */}
                  <div className="col-lg-6 d-none d-md-block">
                    <div className="row justify-content-between no-gutters align-items-center">
                      <h5 className="font-weight-bold title">Pay/Give</h5>
                    </div>
                    <div className="payFormContainer mt-4 ">
                      <PayForm {...props} />
                    </div>
                  </div>
                  {/* RECENT TRANSACTIONS */}
                  <div className="col-lg-6 pb-3 pb-md-0">
                    <RecentTransactions {...props} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MOBILE NAV */}
        <Navbar page="home" />
      </div>

      {/* PAY MODAL */}
      <PayModal displayModal={false} />
    </>
  );
}

export default Dashboard;
