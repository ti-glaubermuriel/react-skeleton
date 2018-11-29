import React, { Component } from 'react';
import { Layout, Menu, Button, Icon, Select, Card, Row, Col, Avatar, Spin, Dropdown, Divider   } from 'antd';
import Slider from "react-slick";
import iconColor from './assets/icon_color.png';
import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;


class App extends Component {

  render() {
    const settings = {
      dots: true, 
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
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
          <Button type="primary" shape="circle" icon="user" />
         </Dropdown>

        

          <Select defaultValue="1"  className="select-drop" style={{ width: 200 }} >
            <Option value="1">Hospital Santa Lúcia</Option>
            <Option value="2">Hospital das Clínicas USP</Option>
            <Option value="Yiminghe">Hospital Samaritano</Option>
          </Select>

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
                  <div><div style={{padding: '0px 30px 10px 30px'}}><Card className="card-indicator"> <Spin size="large" /> </Card></div></div>
                  <div><div style={{padding: '0px 30px 10px 30px'}}><Card><p>2</p></Card></div></div>
                  <div><div style={{padding: '0px 30px 10px 30px'}}><Card><p>3</p></Card></div></div>
                  <div><div style={{padding: '0px 30px 10px 30px'}}><Card><p>4</p></Card></div></div>
                  <div><div style={{padding: '0px 30px 10px 30px'}}><Card><p>5</p></Card></div></div>
                  <div><div style={{padding: '0px 30px 10px 30px'}}><Card><p>6</p></Card></div></div>
                  <div><div style={{padding: '0px 30px 10px 30px'}}><Card><p>7</p></Card></div></div>
                  <div><div style={{padding: '0px 30px 10px 30px'}}><Card><p>8</p></Card></div></div>
                  <div><div style={{padding: '0px 30px 10px 30px'}}><Card><p>9</p></Card></div></div>
                  </Slider>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card title="Top Anestesistas" extra={<Button type="dashed" size="small" className="btn-details-all">Ver todos</Button>} loading={true} avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}>
                    <p>Top Anestesias</p>
                    </Card>
                  </Col>
                  <Col span={16}>
                  <Card title="Top Fármacos" extra={<Button type="dashed" size="small" className="btn-details-all">Ver todos</Button>}loading={true} avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}>
                    <p>Card content</p>
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
