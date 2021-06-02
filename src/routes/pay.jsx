import React from "react";
import Header from "../components/HeaderInner";
import Sidebar from "../components/Sidebar";
import PayForm from "../components/PayForm";
import { CircleSpinner } from "react-spinners-kit";

function Pay(props) {
  return (
    <>
      <div className="pageContainer animate__animated animate__slideInRight">
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
        </div>
      </div>
    </>
  );
}

export default Pay;
