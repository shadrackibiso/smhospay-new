import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { auth, firestore } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import logo from "../images/login-logo.png";

function Signup(props) {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cPassword, setCPassword] = useState(null);
  const [titheNumber, setTitheNumber] = useState(
    Math.floor(1000000 + Math.random() * (10000000 - 1000000))
  );
  const [displayTitheNumberForm, setDisplayTitheNumberForm] = useState(false);
  const [profile, setProfile] = useState({
    accountType: "user",
    createdAt: new Date(),
  });

  const handleChange = (e) => {
    let detail = { [e.target.name]: e.target.value };
    setProfile((prevState) => ({ ...prevState, ...detail }));
  };

  const createUserProfile = ({ user }) => {
    firestore
      .collection("users")
      .doc(`${profile.firstName}-${profile.lastName}-${user.uid}`)
      .set({
        id: `${profile.firstName}-${profile.lastName}-${user.uid}`,
        uid: `${user.uid}`,
        email,
        ...profile,
      })
      .then(() => {
        setProfile((prevState) => ({
          ...prevState,
          uid: user.uid,
        }));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
      });
  };

  const signup = (e) => {
    e.preventDefault();
    setLoading(true);
    if (password === cPassword) {
      if (!password.length <= 6) {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // create user account on database and retrieve the data
            createUserProfile(userCredential);
            // add user detail to local storage for login Authentication
            localStorage.setItem("user", JSON.stringify(true));
            // show tithe number form
            setDisplayTitheNumberForm(true);
          })
          .catch((error) => {
            toast.error(error.message);
            setLoading(false);
          })
          .then(() => {
            setLoading(false);
          });
      } else {
        toast.error("Password must be greater than 6 characters");
        setLoading(false);
      }
    } else {
      toast.error("Your passwords do not match");
      setLoading(false);
    }
  };

  const handleTitheNumber = (e) => {
    e.preventDefault();
    setLoading(true);

    firestore
      .collection("users")
      .doc(`${profile.firstName}-${profile.lastName}-${profile.uid}`)
      .update({
        titheNumber,
      })
      .then(() => {
        // check data
        props.checkData();
        // redirect to user dashboard
        setRedirect(true);
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
      .doc(`${profile.firstName}-${profile.lastName}-${profile.uid}`)
      .update({
        titheNumber: Math.floor(1000000 + Math.random() * (10000000 - 1000000)),
      })
      .then(() => {
        // check data
        props.checkData();
        // redirect to user dashboard
        setRedirect(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const skipTitheNumber = (e) => {
    e.preventDefault();
    setLoading(true);

    // check data
    props.checkData();
    // redirect to user dashboard
    setRedirect(true);
  };

  return (
    <>
      {/* NOTIFICATIONS */}
      <ToastContainer />
      {/* TRIGGER REDIRECT TO DASHBOARD AFTER SIGN UP */}
      {redirect && <Redirect to="/" />}
      {/* MAIN CONTENT */}
      <div className="signUpContainer">
        <div className="container">
          <div className="row py-4 py-md-0 d-flex flex-column align-items-center justify-content-center">
            <div>
              <img src={logo} width="150px" className="mb-5" />
            </div>
            {/* FORM */}
            <div className="col-lg-5 signUpFormContainer">
              <form
                className="signUpForm text-center"
                id="signUpForm"
                onSubmit={signup}
                style={{ display: !displayTitheNumberForm ? "block" : "none" }}
              >
                <h3 className="font-weight-bold mb-5">Create An Account</h3>
                <div className="row">
                  {/* FIRST NAME */}
                  <div className="col-lg-6 px-lg-2">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="inputContainer mb-3"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  {/* LAST NAME */}
                  <div className="col-lg-6 px-lg-2">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="inputContainer mb-3"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="col-12 px-lg-2">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email Address"
                      className="inputContainer mb-3"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="col-lg-6 px-lg-2">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="inputContainer mb-3"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* CONFIRM PASSWORD */}
                  <div className="col-lg-6 px-lg-2">
                    <input
                      type="password"
                      name="c_password"
                      placeholder="Confirm Password"
                      className="inputContainer mb-3"
                      required
                      onChange={(e) => setCPassword(e.target.value)}
                    />
                  </div>
                  {/* BUTTON */}
                  <div className="col-12 px-lg-2 mt-3">
                    <button
                      type="submit"
                      className="shadow text-align-center d-flex align-items-center justify-content-center"
                    >
                      {/* button text */}
                      {!loading && <span>Next</span>}
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
                  </div>
                  <div className="mt-5 col-12">
                    Already have an account?
                    <NavLink to={!props.user ? "/" : "/login"}>
                      <span className="font-weight-bold"> Login</span>
                    </NavLink>
                  </div>
                </div>
              </form>
              {/* ==== 
              TITHE NUMBER FORM
               ==== */}
              <form
                className="signUpForm text-center"
                id="titheNumberForm"
                onSubmit={handleTitheNumber}
                style={{ display: displayTitheNumberForm ? "block" : "none" }}
                name="titheNumberForm"
              >
                <h3 className="font-weight-bold mb-2">Almost Done</h3>
                <p className="mb-5">Add Your Tithe Number</p>
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
                  className="text-align-center d-flex align-items-center justify-content-center"
                >
                  {/* button text */}
                  {!loading && <span>Continue</span>}
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
                {/* skip button */}
                <button
                  type="button"
                  className="text-align-center borderBtn d-flex align-items-center justify-content-center mt-3"
                  onClick={skipTitheNumber}
                >
                  {/* button text */}
                  <span>Skip</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
