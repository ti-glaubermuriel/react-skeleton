import React from "react";
import { isAuthenticated } from "./services/auth";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import App from './App';
import loginPage from './pages/loginPage';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={App} />
      <Route  path="/login" component={loginPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;