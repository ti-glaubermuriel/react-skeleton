import React, { Component } from "react";
import { Button, Card, Row, Col, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import ListAnaesthetists from "../components/ListAnaesthetists";

class HomePage extends Component {
  removeLoading = () => {
    setTimeout(() => this.setState({ loading: false }), 3000);
  };

  componentDidMount() {
    console.log("LOAD APP");
  }

  render() {
    return (
      <div>
        <h1 className="title">
          <Icon type="line-chart" /> Visão geral
        </h1>
        <Row gutter={16}>
          <Col span={8}>
            <ListAnaesthetists />
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomePage;
