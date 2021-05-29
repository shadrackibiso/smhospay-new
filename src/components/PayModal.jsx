import React from "react";

function PayModal(props) {
  return (
    <div className="modalContainer" style={{display: !props.displayModal && 'none'}}>
        <div className="backdrop"></div>
        <div className="modalContent">
            <div className="container py-4 px-5">
                {/* HEADER */}
                <div className="row justify-content-between no-gutters align-items-center">
                    <div>
                        <h3 className="font-weight-bold">Give/Pay</h3>
                    </div>
                    {/* <div className="profilePic">
                        <img src={avatar} />
                    </div> */}
                </div>
                {/* PAYMENT FORM */}
                <form className="mt-5 paymentForm">
                    <div className="row">
                        <div className="col-lg-6 d-flex flex-column">
                            <label>Payment Type</label>
                            <select className="inputContainer">
                                <option>Tithe</option>
                                <option>Offering</option>
                                <option>Prophet Seed</option>
                                <option>Cathedral Seed</option>
                            </select>
                        </div>
                        <div className="col-lg-6 d-flex flex-column">
                            <label>Amount</label>
                            <input type="number" className="inputContainer" />
                        </div>
                        <div className="col-12 d-flex flex-column mt-3">
                            <label>Note (optional)</label>
                            <textarea className="inputContainer"></textarea>
                        </div>
                        <div className="col mt-5 d-flex align-items-center justify-content-center">
                            <button className="subBtn px-5 py-2">pay/give</button>
                        </div>
                    </div>
                </form>
            </div>
       </div>
    </div>
  );
}

export default PayModal;
