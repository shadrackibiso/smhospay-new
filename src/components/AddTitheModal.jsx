import React, { useState } from "react";
import { firestore } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineCheckCircle } from "react-icons/ai";

function AddTitheModal(props) {
  const [loading, setLoading] = useState(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
  const [titheNumber, setTitheNumber] = useState(
    Math.floor(1000000 + Math.random() * (10000000 - 1000000))
  );

  const handleTitheNumber = (e) => {
    e.preventDefault();
    setLoading(true);

    firestore
      .collection("users")
      .doc(`${props.firstName}-${props.lastName}-${props.uid}`)
      .update({
        titheNumber,
      })
      .then(() => {
        // check data
        props.checkData();
        // display success message
        setDisplaySuccessMessage(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const generateTitheNumber = (e) => {
    e.preventDefault();
    setLoading(true);

    firestore
      .collection("users")
      .doc(`${props.firstName}-${props.lastName}-${props.uid}`)
      .update({
        titheNumber: Math.floor(1000000 + Math.random() * (10000000 - 1000000)),
      })
      .then(() => {
        // check data
        props.checkData();
        // display success message
        setDisplaySuccessMessage(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <>
      {/* NOTIFICATIONS */}
      <ToastContainer />
      <div
        className="modalContainer"
        style={{ display: !props.displayAddTitheModal && "none" }}
      >
        {/* MODAL BACKDROP */}
        <div className="backdrop" onClick={props.closeModal}></div>
        {/* MODAL CONTENT */}
        <div className="modalContent px-4 px-md-5 py-5 d-flex align-items-center justify-content-center flex-column text-center animate__animated animate__zoomIn">
          {/* ==== 
              TITHE NUMBER FORM
            ==== */}
          <form
            className="text-center border-none w-100"
            id="titheNumberForm"
            onSubmit={handleTitheNumber}
            name="titheNumberForm"
            style={{ display: displaySuccessMessage && "none" }}
          >
            <h4 className="font-weight-bold mb-4">Add Your Tithe Number</h4>
            {/* TITHE NUMBER */}
            <input
              type="text"
              name="titheNumber"
              placeholder="Tithe Number"
              className="inputContainer mb-3"
              onChange={(e) => setTitheNumber(e.target.value)}
              required
            />
            {/* continue button */}
            <button
              type="submit"
              className="formBtn text-align-center d-flex align-items-center justify-content-center"
            >
              {/* button text */}
              {!loading && <span>Save</span>}
              {/* loading animation */}
              {loading && (
                <ReactLoading
                  type="spin"
                  color="white"
                  width={20}
                  height={20}
                  className="d-flex"
                />
              )}
            </button>
            {/* no tithe number */}
            <h6 className="text-center mt-5 mb-3 text-grey">
              Don't have a Tithe Number?
            </h6>
            {/* generate button */}
            <button
              type="button"
              className="text-align-center borderBtn d-flex align-items-center justify-content-center"
              onClick={generateTitheNumber}
            >
              {/* button text */}
              <span>Generate Tithe Number</span>
            </button>
          </form>
          {/* ==== 
              SUCCESS MESSAGE
            ==== */}
          <div style={{ display: !displaySuccessMessage && "none" }}>
            <div className="addTitheSuccessIcon">
              <AiOutlineCheckCircle />
            </div>
            <h4 className="my-4">Tithe Number Added Successfully</h4>
            <button
              className="formBtn text-align-center d-flex align-items-center justify-content-center"
              onClick={props.closeModal}
            >
              {/* button text */}
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTitheModal;
