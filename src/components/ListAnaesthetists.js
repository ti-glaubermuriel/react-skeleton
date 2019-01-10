import React, { Component } from "react";
import {
  Button,
  Card,
  Row,
  Col,
  List,
  Avatar,
  Skeleton,
  Modal,
  Divider,
  Icon,
  Tooltip
} from "antd";
import api from "../services/api";
import { LetterAvatar, FormatPeriodDB } from "../Utils";
import { getRequestFilters } from "../services/filters";
import { ConvertSecondsToHourMinute } from "../Utils";

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
    this.setState({
      modalVisible: false
    });
  };

  loadData = () => {
    this.setState({ initLoading: true });
    let objFilters = getRequestFilters();

    api
      .post("/dashboard/total/anaesthetists/", objFilters)
      .then(res => {
        const newData = [];
        res.data.forEach(function(value, index) {
          let timeTurnover = ConvertSecondsToHourMinute(value.turnover);
          newData.push({
            id: value.id,
            name: value.name,
            total: value.total,
            turnover: timeTurnover[0] + "h " + timeTurnover[1],
            hours: "03h 21"
          });
        });

        this.setState({
          initLoading: false,
          listAnesthetists: newData.slice(0, 5),
          listAllAnesthetists: newData
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.lastfilter !== nextProps.lastfilter) {
      this.loadData();
    }
  }

  componentDidMount() {
    if (this.props.lastfilter) {
      this.loadData();
    }
  }

  render() {
    const { initLoading, listAnesthetists } = this.state;

    return (
      <Card
        style={{ minHeight: 445, width: "100%" }}
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
        <Skeleton loading={initLoading} active paragraph={{ rows: 8 }}>
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={listAnesthetists}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{LetterAvatar(item.name)}</Avatar>}
                  title={item.name}
                  description={
                    <span>
                      {" "}
                      <Tooltip title="Horas trabalhadas">
                        <Icon type="clock-circle" /> 5h 30{" "}
                      </Tooltip>{" "}
                      <Divider type="vertical" />{" "}
                      <Tooltip title="Tempo médio de turnover">
                        <Icon type="retweet" /> {item.turnover}{" "}
                      </Tooltip>{" "}
                      <Divider type="vertical" />{" "}
                      <Tooltip title="Total de procedimentos">
                        <Icon type="file-add" /> {item.total}{" "}
                      </Tooltip>
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        </Skeleton>

        <Modal
          title="Top Anestesistas"
          zIndex="565565"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              type="primary"
              className="btn-custom-primary"
              onClick={this.handleCancel}
              key="1"
            >
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
                  title={item.name}
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
