import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PayForm(props) {
  const [paymentType, setPaymentType] = useState("tithe");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const email = props.email;
  const givingID = Math.floor(
    1000000000 + Math.random() * (10000000000 - 1000000000)
  );
  const reference = `${givingID}`;
  const publicKey = "pk_live_31be4c58875711da343a63dcc301586f7facd789";
  const componentProps = {
    email,
    amount,
    reference,
    publicKey,
    text: "Pay/Give",
    onSuccess: () => handleSuccessfulPayment(),
    onClose: () => toast.error("transaction cancelled."),
  };

  const handleSuccessfulPayment = () => {
    let giving = {
      id: givingID,
      type: paymentType,
      amount: amount / 100,
      note: note,
      date: new Date(),
      success: true,
      uid: props.uid,
      givenBy: `${props.firstName} ${props.lastName}`,
      titheNumber: props.titheNumber,
    };

    props.addGiving(giving);
    toast.success("Transaction successful.");
  };

  return (
    <>
      <ToastContainer />
      <form className="payForm" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          {/* PAYMENT TYPE */}
          <div className="col-lg-6 d-flex flex-column">
            <label>Payment Type</label>
            <select
              className="inputContainer"
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="tithe">Tithe</option>
              <option value="offering">Offering</option>
              <option value="prophet offering">Prophet Offering</option>
              <option value="cathedral sacrifice">Cathedral Sacrifice</option>
              <option value="first fruit">First Fruit</option>
              <option value="thanksgiving offering">
                Thanksgiving Offering
              </option>
            </select>
          </div>
          {/* AMOUNT */}
          <div className="col-lg-6 d-flex flex-column mt-3 mt-md-0">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              className="inputContainer"
              onChange={(e) => setAmount(e.target.value * 100)}
              required
            />
          </div>
          {/* NOTE */}
          <div className="col-12 d-flex flex-column mt-3">
            <label>Note (optional)</label>
            <textarea
              className="inputContainer"
              onChange={(e) => {
                setNote(e.target.value);
              }}
            ></textarea>
          </div>
          {/* BUTTON */}
          <div className="col mt-5 d-flex align-items-center justify-content-center">
            <PaystackButton
              className="mainBtn px-5 py-2 shadow"
              {...componentProps}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default PayForm;
