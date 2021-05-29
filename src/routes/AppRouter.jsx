import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import Transactions from "./Transactions";
import Pay from "./pay"
import Signup from "./Signup"
import Login from "./Login"
import AdminDashboard from "./Admin/AdminDashboard"
import AuthRoute from "./AuthRoute"

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
          <AuthRoute path="/transactions" component={Transactions} state={props} exact />
          <AuthRoute path="/pay" component={Pay} state={props} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
