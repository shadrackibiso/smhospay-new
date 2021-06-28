import React, { useState } from "react";
import "../css/home.css";
import Header from "../components/Header";
import empty from "../images/empty.svg";
import { FaHandHoldingUsd } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import moment from "moment";
import { CircleSpinner } from "react-spinners-kit";
import { ClassicSpinner } from "react-spinners-kit";
import { Link } from "react-router-dom";
import UsersFilter from "../components/UsersFilter";

function Users(props) {
  const [userEmail, setUserEmail] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [users, setUsers] = useState(props.users);

  const handleFilter = () => {
    let users = props.users.filter((user) => {
      // filter all users without date range
      if (user.email.toLowerCase().includes(" ") && !startDate) {
        return user;
      }
      // filter all users with date range
      if (user.email.toLowerCase().includes(" ") && startDate) {
        return (
          moment(user.createdAt.toDate()).format("L") >=
            moment(startDate).format("L") &&
          moment(user.createdAt.toDate()).format("L") <=
            moment(endDate).format("L")
        );
      }
      // filter selected users without date range
      if (user.email.toLowerCase().includes(userEmail) && !startDate) {
        return user.email.toLowerCase().includes(userEmail);
      }
      // filter selected users type with date range
      if (user.email.toLowerCase().includes(userEmail) && startDate) {
        return (
          user.email.toLowerCase().includes(userEmail) &&
          moment(user.createdAt.toDate()).format("L") >=
            moment(startDate).format("L") &&
          moment(user.createdAt.toDate()).format("L") <=
            moment(endDate).format("L")
        );
      }
    });

    setUsers(users);
  };

  return (
    <>
      <div className="pageContainer">
        {/* SIDEBAR */}
        <Sidebar page="users" />
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
          <Header title={`Users`} {...props} />
          {/* FILTER */}
          <UsersFilter
            setUserEmail={setUserEmail}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            handleFilter={handleFilter}
            totalUsers={users && users.length}
          />
          {/* CONTENT BODY */}
          <div className="fullHeight-f">
            <div className="container px-0">
              {/* LOADER */}
              <div
                className="loaderContainer mt-5"
                style={{
                  display: props.users && "none",
                }}
              >
                {
                  <ClassicSpinner
                    size={30}
                    color="#dddddd"
                    loading={!props.users}
                  />
                }
              </div>
              <div
                className="row"
                style={{
                  display: !props.users && "none",
                }}
              >
                {/* USERS DESKTOP */}
                <div
                  className="col-12"
                  style={{
                    display: !props.users && "none",
                  }}
                >
                  <div className="transHistoryContainer d-none d-md-block">
                    {/* USERS TABLE HEAD */}
                    <div className="transHistoryCard transHistoryHeader d-flex align-items-center">
                      <div className="col-md-4 p-0">Email</div>
                      <div className="col-md-3 p-0">Full Name</div>
                      <div className="col-md-2 p-0">Tithe Number</div>
                      <div className="col-md-3 p-0">Registered On</div>
                    </div>
                    {/* USERS LOOP */}
                    {users &&
                      users
                        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                        .map((user) => (
                          <div
                            className="transHistoryCard d-flex align-items-center"
                            key={user.id}
                          >
                            <div className="col-7 col-md-4 p-0">
                              <div className="transHistoryText-n">
                                {user.email}
                              </div>
                            </div>
                            <div className="col-md-3 p-0 transHistoryText-n text-capitalize">
                              {user.firstName + " " + user.lastName}
                            </div>
                            <div className="col-md-2 p-0 transHistoryText-n">
                              {user.titheNumber ? user.titheNumber : "-"}
                            </div>
                            <div className="col-md-3 p-0 transHistoryText-n text-capitalize">
                              {moment(user.createdAt.toDate()).format("LL")}
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
                      props.users && props.users.length > 0 ? "none" : "flex",
                  }}
                >
                  <img src={empty} alt="no payments" width="40%" />
                  <span className="mt-3">
                    <i>no user registered</i>
                  </span>
                </div>
                {/* USERS MOBILE */}
                <div
                  className="col-12"
                  style={{
                    display: !props.users && "none",
                  }}
                >
                  <div className="transHistoryContainer d-md-none">
                    {users &&
                      users
                        .sort((a, b) => (a.date > b.date ? -1 : 1))
                        .map((user) => (
                          <Link
                            to={{
                              pathname: `/payment/${user.id}`,
                              state: {
                                ...user,
                                createdAt: user.createdAt.toDate(),
                              },
                            }}
                            key={user.id}
                            className="rowLink transHistoryCard d-flex align-items-center"
                          >
                            <div className="col-2 col-md-1 mr-md-4 p-0">
                              <div>
                                <FaHandHoldingUsd />
                              </div>
                            </div>
                            <div className="col-7 col-md-6 p-0">
                              <div className="transHistoryAmount">
                                {user.email}
                              </div>
                              <div className="transHistoryText">
                                {user.firstName}
                              </div>
                            </div>
                            <div className="col-3 col-md-4 p-0 text-right transHistoryText">
                              {user.lastName}
                            </div>
                          </Link>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* MOBILE NAV */}
          <MobileNav page="users" />
        </div>
      </div>
    </>
  );
}

export default Users;
