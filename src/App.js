import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import locale from 'antd/lib/date-picker/locale/pt_BR';
import { Layout, Menu, Button, Icon, Select, Card, Row, Col, Avatar, Spin, Dropdown, Divider, DatePicker, Tag      } from 'antd';
import Slider from "react-slick";
import iconColor from './assets/icon_color.png';
import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const options = {
  chart: {
      type: 'bar'
  },
  credits: {
    enabled: false
  },
  title: {
      text: ''
  },
  xAxis: {
      categories: ['Propofol', 'Fentanil', 'Cefazolina', 'Dipirona', 'Ondasetrona', 'Dexametasona', 'Midazolan', 'Lidocaína', 'Atropina','Metaramidol']
  },
  yAxis: {
      min: 0,
      title: {
          text: ''
      }
  },
  plotOptions: {
      bar: {
          'colorByPoint': true
      }
  },
  colors : ['#F07396', '#FF9F40', '#FFCD56', '#4BBFBF', '#36A2EB', '#9966FF', '#C9CBCF', '#62D171', '#E270EF', '#E35C5C'],
  series: [{
      showInLegend: false,
      name: ' ',
      data: [150, 133, 121, 118, 99, 86, 81, 68, 53, 51],
      colors : ['#F07396', '#FF9F40', '#FFCD56', '#4BBFBF', '#36A2EB', '#9966FF', '#C9CBCF', '#62D171', '#E270EF', '#E35C5C']
  }],
  tooltip: {
    backgroundColor: 'gray',
    borderWidth: 0,
    shadow: false,
    useHTML: true,
    style: {
        padding: 0,
        color: 'white'
    }
}
}

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'DD/MM/YYYY';


class App extends Component {

  render() {
    const settings = {
      dots: true, 
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        }
      ]
      /*autoplay: true,
      autoplaySpeed: 5000*/
    };

    const menuUser = (

      <Menu  mode="inline" style={{width: 250}}>
        <Menu.Item>
        <div className="ant-list-item-meta">
        <div className="ant-list-item-meta-avatar">
        <span className="ant-avatar ant-avatar-circle ant-avatar-image" style={{marginTop: 5}}>
        <Avatar>GV</Avatar>
        </span>
        </div>
        <div className="ant-list-item-meta-content">
        <h4 className="ant-list-item-meta-title" style={{marginBottom: -5}}>George Vitoriano</h4>
        <div className="ant-list-item-meta-description"><small>Administrador</small></div>
        </div>
        </div>
        </Menu.Item>
        <Divider style={{margin: '5px 0'}} />
         <Menu.Item>
          <a rel="noopener noreferrer" href="" style={{color: 'red'}}>Encerrar sessão</a>
        </Menu.Item>
       
      </Menu>
    );

    const antIcon = <Icon type="loading" style={{ fontSize: 38 }} spin />;

    return (
      <Layout style={{ minHeight: '100vh', padding: 0 }}>

        <Header style={{ position: 'fixed', zIndex: 1024, width: '100%' }}>

         <Dropdown overlay={menuUser} trigger={['click']}>
          <Button type="primary" shape="circle" icon="user" className="btn-custom-primary" />
         </Dropdown>

        

          <Select defaultValue="1"  className="select-drop">
            <Option value="1">Hospital Santa Lúcia</Option>
            <Option value="2">Hospital das Clínicas USP</Option>
            <Option value="Yiminghe">Hospital Samaritano</Option>
          </Select>


          <div style={{float: "right"}}>    
          <Tag>29 dias</Tag>


          <RangePicker locale={locale}  defaultValue={[moment('02/10/2018', dateFormat), moment('01/11/2018', dateFormat)]} format={dateFormat}/>
          </div>
        </Header>

        <Layout >

          <Sider width={200} style={{ position: 'fixed', zIndex: 1023, minHeight: '100vh', background: '#fff', padding: '70px 0 0 0' }}>
   
          <Row style={{marginLeft: '24px', fontSize: '16px', paddingBottom: '10px'}}><b style={{verticalAlign: '-webkit-baseline-middle'}}>Indicadores</b> <Button style={{float: 'right',marginRight: '8px'}}  shape="circle" icon="setting" /></Row> 
            
            
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Icon type="line-chart" />
                <span>Visão geral</span>
              </Menu.Item>

              <Menu.Item key="2">
                <Icon type="medicine-box" />
                <span>Fármacos</span>
              </Menu.Item>

              <Menu.Item key="3">
                <Icon type="clock-circle" />
                <span>Tempo cirúrgico</span>
              </Menu.Item>
            </Menu>

          </Sider>
          <Layout style={{ padding: '80px 20px 20px 220px' }}>
            <h1  className="title"> <Icon type="line-chart" /> Visão geral</h1>
            <Content>
                <Row >
                <Col span={24} style={{padding: '15px 50px 50px'}}>
                <Slider {...settings} >
                  <div>
                    <div style={{padding: '0px 25px 10px 25px'}}>
                      <Card className="card-indicator"> 
                        <div className="card-number">
                          <h2>340</h2>
                        </div>
                        <div className="card-sub-title">
                          Pacientes atendidos
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <div style={{padding: '0px 25px 10px 25px'}}>
                      <Card className="card-indicator"> 
                        <div className="card-number">
                          <h2>414</h2>
                        </div>
                        <div className="card-sub-title">
                          Procedimentos
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <div style={{padding: '0px 25px 10px 25px'}}>
                      <Card className="card-indicator"> 
                        <div className="card-number">
                          <h2>34</h2>
                        </div>
                        <div className="card-sub-title">
                          Eventos adversos
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <div style={{padding: '0px 25px 10px 25px'}}>
                      <Card className="card-indicator"> 
                        <div className="card-number">
                          <h2>53</h2>
                        </div>
                        <div className="card-sub-title">
                          Turnover médio de salas
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div><div style={{padding: '0px 25px 10px 25px'}}><Card><p>5</p></Card></div></div>
                  <div><div style={{padding: '0px 25px 10px 25px'}}><Card><p>6</p></Card></div></div>
                  <div><div style={{padding: '0px 25px 10px 25px'}}><Card><p>7</p></Card></div></div>
                  <div><div style={{padding: '0px 25px 10px 25px'}}><Card><p>8</p></Card></div></div>
                  <div><div style={{padding: '0px 25px 10px 25px'}}><Card><p>9</p></Card></div></div>
                  </Slider>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card title="Top Anestesistas" extra={<Button type="dashed" size="small" className="btn-details-all">Ver todos</Button>} loading={true} avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}>
                    
                    </Card>
                  </Col>
                  <Col span={16}>
                  <Card title="Top Fármacos" extra={<Button type="dashed" size="small" className="btn-details-all">Ver todos</Button>}loading={false} avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                      />
                    </Card>
                  </Col>
                </Row>
            </Content>

            <Footer style={{ textAlign: 'center', paddingTop: 50  }}>
              Powered by <img src={iconColor} alt="Logo" />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
