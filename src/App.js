import React, { Component } from "react";
import {
  Layout,
  Icon
} from "antd";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { getProfile } from "./services/auth";
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
import NotFoundPage from './pages/NotFoundPage';

const { Content } = Layout;

const TesteRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => <Component {...props} teste={rest.teste} />}
  />
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      institution_id: 348,
      date_start: "01/12/2018",
      date_end: "30/12/2018",
      user: getProfile()
    };
  }

  mudaData = () => {
    this.setState({});
  };

  render() {
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh", padding: 0 }}>
          <HeaderComponent />
            <MenuComponent />
              <Content style={{ padding: "80px 20px 20px 220px" }}>
                <Switch>
                  <Route exact path="/app" component={HomePage} />
                  <Route  path="/app/home" component={HomePage} />
                  <Route  path="/app/pharma" component={PharmaPage} />
                  <Route component={NotFoundPage} />
                </Switch>
              </Content>
              <FooterComponent />>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
