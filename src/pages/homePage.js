import React, { Component } from "react";
import { Button, Card, Row, Col} from "antd";
import { Link, withRouter } from "react-router-dom";
import ListAnaesthetists from "../components/ListAnaesthetists";


class homePage extends Component {
  removeLoading = () => {
    setTimeout(() => this.setState({ loading: false }), 3000);
  };

  componentDidMount() {
    console.log('LOAD APP');
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
           <ListAnaesthetists></ListAnaesthetists>
          </Col>
        </Row>
      </div>
    );
  }
}

export default homePage;
