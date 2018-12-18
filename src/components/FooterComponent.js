import React, { Component } from "react";
import iconColor from "../assets/icon_color.png";
import { Layout } from "antd";
const { Footer } = Layout;

class FooterComponent extends Component {
  render() {
    return (
        <Footer style={{ textAlign: "center", paddingTop: 50 }}>
          Powered by <img src={iconColor} alt="Logo" />
        </Footer>
    );
  }
}

export default FooterComponent;
