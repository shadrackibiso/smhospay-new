import React from "react";
import Header from "./HeaderInner";
import { FaHandHoldingUsd } from "react-icons/fa";
import moment from "moment";
import numeral from "numeral";

function PaymentPanel(props) {
  const giving = props.selectedPayment;

  return (
    <div
      className="tPanelContainer"
      style={{ display: props.openPanel && "block" }}
    >
      {/* panel backdrop */}
      <div
        className="tPanelBlind animate__animated animate__fadeIn"
        onClick={() => props.closePanel()}
      ></div>
      {/* panel content */}
      <div className="tPanelContent animate__animated animate__slideInRight">
        {/* MAIN CONTENT */}
        <div className="contentWrap">
          {/* HEADER */}
          <Header title="Payment Details" close={() => props.closePanel()} />
          {/* CONTENT BODY */}
          <div className="fullHeight py-4">
            <div className="container px-4">
              {/* PAYMENT DETAILS */}
              <div>
                <div className="panel d-flex flex-column align-items-center justify-content-center py-4">
                  {/* payment Icon */}
                  <div
                    className={
                      (giving &&
                        giving.type === "tithe" &&
                        "transHistoryCardIcon transHistoryPageCardIcon titheIcon") ||
                      (giving &&
                        giving.type === "offering" &&
                        "transHistoryCardIcon transHistoryPageCardIcon offeringIcon") ||
                      (giving &&
                        giving.type !== ("tithe" && "offering") &&
                        "transHistoryCardIcon transHistoryPageCardIcon seedIcon")
                    }
                  >
                    <FaHandHoldingUsd />
                  </div>
                  {/* Amount */}
                  <div className="transHistoryAmount thpAmount mt-2">
                    ₦{numeral(giving && giving.amount).format("0,0")}
                  </div>
                  {/* payment type */}
                  <div className="transHistoryText thpText">
                    {giving && giving.type}
                  </div>
                </div>
                {/* == section === */}
                <div className="panel mt-3 p-3">
                  {/* payment date */}
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="transHistoryText thpText">Paid On</div>
                    <div className="transHistoryText thpText">
                      {giving && moment(giving.date).format("LLL")}
                    </div>
                  </div>
                  {/* User Email */}
                  <div
                    style={{
                      display:
                        props.state.accountType === "admin" ? "block" : "none",
                    }}
                  >
                    {/* divider */}
                    <hr />
                    {/* -- */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="transHistoryText thpText">User Email</div>
                      <div className="transHistoryText thpText thpGivingEmail">
                        {giving && giving.givenBy.email}
                      </div>
                    </div>
                  </div>
                  {/* User Name */}
                  <div
                    style={{
                      display:
                        props.state.accountType === "admin" ? "block" : "none",
                    }}
                  >
                    {/* divider */}
                    <hr />
                    {/* -- */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="transHistoryText thpText">Full Name</div>
                      <div className="transHistoryText thpText">
                        {giving && giving.givenBy.fullName}
                      </div>
                    </div>
                  </div>
                  {/* tithe number */}
                  <div
                    style={{
                      display:
                        props.state.accountType === "admin" ? "block" : "none",
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
                        {giving && giving.titheNumber
                          ? giving.titheNumber
                          : "-"}
                      </div>
                    </div>
                  </div>
                  {/* divider */}
                  <hr />
                  {/* payment reference */}
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="transHistoryText thpText">Reference</div>
                    <div className="transHistoryText thpText">
                      {giving && giving.id}
                    </div>
                  </div>
                </div>
                {/* == section == */}
                <div
                  className="panel mt-3 p-3"
                  style={{
                    display:
                      props.state.accountType !== "admin" ? "block" : "none",
                  }}
                >
                  <div className="transHistoryText thpText">Note</div>
                  {/* divider */}
                  <hr />
                  {/* payment note */}
                  <div className="transHistoryText thpText thpNoteText">
                    {giving && giving.note ? giving.note : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPanel;
