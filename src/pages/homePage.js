import React, { Component } from "react";
import { Button, Icon, Card, Row, Col, List, Avatar, Skeleton } from "antd";
import api from "../services/api";
import { Link, withRouter } from "react-router-dom";
import { LetterAvatar } from "../Utils";

class homePage extends Component {
  state = {
    initLoading: true,
    listAnesthetists: []
  };

  removeLoading = () => {
    setTimeout(() => this.setState({ loading: false }), 3000);
  };

  componentDidMount() {
    console.log(LetterAvatar(""));

    const obj = {
      institution: {
        id: 348,
        active: true,
        uuid: "2BD499B3-81C6-4F2F-ACFB-BC8696946FBB"
      },
      period: ["2018-12-14", "2018-12-14"],
      user: {
        id: 1,
        uuid: "e500ffc7-1a51-4e8d-a72b-ed709a0cd7e5",
        email: "admin@anestech.com.br",
        active: true,
        type: "AD",
        anaesthetist_id: null,
        anaesthetist: null
      }
    };

    api
      .post("/dashboard/total/anaesthetists/", obj)
      .then(res => {
        console.log(res.data);

        this.setState({
          initLoading: false,
          listAnesthetists: res.data.slice(0, 5)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { initLoading, listAnesthetists } = this.state;

    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              style={{ minHeight: 520 }}
              title="Top Anestesistas"
              extra={
                <Button type="dashed" size="small" className="btn-details-all">
                  Ver todos
                </Button>
              }
            >
              <List
                itemLayout="horizontal"
                dataSource={listAnesthetists}
                renderItem={item => (
                  <Skeleton loading={initLoading} active avatar>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar>GL</Avatar>}
                        title={<a href="https://ant.design">{item.name}</a>}
                        description={item.total}
                      />
                    </List.Item>
                  </Skeleton>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default homePage;
