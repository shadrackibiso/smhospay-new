import React, { useState } from "react";
import "../css/home.css";
import { FaHandHoldingUsd } from "react-icons/fa";
import numeral from "numeral";
import moment from "moment";
import empty from "../images/empty.svg";
import { ClassicSpinner } from "react-spinners-kit";
import { Link } from "react-router-dom";
import PaymentPanel from "./PaymentPanel";

function RecentPayments(props) {
  const [displayPaymentPanel, setDisplayPaymentPanel] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const showPayment = (props) => {
    setSelectedPayment(props);
    setDisplayPaymentPanel(true);
  };

  return (
    <>
      <div className="row justify-content-between no-gutters align-items-center">
        <h5 className="font-weight-bold panelTitle">Recent Payments</h5>
        {/* LOADER */}
        <div
          className="loaderContainer mt-5"
          style={{
            display: props.givings && "none",
          }}
        >
          {
            <ClassicSpinner
              size={30}
              color="#dddddd"
              loading={!props.givings}
            />
          }
        </div>
      </div>
      {/* PaymentS CONTENT */}
      <div
        style={{
          display: !props.givings && "none",
        }}
      >
        {/* RECENT PaymentS DESKTOP */}
        <div
          className={
            props.givings && props.givings.length > 0
              ? "d-none d-md-block transHistoryContainer mt-md-4"
              : "d-none"
          }
        >
          {props.givings &&
            props.givings
              .sort((a, b) => (a.date > b.date ? -1 : 1))
              .slice(0, 4)
              .map((giving) => (
                <div
                  className="transHistoryCard d-flex align-items-center"
                  key={giving.id}
                  onClick={() =>
                    showPayment({
                      ...giving,
                      date: giving.date.toDate(),
                    })
                  }
                >
                  <div className="col-2 col-md-1 mr-md-4 p-0">
                    <div
                      className={
                        (giving.type === "tithe" &&
                          "transHistoryCardIcon titheIcon") ||
                        (giving.type === "offering" &&
                          "transHistoryCardIcon offeringIcon") ||
                        (giving.type !== ("tithe" && "offering") &&
                          "transHistoryCardIcon seedIcon")
                      }
                    >
                      <FaHandHoldingUsd />
                    </div>
                  </div>
                  <div className="col-7 col-md-6 p-0">
                    <div className="transHistoryAmount">
                      ₦{numeral(giving.amount).format("0,0")}
                    </div>
                    <div className="transHistoryText">
                      {moment(giving.date.toDate()).format("LL")}
                    </div>
                  </div>
                  <div className="col-3 col-md-4 p-0 text-right transHistoryText">
                    {giving.type}
                  </div>
                </div>
              ))}
        </div>
        {/* RECENT PAYMENTS MOBILE */}
        <div
          className={
            props.givings && props.givings.length > 0
              ? "d-block d-md-none transHistoryContainer mt-2"
              : "d-none"
          }
        >
          {props.givings &&
            props.givings
              .sort((a, b) => (a.date > b.date ? -1 : 1))
              .slice(0, 7)
              .map((giving) => (
                <Link
                  to={{
                    pathname: `/Payment/${giving.id}`,
                    state: {
                      ...giving,
                      date: giving.date.toDate(),
                      accountType: props.accountType.toLowerCase(),
                    },
                  }}
                  key={giving.id}
                  className="rowLink transHistoryCard d-flex align-items-center"
                >
                  <div className="col-2 col-md-1 mr-md-4 p-0">
                    <div
                      className={
                        (giving.type === "tithe" &&
                          "transHistoryCardIcon titheIcon") ||
                        (giving.type === "offering" &&
                          "transHistoryCardIcon offeringIcon") ||
                        (giving.type !== ("tithe" && "offering") &&
                          "transHistoryCardIcon seedIcon")
                      }
                    >
                      <FaHandHoldingUsd />
                    </div>
                  </div>
                  <div className="col-7 col-md-6 p-0">
                    <div className="transHistoryAmount">
                      ₦{numeral(giving.amount).format("0,0")}
                    </div>
                    <div className="transHistoryText">
                      {moment(giving.date.toDate()).format("LL")}
                    </div>
                  </div>
                  <div className="col-3 col-md-4 p-0 text-right transHistoryText">
                    {giving.type}
                  </div>
                </Link>
              ))}
        </div>
        {/* empty illustration */}
        <div
          className="flex-column align-items-center justify-content-center mt-4"
          style={{
            display:
              props.givings && props.givings.length > 0 ? "none" : "flex",
          }}
        >
          <img src={empty} alt="no payments" width="70%" />
          <span className="mt-3">
            <i>no Payments yet</i>
          </span>
        </div>
      </div>
      <PaymentPanel
        selectedPayment={selectedPayment}
        openPanel={displayPaymentPanel}
        closePanel={() => setDisplayPaymentPanel(false)}
        state={{
          accountType: props.accountType && props.accountType.toLowerCase(),
        }}
      />
    </>
  );
}

export default RecentPayments;
