import React from "react";
import "../css/home.css";
import { FaHandHoldingUsd } from "react-icons/fa";
import numeral from "numeral";

function PaymentStats(props) {
  return (
    <>
      <div className="row justify-content-between align-items-stretch mx-0 statsCardContainer">
        {/* TOTAL PAYMENTS */}
        <div className="col-lg-3 col-12 pr-0 pr-1 pr-md-4 p-0">
          <div className="statsCard totalStatsCard text-center text-md-left">
            <div className="row no-gutters">
              <div className="col-lg-3 mr-md-2 d-none d-md-block">
                <div className="transHistoryCardIcon totalIcon">
                  <FaHandHoldingUsd />
                </div>
              </div>
              <div className="col-lg-8">
                <h4 className="statsCardHeading">
                  ₦{numeral(props.totalGivings).format("0,0")}
                </h4>
                <div className="statsCardLabel">total Payments</div>
              </div>
            </div>
          </div>
        </div>
        {/* TITHES */}
        <div className="col-lg-3 col-4 pr-0 pr-1 pr-md-4 p-0">
          <div className="statsCard titheStatsCard text-center text-md-left">
            <div className="row no-gutters">
              <div className="col-lg-3 mr-md-2 d-none d-md-block">
                <div className="transHistoryCardIcon titheIcon">
                  <FaHandHoldingUsd />
                </div>
              </div>
              <div className="col-lg-8">
                <h4 className="statsCardHeading statsCarHeadingSmall">
                  ₦{numeral(props.totalTithes).format("0,0")}
                </h4>
                <div className="statsCardLabel">tithes</div>
              </div>
            </div>
          </div>
        </div>
        {/* OFFERINGS */}
        <div className="col-lg-3 col-4 px-0 pr-1 pr-md-4 p-0">
          <div className="statsCard offeringStatsCard text-center text-md-left">
            <div className="row no-gutters">
              <div className="col-lg-3 mr-md-2 d-none d-md-block">
                <div className="transHistoryCardIcon offeringIcon">
                  <FaHandHoldingUsd />
                </div>
              </div>
              <div className="col-lg-8">
                <h4 className="statsCardHeading statsCarHeadingSmall">
                  ₦{numeral(props.totalOfferings).format("0,0")}
                </h4>
                <div className="statsCardLabel">offerings</div>
              </div>
            </div>
          </div>
        </div>
        {/* OTHERS */}
        <div className="col-lg-3 col-4 pl-0 p-0">
          <div className="statsCard othersStatsCard text-center text-md-left">
            <div className="row no-gutters">
              <div className="col-lg-3 mr-md-2 d-none d-md-block">
                <div className="transHistoryCardIcon seedIcon">
                  <FaHandHoldingUsd />
                </div>
              </div>
              <div className="col-lg-8">
                <h4 className="statsCardHeading statsCarHeadingSmall">
                  ₦{numeral(props.totalOthers).format("0,0")}
                </h4>
                <div className="statsCardLabel">others</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentStats;
