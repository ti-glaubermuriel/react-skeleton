import React, { Component } from "react";
import moment from "moment";
import "moment/locale/pt-br";
import locale from "antd/lib/date-picker/locale/pt_BR";
import {
  Layout,
  Menu,
  Button,
  Icon,
  Select,
  Card,
  Row,
  Col,
  Avatar,
  Spin,
  Dropdown,
  Divider,
  DatePicker,
  Tag,
  List
} from "antd";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import Slider from "react-slick";
import iconColor from "./assets/icon_color.png";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import homePage from "./pages/homePage";
import farmacoPage from "./pages/pharmaPage";
import loginPage from "./pages/loginPage";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

class App extends Component {
  render() {
    const menuUser = (
      <Menu mode="inline" style={{ width: 250 }}>
        <Menu.Item>
          <div className="ant-list-item-meta">
            <div className="ant-list-item-meta-avatar">
              <span
                className="ant-avatar ant-avatar-circle ant-avatar-image"
                style={{ marginTop: 5 }}
              >
                <Avatar>GV</Avatar>
              </span>
            </div>
            <div className="ant-list-item-meta-content">
              <h4
                className="ant-list-item-meta-title"
                style={{ marginBottom: -5 }}
              >
                George Vitoriano
              </h4>
              <div className="ant-list-item-meta-description">
                <small>Administrador</small>
              </div>
            </div>
          </div>
        </Menu.Item>
        <Divider style={{ margin: "5px 0" }} />
        <Menu.Item>
          <a rel="noopener noreferrer" href="" style={{ color: "red" }}>
            Encerrar sessão
          </a>
        </Menu.Item>
      </Menu>
    );

    const antIcon = <Icon type="loading" style={{ fontSize: 38 }} spin />;

    return (
      <BrowserRouter>
      <Layout style={{ minHeight: "100vh", padding: 0 }}>
        <Header style={{ position: "fixed", zIndex: 1024, width: "100%" }}>
          <Dropdown overlay={menuUser} trigger={["click"]}>
            <Button
              type="primary"
              shape="circle"
              icon="user"
              className="btn-custom-primary"
            />
          </Dropdown>

          <Select defaultValue="1" className="select-drop">
            <Option value="1">Hospital Santa Lúcia</Option>
            <Option value="2">Hospital das Clínicas USP</Option>
            <Option value="Yiminghe">Hospital Samaritano</Option>
          </Select>

          <div style={{ float: "right" }}>
            <Tag>29 dias</Tag>

            <RangePicker
              locale={locale}
              defaultValue={[
                moment("02/10/2018", dateFormat),
                moment("01/11/2018", dateFormat)
              ]}
              format={dateFormat}
            />
          </div>
        </Header>

        <Layout>
          <Sider
            width={200}
            style={{
              position: "fixed",
              zIndex: 1023,
              minHeight: "100vh",
              background: "#fff",
              padding: "70px 0 0 0"
            }}
          >
            <Row
              style={{
                marginLeft: "24px",
                fontSize: "16px",
                paddingBottom: "10px"
              }}
            >
              <b style={{ verticalAlign: "-webkit-baseline-middle" }}>
                Indicadores
              </b>{" "}
              <Button
                style={{ float: "right", marginRight: "8px" }}
                shape="circle"
                icon="setting"
              />
            </Row>

            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Link to="/home">
                  {" "}
                  <Icon type="line-chart" />
                  <span>Visão geral</span>{" "}
                </Link>
              </Menu.Item>

              <Menu.Item key="2">
                <Link to="/farmaco">
                  {" "}
                  <Icon type="medicine-box" />
                  <span>Fármacos</span>{" "}
                </Link>
              </Menu.Item>

              <Menu.Item key="3">
                <Icon type="clock-circle" />
                <span>Tempo cirúrgico</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "80px 20px 20px 220px" }}>
            <h1 className="title">
              {" "}
              <Icon type="line-chart" /> Visão geral
            </h1>
            <Content>
              
                <Switch>
                  <Route exact path="/" component={homePage} />
                  <Route  path="/home" component={homePage} />
                  <Route  path="/farmaco" component={farmacoPage} />
                  <Route path="/login" component={loginPage} />
                </Switch>
              
            </Content>
            <Footer style={{ textAlign: "center", paddingTop: 50 }}>
              Powered by <img src={iconColor} alt="Logo" />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
