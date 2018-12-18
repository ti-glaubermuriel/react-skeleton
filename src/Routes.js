import React from "react";
import { isAuthenticated } from "./services/auth";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import App from "./App";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect
          to={{ pathname: "/app", state: { from: props.location } }}
        />
        
      ) : (
        <Component {...props} />
      )
    }
  />
);

const RootRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Redirect to={{ pathname: "/app", state: { from: props.location } }} />
    )}
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <RootRouter exact path="/" component={App} />
      <PrivateRoute path="/app" component={App} />
      <LoginRoute path="/login" component={LoginPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
