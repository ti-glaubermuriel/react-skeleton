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
         

          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1">
              <Link to="/app/home">
                {" "}
                <span>Visão geral</span>{" "}
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="/app/pharma">
                {" "}
                <span>Fármacos</span>{" "}
              </Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to="/app/gases">
                {" "}
                <span>Gases</span>{" "}
              </Link>
            </Menu.Item>

            <Menu.Item key="4">
              <Link to="/app/surgery">
                {" "}
                <span>Tempo cirúrgico</span>{" "}
              </Link>
            </Menu.Item>

          </Menu>
        </Sider>
    );
  }
}

export default MenuComponent;
