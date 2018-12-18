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
  Tag
} from "antd";
import moment from "moment";
import "moment/locale/pt-br";
import locale from "antd/lib/date-picker/locale/pt_BR";


const { Header} = Layout;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

class HeaderComponent extends Component {

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

          <Select defaultValue="1" className="select-drop">
            <Option value="1">Hospital Santa Lúcia</Option>
            <Option value="2">Hospital das Clínicas USP</Option>
            <Option value="Yiminghe">Hospital Samaritano</Option>
          </Select>

          <div style={{ float: "right" }}>
            <Tag>29 dias</Tag>

            <RangePicker
              locale={locale}
              defaultValue={[
                moment("02/10/2018", dateFormat),
                moment("01/11/2018", dateFormat)
              ]}
              format={dateFormat}
            />
          </div>
        </Header>
    );
  }
}

export default HeaderComponent;
