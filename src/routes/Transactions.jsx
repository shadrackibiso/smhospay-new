import React from "react";
import "../css/home.css";
import Header from "../components/Header";
import empty from "../images/empty.svg";
import { FaHandHoldingUsd } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PayModal from "../components/PayModal";
import moment from "moment";
import numeral from "numeral";

function Transactions(props) {
  return (
    <>
      <div className="pageContainer">
        {/* SIDEBAR */}
        <Sidebar page="transactions" />
        {/* MAIN CONTENT */}
        <div className="contentWrap">
          {/* HEADER */}
          <Header title={"Transactions"} {...props} />
          {/* CONTENT BODY */}
          <div className="fullHeight">
            <div className="container px-0">
              <div className="row">
                {/* RECENT TRANSACTIONS DESKTOP */}
                <div className="col-12">
                  <div
                    className="transHistoryContainer d-none d-md-block"
                    style={{
                      display: props.givings.length === 0 && "none",
                    }}
                  >
                    {/* TRANSACTION TABLE HEAD */}
                    <div className="transHistoryCard d-flex align-items-center">
                      <div className="col-md-1 p-0">
                        {/* <div className="transHistoryCardIcon totalIcon">
                          <FaHandHoldingUsd />
                        </div> */}
                      </div>
                      <div className="col-md-3 p-0">Amount</div>
                      <div className="col-md-2 p-0">Payment Type</div>
                      <div className="col-md-3 p-0">Date</div>
                      <div className="col-md-3 p-0">Note</div>
                    </div>
                    {/* TRANSACTIONS LOOP */}
                    {props.givings
                      .sort((a, b) => (a.date > b.date ? -1 : 1))
                      .map((giving) => (
                        <div
                          className="transHistoryCard d-flex align-items-center"
                          key={giving.id}
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
                          <div className="col-md-3 p-0 transHistoryText-n">
                            lorem ipsum
                          </div>
                        </div>
                      ))}
                  </div>
                  {/* empty illustration */}
                  <div
                    className="flex-column align-items-center justify-content-center"
                    style={{
                      display: props.givings.length > 0 ? "none" : "flex",
                    }}
                  >
                    <img src={empty} width="40%" />
                    <span className="mt-3">
                      <i>no transactions yet</i>
                    </span>
                  </div>
                </div>
                {/* TRANSACTION MOBILE */}
                <div className="col-12">
                  <div className="transHistoryContainer d-md-none">
                    {props.givings
                      .sort((a, b) => (a.date > b.date ? -1 : 1))
                      .map((giving) => (
                        <div
                          className="transHistoryCard d-flex align-items-center"
                          key={giving.id}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NAVBAR */}
        <Navbar page="transactions" />
      </div>

      {/* PAY MODAL */}
      <PayModal displayModal={false} />
    </>
  );
}

export default Transactions;
