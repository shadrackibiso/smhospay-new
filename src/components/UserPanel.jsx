import React, { useState, useEffect, useRef } from "react";
import Header from "./HeaderInner";
import { BiUser } from "react-icons/bi";
import moment from "moment";
import numeral from "numeral";
import { FaHandHoldingUsd } from "react-icons/fa";

function UserPanel(props) {
  const [givings, setGivings] = useState();
  const [displayedPayments, setDisplayedPayments] = useState();
  const [sliceEnd, setSliceEnd] = useState(10);
  const [executed, setExecuted] = useState(false);
  const initialRender = useRef(true);
  let paymentsPerPage = 10;
  let user = props.selectedUser && props.selectedUser;

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      checkGivings();
    }
  }, [executed]);

  const checkGivings = () => {
    let userGivings = props.state.givings.filter(
      (giving) => giving.uid === user.uid
    );
    setGivings(userGivings);
    setDisplayedPayments(userGivings.slice(0, paymentsPerPage));
    setExecuted(true);
  };

  const showMorePayments = () => {
    setSliceEnd(sliceEnd + paymentsPerPage);
    setDisplayedPayments(givings.slice(0, sliceEnd + paymentsPerPage));
  };

  return (
    <>
      {/* check givings once on page load */}
      {user && props.state.givings && !executed && checkGivings()}
      <div
        className="tPanelContainer"
        style={{ display: props.openPanel && "block" }}
      >
        {/* panel backdrop */}
        <div
          className="tPanelBlind animate__animated animate__fadeIn"
          onClick={() => {
            props.closePanel();
            setDisplayedPayments(givings.slice(0, paymentsPerPage));
            setSliceEnd(paymentsPerPage);
            setExecuted(false);
          }}
        ></div>
        {/* panel content */}
        <div className="tPanelContent animate__animated animate__slideInRight">
          {/* MAIN CONTENT */}
          <div className="contentWrap">
            {/* HEADER */}
            <Header
              title="User Details"
              close={() => {
                props.closePanel();
                setDisplayedPayments(givings.slice(0, paymentsPerPage));
                setSliceEnd(paymentsPerPage);
                setExecuted(false);
              }}
            />
            {/* CONTENT BODY */}
            <div className="fullHeight py-4">
              <div className="container px-4">
                {/* USER DETAILS */}
                <div>
                  <div className="panel d-flex flex-column align-items-center justify-content-center py-4">
                    {/* avatar Icon */}
                    <div className="profilePic userPanelProfilePic">
                      <BiUser />
                    </div>
                    {/* Full Name */}
                    <div className="transHistoryAmount thpAmount mt-2">
                      {user && user.firstName + " " + user.lastName}
                    </div>
                    {/* email */}
                    <div className="transHistoryText thpText thpGivingEmail">
                      {user && user.email}
                    </div>
                  </div>
                  {/* == section === */}
                  <div className="panel mt-3 p-3">
                    {/* tithe number */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="transHistoryText thpText">
                        Tithe Number
                      </div>
                      <div className="transHistoryText thpText">
                        {user && user.titheNumber ? user.titheNumber : "-"}
                      </div>
                    </div>
                    {/* User registration date */}
                    <div>
                      {/* divider */}
                      <hr />
                      {/* -- */}
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="transHistoryText thpText">
                          Registration Date
                        </div>
                        <div className="transHistoryText thpText thpGivingEmail">
                          {user && moment(user.createdAt).format("LLL")}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* == payments section == */}
                  <div className="panel mt-3 p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="transHistoryText thpText">
                        Recent Payments
                      </div>
                    </div>
                    {/* divider */}
                    <hr style={{ marginBottom: 0 }} />
                    {/* empty */}
                    <div
                      className="hide thpText transHistoryText text-center mt-3"
                      style={{
                        display: givings && givings.length < 1 && "block",
                      }}
                    >
                      <i>No payment yet</i>
                    </div>
                    {givings &&
                      givings
                        .sort((a, b) => (a.date > b.date ? -1 : 1))
                        .slice(0, sliceEnd)
                        .map((giving) => (
                          <div
                            key={giving.id}
                            className="rowLink userPanelTransHistoryCard d-flex align-items-center"
                          >
                            <div className="col-2 col-md-2  p-0">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPanel;
