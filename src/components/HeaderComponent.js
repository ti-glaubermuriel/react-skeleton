import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";
import {
  Layout,
  Menu,
  Row, Col,
  Button,
  Select,
  Avatar,
  Dropdown,
  Divider,
  DatePicker,
  Radio,
  Spin
} from "antd";
import moment from "moment";
import "moment/locale/pt-br";
import locale from "antd/lib/date-picker/locale/pt_BR";
import iconHeader from "../assets/logo-header.png";
import { PeriodSubtractMonth, FormatPeriodDB } from "../Utils";
import api from "../services/api";
import { getFilters, setFilters } from "../services/filters";

const { Header } = Layout;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const SelectInstituicao = (props) => {
  const options = props.institutions.map(d => <Option key={d.id}>{d.name}</Option>);
  let count = props.institutions.length;
  console.log(props.institutions.length);
  
  return (
    <Select 
    value={props.institution ? props.institution: undefined}
    showSearch
    onChange={props.selected}
    allowClear={props.institutions.length == 1 ? false : true}
    notFoundContent="Não encontrado"
    style={{ width: 350 }}
    placeholder={"Todas instituições (" + count + ")"}
    optionFilterProp="children"
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
    {options}
  </Select>
  )
};

class HeaderComponent extends Component {  
  state = {
    initLoading: true,
    listInstitutions: [],
    shortDate: "", //number month
    institution: null,
    period: []
  };

  
  locationHome = e => {
    window.location = window.location.origin + '/app/home';
  };

  HandleLogout = e => {
    logout();
  };
  
  InitFilters = () =>{
    this.setState({initLoading: true});

    let filtersExists = getFilters();

    if(filtersExists){

      let objState = {initLoading: false, 
        shortDate: filtersExists.shortDate, 
        listInstitutions: filtersExists.listInstitutions, 
        period: filtersExists.period, 
        institution: filtersExists.institution};

        this.setState(objState, () => {
          this.SetStateFilters() // set state global App
        });

    }
    else{
      api
      .get("/web/institutions/")
      .then(res => {

        //res.data = res.data.slice(0, 1);

        const defaultInstitution = (res.data.length == 1) ? res.data[0].id.toString() : null;

        const objState = {initLoading: false, 
          shortDate: '1', 
          listInstitutions: res.data, 
          period: PeriodSubtractMonth(1), 
          institution: defaultInstitution };

          this.setState(objState, () => {
            this.SetStateFilters() // set state global App
            this.SetStateStorage();// save local storage
          });
          
      })
      .catch(error => {
        console.log(error);
      });
    }

  };

  changeShortPeriod = e => {
    this.setState({ period: PeriodSubtractMonth(e.target.value), shortDate: e.target.value }, () => {
      this.SetStateFilters() // set state global App
      this.SetStateStorage();// save local storage
    });
  };

   // set state filter period - component -> ant design
   changePeriod = (value, dateSelected) => {
    this.setState({ period: dateSelected, shortDate: "0" }, () => {
      this.SetStateFilters() // set state global App
      this.SetStateStorage();// save local storage
    });

    

  };

  changeInstitution = value => {
    let id = (value) ? value : null;
    console.log('MUDOUUUUU' + id);
    
    this.setState({ institution: id}, () => {
      this.SetStateFilters() // set state global App
      this.SetStateStorage();// save local storage
    });

    
  };

  // set state global filters
  SetStateFilters= () => {
    let timestamp = moment.utc(moment().format("YYYY-MM-DD HH:mm:ss:SSS")).valueOf();
    this.props.setglobalstate(timestamp); // edit state global App
  };

  // set state filter localstorage
  SetStateStorage= () => {
    let objState = {
      shortDate: this.state.shortDate, 
      listInstitutions: this.state.listInstitutions, 
      period: this.state.period, 
      institution: this.state.institution };
      setFilters(objState);// save local storage
  };


  componentDidMount() {
    console.log("INIT HEADER");
    this.InitFilters();
  }


  render() {
    const menuUser = (
      <Menu mode="inline" style={{ width: 250 }}>
        <Menu.Item>
          <div className="ant-list-item-meta">
            <div className="ant-list-item-meta-avatar">
              <span
                className="ant-avatar ant-avatar-circle ant-avatar-image"
                style={{ marginTop: 5 }}
              >
                <Avatar>GV</Avatar>
              </span>
            </div>
            
            <div className="ant-list-item-meta-content">
              <h4
                className="ant-list-item-meta-title"
                style={{ marginBottom: -5 }}
              >
                George Vitoriano
              </h4>
              <div className="ant-list-item-meta-description">
                <small>Administrador</small>
              </div>
            </div>
          </div>
        </Menu.Item>
        <Divider style={{ margin: "5px 0" }} />
        <Menu.Item>
          <a onClick={this.HandleLogout} rel="noopener noreferrer" href="" style={{ color: "red" }}>
            Encerrar sessão
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header style={{ position: "fixed", zIndex: 1024, width: "100%" }}>
     
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        
        <div className="container-logo" >
          <a onClick={this.locationHome}><img src={iconHeader} alt="Logo" /> </a> 
        </div>
        

        <SelectInstituicao institutions={this.state.listInstitutions} institution={this.state.institution} selected={this.changeInstitution} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: "right" }}>
        <Radio.Group
            value={this.state.shortDate}
            onChange={this.changeShortPeriod}
            style={{ marginRight: "5px" }}
          >
            <Radio.Button value="6">Semestre</Radio.Button>
            <Radio.Button value="3">Trimestre</Radio.Button>
            <Radio.Button value="1">Mês</Radio.Button>
          </Radio.Group>

          <RangePicker
            locale={locale}
            value={[
              moment(this.state.period[0], "DD/MM/YYYY"),
              moment(this.state.period[1], "DD/MM/YYYY")
            ]}
            format="DD/MM/YYYY"
            onChange={this.changePeriod}
          />

        <div className="container-menu-user">
        
        <Dropdown overlay={menuUser} trigger={["click"]}>
          <Button
            type="primary"
            shape="circle"
            icon="user"
            className="btn-custom-primary" 
          />
        </Dropdown>
        </div>
        </Col>
      </Row>

      </Header>
    );
  }
}

export default HeaderComponent;
