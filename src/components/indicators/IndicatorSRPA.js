import React, { Component } from "react";
import { Card, Spin, Button, Tooltip } from "antd";
import api from "../../services/api";
import { ConvertSecondsToHourMinute } from "../../Utils";
import { getRequestFilters } from "../../services/filters";

class IndicatorSRPA extends Component {
  state = {
    loading: true,
    hour: null,
    minute: null
  };

  loadData = () => {
    this.setState({ loading: true, value: null, listConvenios: null });
    let objFilters = getRequestFilters();

    api
      .post("dashboard/total/srpa/", objFilters)
      .then(res => {
        let arrayTime = ConvertSecondsToHourMinute(res.data);

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
          <div className="card-sub-title">Tempo médio em SRPA</div>
          <div className="card-info">
            <Tooltip
              placement="topLeft"
              title="Tempo médio de permanência na sala de recuperação pós-anestésica."
            >
              <Button shape="circle" icon="info" className="btn-card-details" />
            </Tooltip>
          </div>
        </Card>
      </div>
    );
  }
}

export default IndicatorSRPA;
