import React, { Component } from 'react';
import { Layout, List, Menu, Button, Icon, Select, Card, Row, Col } from 'antd';
import iconColor from './assets/icon_color.png';
import './App.css';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;


class App extends Component {

  render() {
    return (
      <Layout style={{ minHeight: '100vh', padding: 0 }}>

        <Header style={{ position: 'fixed', zIndex: 1024, width: '100%' }}>

          <Select defaultValue="lucy" style={{ width: 120 }} >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
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
          <Layout style={{ padding: '70px 20px 20px 220px' }}>

            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              Content
        </Content>

            <Footer style={{ textAlign: 'center' }}>
              Powered by <img src={iconColor} alt="Logo" />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
