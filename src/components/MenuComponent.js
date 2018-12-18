import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Icon,
  Row
} from "antd";
const { Sider } = Layout;

class MenuComponent extends Component {
  render() {
    return (
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
            </b>
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
              <Link to="/app/home">
                {" "}
                <Icon type="line-chart" />
                <span>Visão geral</span>{" "}
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="/app/pharma">
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
    );
  }
}

export default MenuComponent;
