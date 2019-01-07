import React, { Component } from 'react';
import { Button, Card, Spin} from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import api from "../services/api";
import {getRequestFilters} from "../services/filters";



class ChartHourProcedure extends Component {
    state = {
        loading: true,
        categories: [],
        series: [{
            data: []
          }]
      }

    loadData = () => {
        
        this.setState({'loading': true});
        let objFilters = getRequestFilters();

        api
          .post("dashboard/procedures_start_time/", objFilters)
          .then(res => {
            

            this.setState({
              loading: false,
              categories: res.data.labels,
              series: [{
                type: 'line',
                name: 'Procedimentos',
                color: '#1bbfbb',
                data: res.data.data
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
              height: '325',
            },
            title: {
              text: ''
            },
            subtitle: {
              text: ''
            },
            xAxis: {
                categories: this.state.categories
            },
            yAxis: {
              title: {
                text: ''
              }
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            
                            [0, '#ddf6f6'],
                            [1, '#1bbfbb']
                        ]
                    }
                }
            },
            legend: {
              enabled: false
            },
        
            series: this.state.series,
            tooltip: {
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
          }

        return (
            <div>
                <Card
                    style={{ minHeight: 445, width: "100%" }}
                    title="Horário de início de cirurgias"
                  >
                  <Spin className="ant-spin-lg" spinning={this.state.loading}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={options}
                      oneToOne={true}
                    />
                     </Spin>
                  </Card>
            </div>
        );
    }
}

export default ChartHourProcedure;