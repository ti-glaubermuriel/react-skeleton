import React, { Component } from 'react';
import { Button, Card, Spin, Select } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import api from "../services/api";


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
        
        const obj = {
          institution: {
            id: 348,
            active: true,
            uuid: "2BD499B3-81C6-4F2F-ACFB-BC8696946FBB"
          },
          period: ["2018-12-01", "2018-12-14"],
          user: {
            id: 1,
            uuid: "e500ffc7-1a51-4e8d-a72b-ed709a0cd7e5",
            email: "admin@anestech.com.br",
            active: true,
            type: "AD",
            anaesthetist_id: null,
            anaesthetist: null
          }
        };

        api
          .post("dashboard/total/procedure_start/", obj)
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
        if(this.props.filters.period !== nextProps.filters.period){
          console.log("UPDATE FILTERS COMP LIST")
          this.loadData();
        }
      };
    
      componentDidMount() {
        console.log("LOAD COMP LIST");
        this.loadData();
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