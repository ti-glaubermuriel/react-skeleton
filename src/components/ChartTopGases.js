import React, { Component } from 'react';
import { Button, Card, Avatar} from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const options = {
    credits: { enabled: false },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      margin: [0, 0, 0, 0],
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0,
        height: '325'
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: ' {point.percentage:.1f}% ({point.y} usos)'
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'bottom',
      floating: true
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true,
            size:'80%',
        }
    },
    series: [{
      name: 'Gases',
      colorByPoint: true,
      data: [{"name":"Oxigênio","color":"#f07396","y":37}, {"name":"Sevoflurano","color":"#ff9f40","y":11}, {"name":"Ar comprimido","color":"#ffcd56","y":37}, {"name":"NO2","color":"#4bbfbf","y":7}]
    }]
  };

class ChartTopGases extends Component {
    render() {
        return (
            <div >
            <Card
                style={{ minHeight: 445, width: "100%" }}
                title="Top Gases"
              >
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
                />
                 
              </Card>
        </div>
        );
    }
}

export default ChartTopGases;