import React, { Component } from "react";
import { Card, Spin, Button, Modal, Tooltip } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import api from "../../services/api";
import { getRequestFilters } from "../../services/filters";

class IndicatorAdverseEvents extends Component {
  state = {
    loading: true,
    value: null,
    categories: [],
    series: [
      {
        showInLegend: false,
        name: " ",
        data: []
      }
    ]
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
    this.setState({ loading: true, value: null, listConvenios: null });
    let objFilters = getRequestFilters();

    api
      .post("dashboard/adverse_events/", objFilters)
      .then(res => {
        this.setState({
          loading: false,
          value: res.data.total.toString(),
          categories: res.data.labels,
          series: [
            {
              showInLegend: false,
              name: " ",
              data: res.data.values
            }
          ]
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
    let options = {
      chart: {
        type: "bar",
        height: "90%"
      },
      credits: {
        enabled: false
      },
      title: {
        text: ""
      },
      xAxis: {
        categories: this.state.categories
      },
      yAxis: {
        min: 0,
        title: {
          text: "Quantidade de eventos"
        }
      },
      plotOptions: {
        bar: {
          colorByPoint: true
        }
      },
      colors: [
        "#F07396",
        "#FF9F40",
        "#FFCD56",
        "#4BBFBF",
        "#36A2EB",
        "#9966FF",
        "#C9CBCF",
        "#62D171",
        "#E270EF",
        "#E35C5C"
      ],
      series: this.state.series,
      tooltip: {
        pointFormat: "{point.y} evento(s)",
        backgroundColor: "rgba(0, 0, 0, 0.70)",
        borderWidth: 0,
        borderRadius: 5,
        shadow: false,
        useHTML: true,
        style: {
          padding: 0,
          color: "white"
        }
      }
    };
    return (
      <div>
        <Card className="card-indicator">
          <div className="card-details">
            <Tooltip placement="topLeft" title="Visualizar detalhes">
              <Button
                shape="circle"
                icon="search"
                className="btn-card-details"
                onClick={this.showModal}
              />
            </Tooltip>
          </div>
          <div className="card-number">
            <span>
              <Spin className="ant-spin-lg" spinning={this.state.loading}>
                &nbsp;
                {this.state.value}
              </Spin>
            </span>
          </div>
          <div className="card-sub-title">Eventos adversos</div>
        </Card>

        <Modal
          title="Eventos adversos"
          zIndex="565565"
          key="1"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              type="primary"
              className="btn-custom-primary"
              key="1"
              onClick={this.handleCancel}
            >
              OK
            </Button>
          ]}
        >
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Modal>
      </div>
    );
  }
}

export default IndicatorAdverseEvents;
