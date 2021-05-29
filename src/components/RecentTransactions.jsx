import React from "react";
import "../css/home.css";
import { FaHandHoldingUsd } from "react-icons/fa";
import numeral from "numeral";
import moment from "moment";
import empty from "../images/empty.svg";

function RecentTransactions(props) {
  return (
    <>
      <div className="row justify-content-between no-gutters align-items-center">
        <h5 className="font-weight-bold title">Recent Transactions</h5>
      </div>
      <div className="transHistoryContainer mt-4 mt-md-4">
        {props.givings
          .sort((a, b) => (a.date > b.date ? -1 : 1))
          .slice(0, 4)
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
      {/* empty illustration */}
      <div
        className="flex-column align-items-center justify-content-center"
        style={{ display: props.givings.length > 0 ? "none" : "flex" }}
      >
        <img src={empty} width="70%" />
        <span className="mt-3">
          <i>no transactions yet</i>
        </span>
      </div>
    </>
  );
}

export default RecentTransactions;
