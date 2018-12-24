import React, { Component } from "react";
import {
  Layout,
  Menu,
  Button,
  Select,
  Avatar,
  Dropdown,
  Divider,
  DatePicker,
  Tag,
  Radio,
  Icon
} from "antd";
import moment from "moment";
import "moment/locale/pt-br";
import locale from "antd/lib/date-picker/locale/pt_BR";

const { Header } = Layout;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const SelectData = (props) => {
  console.log(props);

  return (
    'dsdsdsds'
  )
};

class HeaderComponent extends Component {
  state = {
    institutions: this.props.filters.institutions
  };

  changeShortDate = e => {
    this.setState({ shortDate: e.target.value });
    this.props.setdate(e.target.value, []);
  };

  componentDidMount() {
    console.log("LOAD HEADER");
    console.log(this.props.filters);
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
          <a rel="noopener noreferrer" href="" style={{ color: "red" }}>
            Encerrar sessão
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header style={{ position: "fixed", zIndex: 1024, width: "100%" }}>
        <Dropdown overlay={menuUser} trigger={["click"]}>
          <Button
            type="primary"
            shape="circle"
            icon="user"
            className="btn-custom-primary"
          />
        </Dropdown>


        <div style={{ float: "right" }}>
          <Radio.Group
            value={this.props.filters.shortDate}
            onChange={this.changeShortDate}
            style={{ marginRight: "5px" }}
          >
            <Radio.Button value="6">Semestre</Radio.Button>
            <Radio.Button value="3">Trimestre</Radio.Button>
            <Radio.Button value="1">Mês</Radio.Button>
          </Radio.Group>

          <RangePicker
            locale={locale}
            value={[
              moment(this.props.filters.period[0], "DD/MM/YYYY"),
              moment(this.props.filters.period[1], "DD/MM/YYYY")
            ]}
            format="DD/MM/YYYY"
            onChange={this.props.setdate}
          />
        </div>
      </Header>
    );
  }
}

export default HeaderComponent;
