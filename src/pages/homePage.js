import React, { Component } from "react";
import { Button, Card, Row, Col, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import ListAnaesthetists from "../components/ListAnaesthetists";
import ChartTopPharma from "../components/ChartTopPharma";
import ChartAnestheticsInterval from "../components/ChartAnestheticsInterval";
import ChartTopGases from "../components/ChartTopGases";
import ChartHourProcedure from "../components/ChartHourProcedure";
import ChartHourInterval from "../components/ChartHourInterval";
import CarouselIndicators from "../components/CarouselIndicators";

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
        <Row>
          <Col span={24} style={{ padding: "15px 50px 50px" }}>
            <CarouselIndicators/>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <ListAnaesthetists filters={this.props.filters} />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <ChartAnestheticsInterval filters={this.props.filters} />
          </Col>
        </Row>
        <Row gutter={16} className="rowContainer">
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <ChartTopPharma filters={this.props.filters} />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <ChartTopGases filters={this.props.filters} />
          </Col>
        </Row>
        <Row gutter={16} className="rowContainer">
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <ChartHourProcedure filters={this.props.filters} />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <ChartHourInterval filters={this.props.filters} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomePage;
