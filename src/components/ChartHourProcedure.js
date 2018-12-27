import React, { Component } from 'react';
import { Button, Card, Spin} from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import api from "../services/api";



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
          .post("dashboard/procedures_start_time/", obj)
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
        
            series: this.state.series
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