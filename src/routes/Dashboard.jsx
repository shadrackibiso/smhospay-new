import React from "react";
import "../css/home.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import PayForm from "../components/PayForm";
import PaymentStats from "../components/PaymentStats";
import RecentPayments from "../components/RecentPayments";
import { CircleSpinner } from "react-spinners-kit";
import { Redirect } from "react-router-dom";

function Dashboard(props) {
  return props.accountType && props.accountType.toLowerCase() === "admin" ? (
    <Redirect to="/adminDashboard" />
  ) : (
    <>
      <div className="pageContainer">
        {/* SIDEBAR */}
        <Sidebar page="home" {...props} />
        {/* LOADER */}
        <div
          className="loaderContainer contentWrap"
          style={{
            display: !props.loading && "none",
          }}
        >
          {<CircleSpinner size={30} color="#007cb7" loading={props.loading} />}
        </div>
        {/* MAIN CONTENT */}
        <div
          className="contentWrap"
          style={{
            display: props.loading && "none",
          }}
        >
          {/* HEADER */}
          <Header {...props} title={`Hello, ${props.firstName}`} />
          {/* CONTENT BODY */}
          <div className="fullHeight">
            <div className="container px-0">
              {/* PAYMENT STATS */}
              <PaymentStats {...props} />
              {/* ====== */}
              <div className="mt-4 mt-md-5">
                <div className="row">
                  {/* QUICK PAYMENT */}
                  <div className="col-lg-6 d-none d-md-block">
                    <div className="row justify-content-between no-gutters align-items-center">
                      <h5 className="font-weight-bold panelTitle">Pay/Give</h5>
                    </div>
                    <div className="payFormContainer mt-4 ">
                      <PayForm {...props} />
                    </div>
                  </div>
                  {/* RECENT PAYMENTS */}
                  <div className="col-lg-6 pb-3 pb-md-0">
                    <RecentPayments {...props} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* MOBILE NAV */}
          <MobileNav page="home" />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
