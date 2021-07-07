import React, { useState } from "react";
import "../css/home.css";
import Header from "../components/Header";
import empty from "../images/empty.svg";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import moment from "moment";
import { CircleSpinner } from "react-spinners-kit";
import { ClassicSpinner } from "react-spinners-kit";
import UsersFilter from "../components/UsersFilter";
import UserPanel from "../components/UserPanel";

function Users(props) {
  const [displayUserPanel, setDisplayUserPanel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [sortType, setSortType] = useState("users(n-o)");
  const [sortFunction, setSortFunction] = useState(() => {
    return (a, b) => (a.createdAt > b.createdAt ? -1 : 1);
  });
  const [filtered, setFiltered] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [users, setUsers] = useState();
  const [displayedUsers, setDisplayedUsers] = useState();
  const [sliceEnd, setSliceEnd] = useState(20);
  let usersPerPage = 20;

  const showMoreUsers = () => {
    setSliceEnd(sliceEnd + usersPerPage);
    setDisplayedUsers(users.slice(0, sliceEnd + usersPerPage));
  };

  const checkUsers = () => {
    setUsers(props.users);
    setDisplayedUsers(props.users.slice(0, usersPerPage));
    setExecuted(true);
  };

  const handleFilter = () => {
    // filter by registration date
    let usersByDate = props.users.filter((user) => {
      // filter users without date range
      if (!startDate) {
        return user;
      }
      // filter users with date range
      if (startDate) {
        return (
          moment(user.createdAt.toDate()).format("L") >=
            moment(startDate).format("L") &&
          moment(user.createdAt.toDate()).format("L") <=
            moment(endDate).format("L")
        );
      }
    });

    // sort filtered users
    if (sortType === "users(n-o)") {
      setSortFunction(() => {
        return (a, b) => (a.createdAt > b.createdAt ? -1 : 1);
      });
    } else if (sortType === "users(o-n)") {
      setSortFunction(() => {
        return (a, b) => (a.createdAt > b.createdAt ? 1 : -1);
      });
    } else if (sortType === "name(a-z)") {
      setSortFunction(() => {
        return (a, b) =>
          a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
      });
    } else if (sortType === "name(z-a)") {
      setSortFunction(() => {
        return (a, b) =>
          b.firstName.toLowerCase().localeCompare(a.firstName.toLowerCase());
      });
    } else {
      setSortFunction(() => {
        return (a, b) => (a.createdAt > b.createdAt ? -1 : 1);
      });
    }

    setUsers(usersByDate);
    setDisplayedUsers(usersByDate.slice(0, usersPerPage));
    setSliceEnd(usersPerPage);
    setFiltered(true);
  };

  const resetFilter = () => {
    setUsers(props.users);
    setDisplayedUsers(props.users.slice(0, usersPerPage));

    setSortType("users(n-o)");
    setSortFunction(() => {
      return (a, b) => (a.createdAt > b.createdAt ? -1 : 1);
    });
    setStartDate();
    setEndDate();

    setFiltered(false);
    setSliceEnd(usersPerPage);
  };

  const showUser = (props) => {
    setSelectedUser(props);
    setDisplayUserPanel(true);
  };

  return (
    <>
      {/* check users once on page load */}
      {!props.loading && props.users && !executed && checkUsers()}
      <div className="pageContainer">
        {/* SIDEBAR */}
        <Sidebar page="users" {...props} />
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
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            sortType={sortType}
            setSortType={setSortType}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            handleFilter={handleFilter}
            resetFilter={resetFilter}
            filtered={filtered}
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
                        .filter((user) => {
                          let userFullName = user.firstName + user.lastName;

                          return (
                            user.email.toLowerCase().includes(searchValue) ||
                            userFullName.toLowerCase().includes(searchValue)
                          );
                        })
                        .sort(sortFunction)
                        .slice(0, sliceEnd)
                        .map((user) => (
                          <div
                            className="transHistoryCard d-flex align-items-center"
                            key={user.id}
                            onClick={() =>
                              showUser({
                                ...user,
                                createdAt: user.createdAt.toDate(),
                              })
                            }
                          >
                            {/* user email */}
                            <div className="col-7 col-md-4 p-0">
                              <div className="transHistoryText-n">
                                {user.email}
                              </div>
                            </div>
                            {/* user full name */}
                            <div className="col-md-3 p-0 transHistoryText-n text-capitalize">
                              {user.firstName + " " + user.lastName}
                            </div>
                            {/* tithe number */}
                            <div className="col-md-2 p-0 transHistoryText-n">
                              {user.titheNumber ? (
                                <span className="paymentType">
                                  {user.titheNumber}
                                </span>
                              ) : (
                                "-"
                              )}
                            </div>
                            {/* registration date */}
                            <div className="col-md-3 p-0 transHistoryText-n text-capitalize">
                              {moment(user.createdAt.toDate()).format("LL")}
                            </div>
                          </div>
                        ))}
                  </div>
                  {/* load more button */}
                  <div
                    className="align-items-center justify-content-center mt-5 hide"
                    style={{
                      display:
                        displayedUsers &&
                        users &&
                        displayedUsers.length !== users.length &&
                        "flex",
                    }}
                  >
                    <button
                      className="subBtn py-2 px-3"
                      onClick={showMoreUsers}
                    >
                      Load More
                    </button>
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
              </div>
            </div>
          </div>
          {/* MOBILE NAV */}
          <MobileNav page="users" />
        </div>
      </div>
      <UserPanel
        selectedUser={selectedUser}
        openPanel={displayUserPanel}
        closePanel={() => setDisplayUserPanel(false)}
        state={{
          accountType: props.accountType && props.accountType.toLowerCase(),
          givings: props.givings && props.givings,
        }}
      />
    </>
  );
}

export default Users;
