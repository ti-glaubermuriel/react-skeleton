import React, { Component } from "react";
import { Layout, Icon } from "antd";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { getProfile } from "./services/auth";
import { PrivateRoute } from "./Routes";
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
      lastfilter: null
    };
  }

  // set state institution - component -> ant design
  UpdateStateFilters = timestamp => {

    this.setState({lastfilter: timestamp});

    console.log('########### - ALTERADO FILTER ###########');
    console.log(timestamp);
    
  };

  componentDidMount() {
    console.log("INIT APP");
  }

  render() {
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh", padding: 0 }}>
          <HeaderComponent setglobalstate={this.UpdateStateFilters} />
          <MenuComponent />
          <Layout>
            <Content style={{ padding: "80px 20px 20px 220px" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/app"
                  component={HomePage}
                  lastfilter={this.state.lastfilter}
                />
                <PrivateRoute
                  path="/app/home"
                  component={HomePage}
                  lastfilter={this.state.lastfilter}
                />
                <PrivateRoute
                  path="/app/pharma"
                  component={PharmaPage}
                  lastfilter={this.state.lastfilter}
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
