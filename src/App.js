import React, { Component } from "react";
import { Layout, Icon } from "antd";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { getProfile } from "./services/auth";
import { PrivateRoute } from "./Routes";
import { PeriodSubtractMonth } from "./Utils";
import api from "./services/api";

import posed, { PoseGroup } from 'react-pose';


import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//import components
import HeaderComponent from "./components/HeaderComponent";
import MenuComponent from "./components/MenuComponent";
import FooterComponent from "./components/FooterComponent";

//import pages
import HomePage from "./pages/HomePage";
import PharmaPage from "./pages/PharmaPage";
import NotFoundPage from "./pages/NotFoundPage";

const { Content } = Layout;

class App extends Component {
  constructor() {
    super();

    this.state = {
      shortDate: "1", //number month
      institutions: [],
      period: PeriodSubtractMonth(1),
      user: getProfile()
    };
  }

  loadInstitutions = () => {
    api
      .get("/web/institutions/")
      .then(res => {
        this.setState({institutions: res.data});
      })
      .catch(error => {
        return [];
        console.log(error);
      });
  };

  // set state filter period - component -> ant design
  UpdatePeriod = (value, dateSelected) => {
    if (Array.isArray(value)) {
      this.setState({ period: dateSelected, shortDate: "0" });
    } else {
      this.setState({ period: PeriodSubtractMonth(value), shortDate: value });
    }
  };

  // set state institution - component -> ant design
  UpdateInstitution = id => {
    this.setState({ institution_id: id });
  };

  componentDidMount() {
    console.log("LOAD APP");
    console.log(PeriodSubtractMonth(1));
  }

  render() {
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh", padding: 0 }}>
          <HeaderComponent setdate={this.UpdatePeriod} filters={this.state} />
          <MenuComponent />
          <Layout>
            <Content style={{ padding: "80px 20px 20px 220px" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/app"
                  component={HomePage}
                  filters={this.state}
                />
                <PrivateRoute
                  path="/app/home"
                  component={HomePage}
                  filters={this.state}
                />
                <PrivateRoute
                  path="/app/pharma"
                  component={PharmaPage}
                  filters={this.state}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </Content>
            <FooterComponent />
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
