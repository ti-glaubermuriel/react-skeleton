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
  message
} from "antd";

import api from "../services/api";
import { Link, withRouter } from "react-router-dom";
import { login } from "../services/auth";
import iconColor from "../assets/icon_color.png";

const { Content, Footer } = Layout;
const FormItem = Form.Item;

class loginPage extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        // request login
        try {
          api
            .post("/web/login", values)
            .then(res => {
              login(res.headers.authorization, res.data);
              this.props.history.push("/");
            })
            .catch(error => {
              console.log(error);
              message.error(
                "Usuário não autorizado, verifique suas credenciais."
              );
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
            <Row>
              <Col xs={2} sm={4} md={6} lg={8} xl={10} />
              <Col
                xs={20}
                sm={16}
                md={12}
                lg={8}
                xl={4}
                style={{ paddingTop: "100px" }}
              >
                <div style={{ padding: "30px" }}>
                  <Card title="Login" bordered={false} style={{ width: 300 }}>
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
                                type="user"
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
                          htmlType="submit"
                          className="login-form-button"
                          style={{ float: "rigth" }}
                        >
                          Login
                        </Button>
                      </FormItem>
                    </Form>
                  </Card>
                </div>
              </Col>
              <Col xs={2} sm={4} md={6} lg={8} xl={10} />
            </Row>
          </Content>
          <Footer
            style={{ position: "sticky", bottom: "0", textAlign: "center" }}
          >
            Powered by <img src={iconColor} alt="Logo" />
          </Footer>
        </Layout>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(loginPage);

export default WrappedNormalLoginForm;
