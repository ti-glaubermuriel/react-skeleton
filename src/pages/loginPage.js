import React, { Component } from "react";
import {
  Layout,
  Form,
  Icon,
  Input,
  Button,
  Row,
  Col,
  Card,
  message,
  Tooltip,
  Divider,
  Tag
} from "antd";

import api from "../services/api";
import { Link, withRouter } from "react-router-dom";
import { login } from "../services/auth";
import iconColor from "../assets/icon_color.png";
import iconHeader from "../assets/logo-icon.png";

const { Content, Footer } = Layout;
const FormItem = Form.Item;

class LoginPage extends Component {

  state = {
    loading: false,
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        // request login
        try {

          this.setState({loading: true});
          
          api
            .post("/web/login", values)
            .then(res => {
              login(res.headers.authorization, res.data);
              this.props.history.push("/app");
              this.setState({loading: false});
            })
            .catch(error => {
              console.log(error);
              message.error(
                "Usuário não autorizado, verifique suas credenciais."
              );
              this.setState({loading: false});
            });

          //this.props.history.push("/app");
        } catch (err) {
          message.error("Falha ao realizar login, tente novamente mais tarde.");
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Layout className="layout" style={{ minHeight: "100vh", padding: 0 }}>
          <Content style={{ padding: "0 10px" }}>
            <Row type="flex" justify="space-around" align="middle">
              <Col xs={2} sm={4} md={6} lg={8} xl={7} />
              <Col xs={20} sm={16} md={12} lg={8} xl={6}
                style={{ paddingTop: "50px" }} 
              >
                <div style={{ padding: "30px" }} className="login-form">
                  <Card title={<div style={{textAlign: 'center'}} className="logo"><img src={iconHeader} alt="Logo" />AxReg <Divider type="vertical" /><span className="logo-sub-title">Dashboard </span> <Divider>Login</Divider></div> } bordered={false} style={{ width: '100%' }}
                  
                  >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                      <FormItem>
                        {getFieldDecorator("email", {
                          rules: [
                            {
                              required: true,
                              message: "Digite o e-mail!"
                            }
                          ]
                        })(
                          <Input
                            prefix={
                              <Icon
                                type="mail"
                                style={{ color: "rgba(0,0,0,.25)" }}
                              />
                            }
                            type="email"
                            placeholder="Email"
                          />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator("password", {
                          rules: [
                            {
                              required: true,
                              message: "Digite a senha!"
                            }
                          ]
                        })(
                          <Input
                            prefix={
                              <Icon
                                type="lock"
                                style={{ color: "rgba(0,0,0,.25)" }}
                              />
                            }
                            type="password"
                            placeholder="Senha"
                          />
                        )}
                      </FormItem>
                      <FormItem>
                        <Button
                          block
                          type="primary"
                          loading={this.state.loading}
                          htmlType="submit"
                          className="btn-custom-primary"
                          style={{ float: "rigth" }}
                        >
                          Entrar
                        </Button>
                          
                          <div  style={{float: 'right'}}>
                        <Button type="dashed" size="small"><Icon type="unlock" /> Recuperar senha</Button>
                        </div>

                      </FormItem>
                    </Form>
                  </Card>

                   
                </div>
              </Col>
              <Col xs={2} sm={4} md={6} lg={8} xl={7} />
            </Row>
          </Content>
          <Footer
            style={{ position: "relative", bottom: "0", textAlign: "center" }}
          >
            Powered by 
            
            <Tooltip title="Anestech"> <a href="http://www.anestech.com.br/" target="_blank">
                <img src={iconColor} alt="Logo" /> </a>
            </Tooltip>
          </Footer>
        </Layout>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(LoginPage);

export default WrappedNormalLoginForm;
