import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PayForm from "../components/PayForm";
import { CircleSpinner } from "react-spinners-kit";

function Pay(props) {
  return (
    <>
      <div className="pageContainer">
        {/* SIDEBAR */}
        <Sidebar page="pay" />
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
          {/* GREETINGS */}
          <Header title={"Pay/Give"} {...props} />
          {/* CONTENT BODY */}
          <div className="fullHeight">
            <div className="container px-0"></div>
            <div className="payFormContainer">
              <PayForm {...props} />
            </div>
          </div>
          {/* NAVBAR */}
          <Navbar page="pay" />
        </div>
      </div>
    </>
  );
}

export default Pay;
