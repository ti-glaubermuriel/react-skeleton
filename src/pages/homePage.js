import React, { Component } from "react";
import { Button, Card, Row, Col, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import ListAnaesthetists from "../components/ListAnaesthetists";
import ChartTopPharma from "../components/ChartTopPharma";

class HomePage extends Component {
  componentDidMount() {
    console.log("LOAD HOME");
  }

  render() {
    
    return (
      <div>
        <h1 className="title">
          <Icon type="line-chart" /> Visão geral
        </h1>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <ListAnaesthetists filters={this.props.filters} />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <ChartTopPharma filters={this.props.filters} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomePage;
