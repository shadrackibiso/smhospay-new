import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../config/config";
import logo from "../images/logo-l.png";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";

function Login(props) {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = (e) => {
    e.preventDefault();
    // initialize loading animation
    setLoading(true);
    // initialize login
    const form = document.querySelector("form.loginForm");
    auth
      .signInWithEmailAndPassword(form.email.value, form.password.value)
      .then((data) => {
        props.checkData();
        localStorage.setItem("user", JSON.stringify(data.user.uid));
        // redirect to user dashboard
        setRedirect(true);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      {/* NOTIFICATIONS */}
      <ToastContainer />
      {/* TRIGGER REDIRECT TO DASHBOARD AFTER LOGIN */}
      {redirect && <Redirect to="/" />}
      {/* MAIN CONTENT */}
      <div className="signUpContainer">
        <div className="container">
          <div className="row d-flex flex-column align-items-center justify-content-center">
            {/* FORM */}
            <div className="col-lg-5 signUpFormContainer">
              <div>
                <img src={logo} alt="logo" width="150px" className="mb-5" />
              </div>
              <form
                className="signUpForm loginForm text-center"
                onSubmit={login}
              >
                <h3 className="font-weight-bold mb-5">Sign In</h3>
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  className="inputContainer mb-3"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="inputContainer mb-3"
                />
                <button
                  type="submit"
                  className="shadow text-align-center d-flex align-items-center justify-content-center"
                >
                  {!loading && <span>Login</span>}
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
                  Don't have an account?
                  <NavLink to="/signup">
                    <span className="font-weight-bold"> Sign Up</span>
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

export default Login;
