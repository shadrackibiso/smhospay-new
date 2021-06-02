import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import fb from "../config/config";
import firebase from "firebase/app";
import { ToastContainer, toast } from "react-toastify";
// import logo from "../images/logo.svg"
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";

function Signup(props) {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    accountType: "user",
    createdAt: new Date(),
    firstName: "",
    lastName: "",
    titheNumber: Math.floor(1000000 + Math.random() * (10000000 - 1000000)),
    email: "",
  });

  const handleChange = (e) => {
    let detail = { [e.target.name]: e.target.value };
    setUser((prevState) => ({ ...prevState, ...detail }));
  };

  const signup = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = document.querySelector("form.signUpForm");
    if (form.password.value === form.c_password.value) {
      fb.auth()
        .createUserWithEmailAndPassword(form.email.value, form.password.value)
        .then((data) => {
          // add user detail to local storage for login Authentication
          localStorage.setItem("user", JSON.stringify(data.user.uid));
          // user profile
          const profile = {
            id: `${user.firstName}-${user.lastName}-${data.user.uid}`,
            uid: `${data.user.uid}`,
            ...user,
          };
          // prevent user password from being stored on the database
          delete profile.password;
          delete profile.c_password;
          // create user account on database and retrieve the data
          firebase
            .firestore()
            .collection("users")
            .doc(`${profile.id}`)
            .set(profile)
            .then(() => {
              props.checkData();
            })
            .catch((error) => {
              toast.error(error.message);
              setLoading(false);
            });
        })
        .then(() => {
          // redirect to user dashboard
          setRedirect(true);
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
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
              <form className="signUpForm text-center" onSubmit={signup}>
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
                  onChange={handleChange}
                />
                {/* PASSWORD */}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="inputContainer mb-3"
                  required
                  onChange={handleChange}
                />
                {/* CONFIRM PASSWORD */}
                <input
                  type="password"
                  name="c_password"
                  placeholder="Confirm Password"
                  className="inputContainer mb-3"
                  required
                  onChange={handleChange}
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
