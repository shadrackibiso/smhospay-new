import React from "react";
import { Redirect, Route } from "react-router-dom";

function AuthRoute(props) {
  const Component = props.component;
  const isAuthenticated = localStorage.getItem("user");

  return isAuthenticated ? (
    <Route {...props}>
      <Component {...props.state} {...props} />
    </Route>
  ) : (
    <Redirect to="/login" />
  );
}

export default AuthRoute;
