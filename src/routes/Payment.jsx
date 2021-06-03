import React from "react";
import "../css/home.css";
import Header from "../components/HeaderInner";
import { FaHandHoldingUsd } from "react-icons/fa";
import moment from "moment";
import numeral from "numeral";
import { CircleSpinner } from "react-spinners-kit";
import { ClassicSpinner } from "react-spinners-kit";

function Transaction(props) {
  const giving = props.location.state;

  return (
    <>
      <div className="pageContainer animate__animated animate__slideInRight">
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
          <Header title="payment" />
          {/* CONTENT BODY */}
          <div className="fullHeight">
            <div className="container px-0">
              {/* LOADER */}
              <div
                className="loaderContainer mt-5"
                style={{
                  display: giving && "none",
                }}
              >
                {<ClassicSpinner size={30} color="#dddddd" loading={!giving} />}
              </div>
              {/* TRANSACTION DETAILS */}
              <div
                className=""
                style={{
                  display: !giving && "none",
                }}
              >
                <div className="panel d-flex flex-column align-items-center justify-content-center py-4">
                  {/* payment Icon */}
                  <div
                    className={
                      (giving.type === "tithe" &&
                        "transHistoryCardIcon transHistoryPageCardIcon titheIcon") ||
                      (giving.type === "offering" &&
                        "transHistoryCardIcon transHistoryPageCardIcon offeringIcon") ||
                      (giving.type !== ("tithe" && "offering") &&
                        "transHistoryCardIcon transHistoryPageCardIcon seedIcon")
                    }
                  >
                    <FaHandHoldingUsd />
                  </div>
                  {/* Amount */}
                  <div className="transHistoryAmount thpAmount mt-2">
                    ₦{numeral(giving.amount).format("0,0")}
                  </div>
                  {/* payment type */}
                  <div className="transHistoryText thpText">{giving.type}</div>
                </div>
                {/* == section == */}
                <div className="panel mt-3 p-3">
                  {/* payment date */}
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="transHistoryText thpText">Paid On</div>
                    <div className="transHistoryText thpText">
                      {moment(giving.date).format("LLL")}
                    </div>
                  </div>
                  {/* tithe number */}
                  <div
                    style={{
                      display: props.accountType === "admin" ? "block" : "none",
                    }}
                  >
                    {/* divider */}
                    <hr />
                    {/* -- */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="transHistoryText thpText">
                        Tithe Number
                      </div>
                      <div className="transHistoryText thpText">
                        {giving && giving.titheNumber}
                      </div>
                    </div>
                  </div>
                  {/* divider */}
                  <hr />
                  {/* payment reference */}
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="transHistoryText thpText">Reference</div>
                    <div className="transHistoryText thpText">{giving.id}</div>
                  </div>
                </div>
                {/* == section == */}
                <div
                  className="panel mt-3 p-3"
                  style={{
                    display: props.accountType !== "admin" ? "block" : "none",
                  }}
                >
                  <div className="transHistoryText thpText">Note</div>
                  {/* divider */}
                  <hr />
                  {/* payment note */}
                  <div className="transHistoryText thpText">
                    {giving.note ? giving.note : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
