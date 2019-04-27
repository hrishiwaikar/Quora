import React, { Component } from "react";
import "antd/dist/antd.css";
import "./../../style.css";
import axios from "axios";

import { Form, Icon, Input, Button, Card, message } from "antd";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmail: "",
      loginPassword: ""
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  loginSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log("Received values of form: ", values);
        const data = {
          email: this.state.loginEmail,
          password: this.state.loginPassword
        };
        console.log("login data ", data);

        axios
          .post("http://10.0.0.188:7836/v1/signin", data)
          .then(res => {
            if (res.status === 200) {
              console.log("login response data", res.data);
              message.success(res.data.response[0].message);
              window.localStorage.setItem("userId", res.data.user.userId);
              window.localStorage.setItem("token", res.data.token);
            }
          })
          .catch(err => {
            console.log("login error: ", err);

            console.log("login error response: ", err.response);
            message.error(err.response.data.response.message);
          });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Card
        style={{
          borderRight: "none",
          borderTop: "none",
          borderBottom: "none"
        }}
      >
        <h7>Login</h7>
        <Form onSubmit={this.loginSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("loginEmail", {
              rules: [
                {
                  required: true,
                  message: "Please input your username!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="email"
                placeholder="Email"
                name="loginEmail"
                onChange={this.onChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("loginPassword", {
              rules: [
                {
                  required: true,
                  message: "Please input your Password!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                name="loginPassword"
                onChange={this.onChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

const loginForm = Form.create({ name: "login" })(Login);

export default loginForm;
