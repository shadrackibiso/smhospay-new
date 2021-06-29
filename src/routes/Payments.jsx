import React, { useState } from "react";
import "../css/home.css";
import Header from "../components/Header";
import PaymentsFilter from "../components/PaymentsFilter";
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
  const [paymentType, setPaymentType] = useState("all");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [givings, setGivings] = useState(props.givings);

  const handleFilter = () => {
    let givings = props.givings.filter((giving) => {
      // filter all payments without date range
      if (paymentType.toLowerCase() === "all" && !startDate) {
        return giving;
      }
      // filter all payments with date range
      if (paymentType.toLowerCase() === "all" && startDate) {
        return (
          moment(giving.date.toDate()).format("L") >=
            moment(startDate).format("L") &&
          moment(giving.date.toDate()).format("L") <=
            moment(endDate).format("L")
        );
      }
      // filter selected payment type without date range
      if (paymentType.toLowerCase() !== "all" && !startDate) {
        return giving.type.toLowerCase() === paymentType.toLowerCase();
      }
      // filter selected payment type with date range
      if (paymentType.toLowerCase() !== "all" && startDate) {
        return (
          giving.type.toLowerCase() === paymentType.toLowerCase() &&
          moment(giving.date.toDate()).format("L") >=
            moment(startDate).format("L") &&
          moment(giving.date.toDate()).format("L") <=
            moment(endDate).format("L")
        );
      }
    });

    setGivings(givings);
    // console.log(givings, paymentType);
    // console.log(moment(givings[0].date.toDate()).format("L"));
    // console.log(moment(startDate).format("L"));
  };

  const showPayment = (props) => {
    setSelectedPayment(props);
    setDisplayPaymentPanel(true);
  };

  return (
    <>
      <div className="pageContainer">
        {/* SIDEBAR */}
        <Sidebar page="payments" {...props} />
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
          {/* FILTER */}
          <PaymentsFilter
            setPaymentType={setPaymentType}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            handleFilter={handleFilter}
            totalPayments={givings && givings.length}
          />
          {/* CONTENT BODY */}
          <div className="fullHeight-f">
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
                    display:
                      props.givings && props.givings.length === 0 && "none",
                  }}
                >
                  <div className="transHistoryContainer d-none d-md-block">
                    {/* Payment TABLE HEAD */}
                    <div className="transHistoryCard transHistoryHeader d-flex align-items-center">
                      {/* <div className="col-md-1 p-0">
                        <div className="transHistoryCardIcon totalIcon">
                          <FaHandHoldingUsd />
                        </div>
                      </div> */}
                      <div className="col-md-3 p-0">Amount</div>
                      <div
                        className="col-md-3 p-0"
                        style={{
                          display:
                            props.accountType &&
                            props.accountType.toLowerCase() === "admin"
                              ? "block"
                              : "none",
                        }}
                      >
                        User
                      </div>
                      <div className="col-md-3 p-0">Payment Type</div>
                      <div className="col-md-3 p-0">Paid On</div>
                      <div
                        className="col-md-3 p-0"
                        style={{
                          display:
                            props.accountType &&
                            props.accountType.toLowerCase() !== "admin"
                              ? "block"
                              : "none",
                        }}
                      >
                        Note
                      </div>
                    </div>
                    {/* PaymentS LOOP */}
                    {givings &&
                      givings
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
                            {/* <div className="col-2 col-md-1 p-0">
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
                            </div> */}
                            {/* Amount */}
                            <div className="col-7 col-md-3 p-0">
                              <div className="transHistoryAmount transHistoryText-n">
                                ₦{numeral(giving.amount).format("0,0")}
                              </div>
                            </div>
                            {/* User */}
                            <div
                              className="col-md-3 p-0 transHistoryText-n"
                              style={{
                                display:
                                  props.accountType &&
                                  props.accountType.toLowerCase() === "admin"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              {giving.givenBy}
                            </div>
                            {/* Payment Type */}
                            <div className="col-md-3 p-0 transHistoryText-n text-capitalize">
                              {giving.type}
                            </div>
                            {/* Note */}
                            <div
                              className="col-md-3 p-0 transHistoryText-n"
                              style={{
                                display:
                                  props.accountType &&
                                  props.accountType.toLowerCase() !== "admin"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              {giving.note ? giving.note : "-"}
                            </div>
                            {/* Date */}
                            <div className="col-md-3 p-0 transHistoryText-n">
                              {moment(giving.date.toDate()).format("LLL")}
                            </div>
                            {/*  */}
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
                    {givings &&
                      givings
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
          <MobileNav page="payments" />
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
