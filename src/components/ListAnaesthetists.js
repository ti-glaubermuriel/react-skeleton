import React, { Component } from "react";
import { Button, Card, Row, Col, List, Avatar, Skeleton, Modal } from "antd";
import api from "../services/api";
import { LetterAvatar, FormatPeriodDB } from "../Utils";

class ListAnaesthetists extends Component {
  state = {
    modalVisible: false,
    initLoading: true,
    listAnesthetists: [],
    listAllAnesthetists: []
  };

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      modalVisible: false
    });
  };


  loadData = () => {
    console.log('## load data ##');

    this.setState({'initLoading': true});
    
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
        
        //setTimeout(() => this.setState({initLoading: false,listAnesthetists: res.data.slice(0, 5), listAllAnesthetists: res.data}), 3000);

        this.setState({
          initLoading: false,
          listAnesthetists: res.data.slice(0, 5),
          listAllAnesthetists: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });

  };



  componentWillReceiveProps(nextProps) {
    if(this.props.filters.period !== nextProps.filters.period){
      console.log("UPDATE FILTERS COMP LIST")
      this.loadData();
    }
  };

  componentDidMount() {
    console.log("LOAD COMP LIST");
    this.loadData();
  }

  render() {
    const { initLoading, listAnesthetists } = this.state;

    return (
      <Card
        style={{ minHeight: 420, width: "100%" }}
        title="Top Anestesistas"
        extra={
          <Button
            type="dashed"
            size="small"
            className="btn-details-all"
            onClick={this.showModal}
          >
            Ver todos
          </Button>
        }
      >
        <Skeleton loading={initLoading} active paragraph={{ rows: 10 }}>
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={listAnesthetists}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{LetterAvatar(item.name)}</Avatar>}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={<span>{item.total} Procedimentos</span>}
                />
              </List.Item>
            )}
          />
        </Skeleton>
        <Modal
          title="Top Anestesistas"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button type="primary" onClick={this.handleOk}>
              OK
            </Button>
          ]}
        >
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={this.state.listAllAnesthetists}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{LetterAvatar(item.name)}</Avatar>}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={<span>{item.total} Procedimentos</span>}
                />
              </List.Item>
            )}
          />
        </Modal>
      </Card>
    );
  }
}

export default ListAnaesthetists;
