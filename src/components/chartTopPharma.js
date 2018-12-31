import React, { Component } from 'react';
import { Button, Card, Avatar} from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";



const options = {
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
      categories: [
        "Propofol",
        "Fentanil",
        "Cefazolina",
        "Dipirona",
        "Ondasetrona",
        "Dexametasona",
        "Midazolan",
        "Lidocaína",
        "Atropina",
        "Metaramidol"
      ]
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
    series: [
      {
        showInLegend: false,
        name: " ",
        data: [150, 133, 121, 118, 99, 86, 81, 68, 53, 51],
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
        ]
      }
    ],
    tooltip: {
      backgroundColor: "gray",
      borderWidth: 0,
      shadow: false,
      useHTML: true,
      style: {
        padding: 0,
        color: "white"
      }
    }
  };

class ChartTopPharma extends Component {
    render() {
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
                      >
                        Ver todos
                      </Button>
                    }
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

export default ChartTopPharma;