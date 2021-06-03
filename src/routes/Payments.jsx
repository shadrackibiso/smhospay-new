import React, { useState } from "react";
import "../css/home.css";
import Header from "../components/Header";
import empty from "../images/empty.svg";
import { FaHandHoldingUsd } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import moment from "moment";
import numeral from "numeral";
import { CircleSpinner } from "react-spinners-kit";
import { ClassicSpinner } from "react-spinners-kit";
import { Link } from "react-router-dom";
import PaymentPanel from "../components/PaymentPanel";

function Payments(props) {
  const [displayPaymentPanel, setDisplayPaymentPanel] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const showPayment = (props) => {
    setSelectedPayment(props);
    setDisplayPaymentPanel(true);
  };

  return (
    <>
      <div className="pageContainer">
        {/* SIDEBAR */}
        <Sidebar page="payments" />
        {/* PAGE LOADER */}
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
          <Header title={"Payment History"} {...props} />
          {/* CONTENT BODY */}
          <div className="fullHeight">
            <div className="container px-0">
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
              <div
                className="row"
                style={{
                  display: !props.givings && "none",
                }}
              >
                {/* RECENT PaymentS DESKTOP */}
                <div
                  className="col-12"
                  style={{
                    display: !props.givings && "none",
                  }}
                >
                  <div className="transHistoryContainer d-none d-md-block">
                    {/* Payment TABLE HEAD */}
                    <div className="transHistoryCard transHistoryHeader d-flex align-items-center">
                      <div className="col-md-1 p-0">
                        {/* <div className="transHistoryCardIcon totalIcon">
                          <FaHandHoldingUsd />
                        </div> */}
                      </div>
                      <div className="col-md-3 p-0">Amount</div>
                      <div className="col-md-2 p-0">Payment Type</div>
                      <div className="col-md-3 p-0">Date</div>
                      <div className="col-md-3 p-0">
                        {props.accountType &&
                        props.accountType.toLowerCase() === "admin"
                          ? "Tithe Number"
                          : "Note"}
                      </div>
                    </div>
                    {/* PaymentS LOOP */}
                    {props.givings &&
                      props.givings
                        .sort((a, b) => (a.date > b.date ? -1 : 1))
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
                            <div className="col-2 col-md-1 p-0">
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
                            <div className="col-7 col-md-3 p-0">
                              <div className="transHistoryAmount">
                                ₦{numeral(giving.amount).format("0,0")}
                              </div>
                            </div>
                            <div className="col-md-2 p-0 transHistoryText-n text-capitalize">
                              {giving.type}
                            </div>
                            <div className="col-md-3 p-0 transHistoryText-n">
                              {moment(giving.date.toDate()).format("LLLL")}
                            </div>
                            <div
                              className="col-md-3 p-0 transHistoryText-n"
                              style={{
                                display:
                                  props.accountType.toLowerCase() !== "admin"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              {giving.note ? giving.note : "-"}
                            </div>
                            <div
                              className="col-md-3 p-0 transHistoryText-n"
                              style={{
                                display:
                                  props.accountType.toLowerCase() === "admin"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              {giving.titheNumber}
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
                {/* empty illustration */}
                <div
                  className="flex-column align-items-center justify-content-center mt-5"
                  style={{
                    display:
                      props.givings && props.givings.length > 0
                        ? "none"
                        : "flex",
                  }}
                >
                  <img src={empty} alt="no payments" width="40%" />
                  <span className="mt-3">
                    <i>no payments yet</i>
                  </span>
                </div>
                {/* PAYMENT MOBILE */}
                <div
                  className="col-12"
                  style={{
                    display: !props.givings && "none",
                  }}
                >
                  <div className="transHistoryContainer d-md-none">
                    {props.givings &&
                      props.givings
                        .sort((a, b) => (a.date > b.date ? -1 : 1))
                        .map((giving) => (
                          <Link
                            to={{
                              pathname: `/payment/${giving.id}`,
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
                </div>
              </div>
            </div>
          </div>
          {/* MOBILE NAV */}
          <MobileNav page="Payments" />
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

export default Payments;
