import React, { Component } from 'react';
import { Button, Card, Spin, Select } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import api from "../services/api";
import {getRequestFilters} from "../services/filters";


const Option = Select.Option;

class ChartHourInterval extends Component {
    state = {
        loading: true,
        series: [{
            data: []
          }]
      }

    loadData = () => {
        
        this.setState({'loading': true});
        let objFilters = getRequestFilters();

        api
          .post("dashboard/total/procedure_start/", objFilters)
          .then(res => {
            

            this.setState({
              loading: false,
              
              series: [{
                name: 'Procedimentos',
                innerSize: '70%',
                showInLegend: true,
                dataLabels: {
                    enabled: false
                },
                colorByPoint: true,
                data: [ {"name":"Entre horários","color":"#f07396","y":res.data.started, sliced: true, selected: true}, {"name":"Total","color":"#4bbfbf","y":res.data.total}]
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
              pointFormat: ' {point.percentage:.0f}% - {point.y} Cirurgia(s)'
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
            series:  this.state.series
          };

        return (
            <div>
                <Card
                    style={{ minHeight: 445, width: "100%" }}
                    title="Cirurgias iniciadas entre"
                    extra={<Select defaultValue="lucy">
                    <Option value="jack">07:30 às 08:30</Option>
                    <Option value="jack">07:30 às 08:30</Option>
                    <Option value="lucy">08:30 às 09:30</Option>
                    <Option value="jack">07:30 às 08:30</Option>
                    <Option value="jack">07:30 às 08:30</Option>
                    <Option value="jack">07:30 às 08:30</Option>
                    <Option value="jack">07:30 às 08:30</Option>
                    <Option value="jack">07:30 às 08:30</Option>
                  </Select>}
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

export default ChartHourInterval;