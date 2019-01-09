import React, { Component } from 'react';
import { Button, Card, Spin } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import api from "../services/api";
import { getRequestFilters } from "../services/filters";


class ChartTopGases extends Component {

  state = {
    loading: true,
    series: [{
      data: []
    }]
  }


  loadData = () => {

    this.setState({ 'loading': true });
    let objFilters = getRequestFilters();

    api
      .post("dashboard/consumption_data/inhalationals/", objFilters)
      .then(res => {


        const newData = [];
        res.data.labels.forEach(function (value, index) {
          newData.push({ "name": value, "y": res.data.values[index], 'dose_media': res.data.tooltips[index][0] });
        });

        this.setState({
          loading: false,
          series: [{
            name: 'Gases',
            colorByPoint: true,
            data: newData
          }]
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

  };


  componentDidMount() {

    if (this.props.lastfilter) {
      this.loadData();
    }

  };

  render() {
    let options = {
      credits: { enabled: false },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        margin: [0, 0, 80, 0],
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: -5,
        spacingRight: 0,
        height: '325',
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: ' {point.percentage:.1f}% ({point.y} usos) <br> Dosagem média: {point.dose_media}',
        backgroundColor: "rgba(0, 0, 0, 0.70)",
        borderWidth: 0,
        borderRadius: 5,
        shadow: false,
        useHTML: true,
        style: {
          padding: 0,
          color: "white"
        }
      },
      
      legend: {
        align: 'left',
        layout: 'horizontal',
        verticalAlign: 'bottom',
        x: 0,
        y: 0
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true,
          size: '100%',
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
      series: this.state.series
    };

    return (
      <div >
        <Card
          style={{ minHeight: 445, width: "100%" }}
          title="Top Gases"
        >
          <Spin className="ant-spin-lg" spinning={this.state.loading}>
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
          </Spin>
        </Card>
      </div>
    );
  }
}

export default ChartTopGases;