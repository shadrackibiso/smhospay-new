import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PayForm(props) {
  const [paymentType, setPaymentType] = useState("tithe");
  const refName = paymentType.split(" ").join("-");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const email = props.email;
  const publicKey = "pk_test_fb12227020084366acb5f94723d704c5eced79a1";
  const reference = `${refName}-${uuidv4()}`;
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
      id: uuidv4(),
      type: paymentType,
      amount: amount / 100,
      date: new Date(),
      success: true,
      uid: props.uid,
      givenBy: `${props.firstName} ${props.lastName}`,
      note: note,
    };

    props.addGiving(giving);
    console.log(giving);
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
              <option value="prophet seed">Prophet Seed</option>
              <option value="cathedral seed">Cathedral Seed</option>
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
