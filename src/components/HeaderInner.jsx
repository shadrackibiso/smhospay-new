import React from "react";
import { MdClose, MdKeyboardArrowLeft } from "react-icons/md";

function Header(props) {
  const goBack = () => {
    window.history.back();
  };
  return (
    <>
      <div className="header">
        <div className="container px-0 px-md-4">
          {/* GREETINGS */}
          <div className="row justify-content-between no-gutters align-items-center">
            {/* back arrow */}
            <div className="col-2 d-md-none">
              <div className="headerIcon" onClick={goBack}>
                <MdKeyboardArrowLeft />
              </div>
            </div>
            {/* title */}
            <div className="col-8">
              <div className="font-weight-bold headerTitle mb-0 text-center text-md-left text-capitalize">
                <span>{props.title}</span>
              </div>
            </div>
            {/* close */}
            <div className="col-2">
              <div
                className="headerIcon text-right d-none d-md-block"
                onClick={() => props.close()}
              >
                <MdClose />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
