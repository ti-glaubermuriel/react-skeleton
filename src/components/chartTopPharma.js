import React, { Component } from 'react';
import { Button, Card, Spin, Select, Modal  } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import api from "../services/api";
import { getRequestFilters } from "../services/filters";

class ChartTopPharma extends Component {

  state = {
    loading: true,
    modalVisible: false,
    categories: [],
    series: [{
      showInLegend: false,
      name: " ",
      data: []
    }],
    categoriesModal: [],
    seriesModal: [{
      showInLegend: false,
      name: " ",
      data: []
    }]
  }


  
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

    this.setState({ 'loading': true });
    let objFilters = getRequestFilters();

    api
      .post("dashboard/consumption_data/drugs/", objFilters)
      .then(res => {

        // convert array in string html tootip
        const newData = [];
        res.data.values.forEach(function (value, index) {

          let tootipHtml = "";

          res.data.tooltips[index].forEach(function (valueTootip, indexTootip) {
              tootipHtml += "<br>" + valueTootip
          });

          newData.push({y: value, 'tootip': tootipHtml });

        });


        this.setState({
          loading: false,
          categories: res.data.labels.slice(0, 10), 
          series: [{
            showInLegend: false,
            name: " ",
            data: newData.slice(0, 10)
          }]
          ,
          categoriesModal: res.data.labels, 
          seriesModal: [{
            showInLegend: false,
            name: " ",
            data: newData
          }]
        });


      })
      .catch(error => {
        console.log(error);
      });

  };


  componentWillReceiveProps(nextProps) {
    console.log('HOUR INTERVAL');

    console.log(nextProps);

    if (this.props.lastfilter !== nextProps.lastfilter) {
      this.loadData();
    }
  };


  componentDidMount() {

    if (this.props.lastfilter) {
      this.loadData();
    }

  };

  render() {

    let options = {
      chart: {
        type: "bar",
        height: '325'
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
          text: ""
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
        pointFormat: '{point.y} usos {point.tootip}',
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

    let optionsModal = {
      chart: {
        type: "bar",
        height: '1300'
      },
      credits: {
        enabled: false
      },
      title: {
        text: ""
      },
      xAxis: {
        categories: this.state.categoriesModal
      },
      yAxis: {
        min: 0,
        title: {
          text: ""
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
      series: this.state.seriesModal,
      tooltip: {
        pointFormat: '{point.y} usos {point.tootip}',
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
        <Card
          style={{ minHeight: 445 }}
          title="Top Fármacos"
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
          <Spin className="ant-spin-lg" spinning={this.state.loading}>
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
          </Spin>

           <Modal
          title="Top Fármacos"
          zIndex="565565"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{ minWidth: '800px'}}
          footer={[
            <Button type="primary" onClick={this.handleOk}>
              OK
            </Button>
          ]}
        >
         <HighchartsReact
              highcharts={Highcharts}
              options={optionsModal}
            />
        </Modal>

        </Card>
      </div>
    );
  }
}

export default ChartTopPharma;