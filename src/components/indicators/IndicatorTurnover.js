import React, { Component } from "react";
import { Card, Spin, Button, Tooltip } from "antd";
import api from "../../services/api";
import { ConvertSecondsToHourMinute } from "../../Utils";
import { getRequestFilters } from "../../services/filters";

class IndicatorTurnover extends Component {
  state = {
    loading: true,
    hour: null,
    minute: null
  };

  loadData = () => {
    this.setState({ loading: true, value: null });
    let objFilters = getRequestFilters();

    api
      .post("dashboard/total/turnover/", objFilters)
      .then(res => {
        let arrayTime = ConvertSecondsToHourMinute(res.data.avg_turnover);

        this.setState({
          loading: false,
          hour: arrayTime[0].toString(),
          minute: arrayTime[1].toString()
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
    return (
      <div>
        <Card className="card-indicator">
          <div className="card-details">
            <Tooltip placement="topLeft" title="Visualizar detalhes">
              <Button
                shape="circle"
                key="1"
                icon="search"
                className="btn-card-details"
              />
            </Tooltip>
          </div>
          <div className="card-number">
            <span>
              <Spin className="ant-spin-lg" spinning={this.state.loading}>
                &nbsp;
                {this.state.hour}
                <small>
                  {this.state.hour ? "h" : ""} {this.state.minute}
                </small>
              </Spin>
            </span>
          </div>
          <div className="card-sub-title">Média do Turnover de Salas</div>
          <div className="card-info">
            <Tooltip
              placement="topLeft"
              title="Tunorver é o tempo médio em que cada sala fica ociosa na instituição."
            >
              <Button shape="circle" icon="info" className="btn-card-details" />
            </Tooltip>
          </div>
        </Card>
      </div>
    );
  }
}

export default IndicatorTurnover;
