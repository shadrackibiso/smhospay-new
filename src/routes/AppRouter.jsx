import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Payments from "./Payments";
import Payment from "./Payment";
import Pay from "./pay";
import Signup from "./Signup";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import AuthRoute from "./AuthRoute";

function AppRouter(props) {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" exact>
            <Login {...props} />
          </Route>
          <Route path="/signup" exact>
            <Signup {...props} />
          </Route>
          <AuthRoute path="/" component={Dashboard} state={props} exact />
          <AuthRoute
            path="/adminDashboard"
            component={AdminDashboard}
            state={props}
            exact
          />
          <AuthRoute
            path="/payments"
            component={Payments}
            state={props}
            exact
          />
          <AuthRoute
            path="/payment/:id"
            component={Payment}
            state={props}
            exact
          />
          <AuthRoute path="/pay" component={Pay} state={props} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
