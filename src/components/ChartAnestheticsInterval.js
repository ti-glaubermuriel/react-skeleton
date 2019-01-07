import React, { Component } from 'react';
import { Button, Card, Icon, Spin} from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import {loadDataAnesthetics} from "../services/storeTemp";



let arrayData = loadDataAnesthetics();




Highcharts.setOptions({
    lang:
    {
      loading: 'Carregando ...',
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      exportButtonTitle: "Exportar",
      printButtonTitle: "Imprimir",
      rangeSelectorFrom: "De",
      rangeSelectorTo: "Até",
      rangeSelectorZoom: "Periodo",
      downloadPNG: 'Download imagem PNG',
      downloadJPEG: 'Download imagem JPEG',
      downloadPDF: 'Download documento PDF',
      downloadSVG: 'Download imagem SVG',
      printChart: 'Imprimir Gráfico',
      resetZoom: 'Resetar Zoom',
      thousandsSep: ".",
      decimalPoint: ','
    }

  });
  



class ChartAnestheticsInterval extends Component {
  state = {
    loading: true,
    categories: [],
    series: [{
        data: []
      }]
  }


  loadData = () => {

        this.setState({loading: true});

        setTimeout(() => {
            this.setState({loading: false});
        }, 500);

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

      let  options = {
        credits: { enabled: false },
        chart: {
          zoomType: 'x',
          height: '325',
        },
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          type: 'datetime'
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

        series: [{
          type: 'area',
          name: 'Procedimentos',
          color: '#1bbfbb',
          data: arrayData
        }],
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
      };

        return (
            <div >
                <Card
                    style={{ minHeight: 445, width: "100%" }}
                    title="Procedimentos no período"
                    extra={<small> Selecione período para zoom <Icon type="zoom-in" /></small>}
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

export default ChartAnestheticsInterval;