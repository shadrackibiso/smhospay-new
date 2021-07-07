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
  const [paymentReference, setPaymentReference] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filtered, setFiltered] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [givings, setGivings] = useState();
  const [displayedPayments, setDisplayedPayments] = useState();
  const [sliceEnd, setSliceEnd] = useState(20);
  let paymentsPerPage = 20;

  const showMorePayments = () => {
    setSliceEnd(sliceEnd + paymentsPerPage);
    setDisplayedPayments(givings.slice(0, sliceEnd + paymentsPerPage));
  };

  const checkGivings = () => {
    setGivings(props.givings);
    setDisplayedPayments(props.givings.slice(0, paymentsPerPage));
    setExecuted(true);
  };

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
    setDisplayedPayments(givings.slice(0, paymentsPerPage));
    setSliceEnd(paymentsPerPage);
    setFiltered(true);
  };

  const resetFilter = () => {
    setPaymentType("all");
    setStartDate();
    setEndDate();

    setGivings(props.givings);
    setDisplayedPayments(props.givings.slice(0, paymentsPerPage));
    setSliceEnd(paymentsPerPage);
    setFiltered(false);
  };

  const showPayment = (props) => {
    setSelectedPayment(props);
    setDisplayPaymentPanel(true);
  };

  return (
    <>
      {/* check givings once on page load */}
      {!props.loading && props.givings && !executed && checkGivings()}
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
            paymentType={paymentType}
            setPaymentType={setPaymentType}
            paymentReference={paymentReference}
            setPaymentReference={setPaymentReference}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            handleFilter={handleFilter}
            resetFilter={resetFilter}
            filtered={filtered}
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
                      <div className="col-md-2 p-0">Amount</div>
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
                      <div className="col-md-2 p-0">Reference</div>
                      <div className="col-md-2 p-0">Payment Type</div>
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
                      <div className="col-md-3 p-0">Paid On</div>
                    </div>
                    {/* PaymentS LOOP */}
                    {givings &&
                      givings
                        .filter((giving) =>
                          giving.id
                            .toString()
                            .includes(paymentReference.toString())
                        )
                        .sort((a, b) => (a.date > b.date ? -1 : 1))
                        .slice(0, sliceEnd)
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
                            {/* Amount */}
                            <div className="col-7 col-md-2 p-0">
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
                              {giving.givenBy.fullName}
                            </div>
                            {/* Reference */}
                            <div className="col-md-2 p-0 transHistoryText-n">
                              {giving.id}
                            </div>
                            {/* Payment Type */}
                            <div className="col-md-2 p-0 transHistoryText-n text-capitalize">
                              <span className="paymentType">{giving.type}</span>
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
                        .filter((giving) =>
                          giving.id
                            .toString()
                            .includes(paymentReference.toString())
                        )
                        .sort((a, b) => (a.date > b.date ? -1 : 1))
                        .slice(0, sliceEnd)
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
                {/* load more button */}
                <div
                  className="align-items-center justify-content-center mt-5 hide w-100"
                  style={{
                    display:
                      displayedPayments &&
                      givings &&
                      displayedPayments.length !== givings.length &&
                      "flex",
                  }}
                >
                  <button
                    className="subBtn py-2 px-3"
                    onClick={showMorePayments}
                  >
                    Load More
                  </button>
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
