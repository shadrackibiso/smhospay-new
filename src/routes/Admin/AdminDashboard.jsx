import React from "react";
import "../../css/home.css";
import Header from "../../components/Header"
import empty from "../../images/empty.svg"
import { FaHandHoldingUsd } from 'react-icons/fa'
import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import PayModal from "../../components/PayModal"
import PayForm from "../../components/PayForm"
import {NavLink} from 'react-router-dom'
import moment from "moment";
import numeral from 'numeral'
import Icon from "../../images/icon.png"

function AdminDashboard(props) {
  return (
    <>
      <div className="pageContainer">
        <div className="row no-gutters">
        
          {/* SIDEBAR */}
          <Sidebar page='home' />

          {/* MAIN CONTENT */}
          <div className="col-lg-10 pageContent">
            <div className="container py-4 px-3 px-md-5">

              {/* GREETINGS */}
              Admin
              <Header {...props} />

              {/* GIVING STATS */}
              <div className="row justify-content-between align-items-stretch mt-4 mt-md-5 mx-0 mx-md-0 statsCardContainer">
                {/* ====== */}
                {/* <div className="col-lg-3 mb-1 mb-md-0 p-0 px-md-2 pr-md-4">
                    <div className="statsCard text-center text-md-left">
                      <h4 className="statsCardHeading">₦{numeral(props.totalGivings).format('0,0')}</h4>
                      <div className="statsCardLabel">total Payments</div>
                    </div>
                </div> */}
                {/* ====== */}
                <div className="col-lg-3 col-4 pr-0 pr-1 pr-md-4 p-0 px-md-2">
                  <div className="statsCard titheStatsCard text-center text-md-left">
                    <div className="row no-gutters">
                      <div className="col-lg-4 d-none d-md-block">
                        <div className="transHistoryCardIcon">
                        <img src={Icon} width="100%" className="" />
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <h4 className="statsCardHeading statsCarHeadingSmall">₦{numeral(props.totalGivings).format('0,0')}</h4>
                        <div className="statsCardLabel">total Payments</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ====== */}
                <div className="col-lg-3 col-4 pr-0 pr-1 pr-md-4 p-0 px-md-2">
                  <div className="statsCard titheStatsCard text-center text-md-left">
                    <div className="row no-gutters">
                      <div className="col-lg-4 d-none d-md-block">
                        <div className="transHistoryCardIcon titheIcon">
                          <FaHandHoldingUsd/>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <h4 className="statsCardHeading statsCarHeadingSmall">₦{numeral(props.totalTithes).format('0,0')}</h4>
                        <div className="statsCardLabel">tithes</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ====== */}
                <div className="col-lg-3 col-4 px-0 pr-1 pr-md-4 p-0 px-md-2">
                  <div className="statsCard offeringStatsCard text-center text-md-left">
                    <div className="row no-gutters">
                      <div className="col-lg-4 d-none d-md-block">
                        <div className="transHistoryCardIcon offeringIcon">
                          <FaHandHoldingUsd/>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <h4 className="statsCardHeading statsCarHeadingSmall">₦{numeral(props.totalOfferings).format('0,0')}</h4>
                        <div className="statsCardLabel">offerings</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ====== */}
                <div className="col-lg-3 col-4 pl-0 p-0 px-md-2">
                  <div className="statsCard othersStatsCard text-center text-md-left">
                    <div className="row no-gutters">
                      <div className="col-lg-4 d-none d-md-block">
                        <div className="transHistoryCardIcon seedIcon">
                          <FaHandHoldingUsd/>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <h4 className="statsCardHeading statsCarHeadingSmall">₦{numeral(props.totalOthers).format('0,0')}</h4>
                        <div className="statsCardLabel">others</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ====== */}
              <div className="mt-4 mt-md-5">
                <div className="row">

                  {/* QUICK PAYMENT */}
                  <div className="col-lg-6 d-none d-md-block">
                    <div className="row justify-content-between no-gutters align-items-center">
                      <h5 className="font-weight-bold title">Pay/Give</h5>
                    </div>
                    <div className="payFormContainer mt-4 ">
                      <PayForm {...props} />
                    </div>
                  </div>

                  {/* RECENT TRANSACTIONS */}
                  <div className="col-lg-6 pb-3 pb-md-0">
                    <div className="row justify-content-between no-gutters align-items-center">
                      <h5 className="font-weight-bold title">Recent Transactions</h5>
                      <NavLink to="/transactions">
                        <button className="mainBtn" style={{display: props.givings.length === 0 && 'none'}}>view all</button>
                      </NavLink>
                    </div>
                    <div className="transHistoryContainer mt-4 mt-md-4">
                      {props.givings.sort((a, b) => a.date > b.date ? -1 : 1).slice(0,4).map((giving) => (
                        <div className="transHistoryCard d-flex align-items-center" key={giving.id}>
                          <div className="col-2 col-md-2 p-0">
                            <div className={giving.type === 'tithe' && "transHistoryCardIcon titheIcon" || giving.type === 'offering' && "transHistoryCardIcon offeringIcon" || giving.type !== ('tithe' && 'offering') && "transHistoryCardIcon seedIcon"   } >
                              <FaHandHoldingUsd/>
                            </div>
                          </div>
                          <div className="col-7 col-md-6 p-0">
                            <div className="transHistoryCardLabel">{giving.type}</div>
                            <div className="transHistoryText">{moment(giving.date.toDate()).format("LL")}</div>
                          </div>
                          <div className="col-3 col-md-4 p-0 text-right transHistoryAmount">₦{numeral(giving.amount).format('0,0')}</div>
                        </div>
                      ))}
                    </div>
                    {/* empty illustration */}
                    <div className="flex-column align-items-center justify-content-center" style={{display: props.givings.length > 0 ? 'none' : 'flex'}}>
                      <img src={empty} width="70%" />
                      <span className="mt-3"><i>no transactions yet</i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NAVBAR */}
        <Navbar page='home' />


        </div>
      </div>

      {/* PAY MODAL */}
      <PayModal displayModal={false} />
    </>
  );
}

export default AdminDashboard;
