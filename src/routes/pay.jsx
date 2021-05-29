import React from "react";
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import PayForm from "../components/PayForm"

function Pay(props) {
  return (
    <>
    <div className="pageContainer">
      <div className="row no-gutters">

      {/* SIDEBAR */}
      <Sidebar page='pay' />

      {/* MAIN CONTENT */}
      <div className="col-lg-10 pageContent">
        <div className="container py-4 px-3 px-md-5">

          {/* GREETINGS */}
          <Header title={'Pay/Give'} {...props} />

          <div className="payFormContainer mt-4 ">
            <PayForm {...props} />
          </div>

        </div>
      </div>

      {/* NAVBAR */}
      <Navbar page='pay' />

      </div>
    </div>
    </>
  );
}

export default Pay;
