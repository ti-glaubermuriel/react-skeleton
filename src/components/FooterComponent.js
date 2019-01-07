import React, { Component } from "react";
import iconColor from "../assets/icon_color.png";
import { Layout, Tooltip } from "antd";
const { Footer } = Layout;

class FooterComponent extends Component {
  render() {
    return (
        <Footer style={{ textAlign: "center", paddingTop: 50 }}>
          Powered by <Tooltip title="Anestech"> <a href="http://www.anestech.com.br/" target="_blank">
                <img src={iconColor} alt="Logo" /> </a>
            </Tooltip>
        </Footer>
    );
  }
}

export default FooterComponent;
