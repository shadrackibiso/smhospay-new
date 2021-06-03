import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { auth, firestore } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
// import logo from "../images/logo.svg"

function Signup(props) {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cPassword, setCPassword] = useState(null);
  const [profile, setProfile] = useState({
    accountType: "user",
    createdAt: new Date(),
    titheNumber: Math.floor(1000000 + Math.random() * (10000000 - 1000000)),
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
      .then()
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
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // create user account on database and retrieve the data
          createUserProfile(userCredential);
          // add user detail to local storage for login Authentication
          localStorage.setItem("user", JSON.stringify(true));
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        })
        .then(() => {
          // check data
          props.checkData();
          // redirect to user dashboard
          setRedirect(true);
        });
    } else {
      toast.error("Your passwords do not match");
      setLoading(false);
    }
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
          <div className="row d-flex flex-column align-items-center justify-content-center">
            {/* <div>
                    <img src={logo} width="150px" className="mb-5" />
                  </div> */}
            {/* FORM */}
            <div className="col-lg-5 signUpFormContainer">
              <form
                className="signUpForm text-center"
                id="signUpForm"
                onSubmit={signup}
              >
                <h3 className="font-weight-bold mb-5">Create An Account</h3>
                {/* FIRST NAME */}
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="inputContainer mb-3"
                  required
                  onChange={handleChange}
                />
                {/* LAST NAME */}
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="inputContainer mb-3"
                  required
                  onChange={handleChange}
                />
                {/* EMAIL */}
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  className="inputContainer mb-3"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* PASSWORD */}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="inputContainer mb-3"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* CONFIRM PASSWORD */}
                <input
                  type="password"
                  name="c_password"
                  placeholder="Confirm Password"
                  className="inputContainer mb-3"
                  required
                  onChange={(e) => setCPassword(e.target.value)}
                />
                {/* BUTTON */}
                <button
                  type="submit"
                  className="shadow text-align-center d-flex align-items-center justify-content-center"
                >
                  {/* button text */}
                  {!loading && <span>Sign Up</span>}
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
                <div className="mt-5">
                  Already have an account?
                  <NavLink to={!props.user ? "/" : "/login"}>
                    <span className="font-weight-bold"> Login</span>
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
