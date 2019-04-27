import React, { Component } from "react";
import "antd/dist/antd.css";
import "./../../style.css";
import axios from "axios";
import "./Stats.css";

import {
  Form,
  Icon,
  Input,
  Button,
  Card,
  message,
  Row,
  Col,
  Menu,
  Dropdown
} from "antd";

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      views: "statsTab-active",
      upvotes: "statsTab",
      downvotes: "statsTab"
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  graph = name => {
    //e.preventDefault();
    // console.log(e.target.name, name);

    if (name === "views") {
      this.setState({
        views: "statsTab-active",
        upvotes: "statsTab",
        downvotes: "statsTab"
      });
    } else if (name === "upvotes") {
      this.setState({
        upvotes: "statsTab-active",
        views: "statsTab",
        downvotes: "statsTab"
      });
    } else if (name === "downvotes") {
      this.setState({
        downvotes: "statsTab-active",
        upvotes: "statsTab",
        views: "statsTab"
      });
    }
  };

  // loginSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       //console.log("Received values of form: ", values);
  //       const data = {
  //         email: this.state.loginEmail,
  //         password: this.state.loginPassword
  //       };
  //       console.log("login data ", data);

  //       axios
  //         .post("http://10.0.0.188:7836/v1/signin", data)
  //         .then(res => {
  //           if (res.status === 200) {
  //             console.log("login response data", res.data);
  //             message.success(res.data.response[0].message);
  //             window.localStorage.setItem("userId", res.data.user.userId);
  //             window.localStorage.setItem("token", res.data.token);
  //           }
  //         })
  //         .catch(err => {
  //           console.log("login error: ", err);

  //           console.log("login error response: ", err.response);
  //           message.error(err.response.data.response.message);
  //         });
  //     }
  //   });
  // };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            Views
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            Upvotes
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            Downvotes
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            Bookmark
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            Profile views
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="ContentWrapper">
        <Row>
          <Col span={4}>
            <p className="statsTitle">Stats</p>
          </Col>
          <Col span={4} />
          <Col span={4} />
          <Col span={4} />
          <Col span={4} />
          <Col span={4}>
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button>Answer</Button>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="statsAnswerList">
            <div>
              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode={this.state.mode}
                theme={this.state.theme}
              >
                <Menu.Item key="1">All Answers </Menu.Item>
                <Menu.Item key="2">
                  <a>Who sang the song "Never Ever" (1997)?</a>
                </Menu.Item>
                <Menu.Item key="3">
                  <a>Who sang the song "Never Ever" (1997)?</a>
                </Menu.Item>
                <Menu.Item key="4">
                  <a>Who sang the song "Never Ever" (1997)?</a>
                </Menu.Item>
                <Menu.Item key="5">
                  <a>Who sang the song "Never Ever" (1997)?</a>
                </Menu.Item>
                <Menu.Item key="6">
                  <a>Who sang the song "Never Ever" (1997)?</a>
                </Menu.Item>
                <Menu.Item key="7">
                  <a>Who sang the song "Never Ever" (1997)?</a>
                </Menu.Item>
                <Menu.Item key="8">
                  <a>Who sang the song "Never Ever" (1997)?</a>
                </Menu.Item>
                <Menu.Item key="9">
                  <a>Who sang the song "Never Ever" (1997)?</a>
                </Menu.Item>
                <Menu.Item key="10">
                  <a>Who sang the song "Never Ever" (1997)?</a>
                </Menu.Item>
              </Menu>
            </div>
          </Col>
          <Col span={16} className="statsgraph">
            <button
              name="views"
              className={this.state.views}
              onClick={() => this.graph("views")}
              style={{
                borderLeft: "none",
                borderRight: "none",
                borderTop: "none"
              }}
            >
              <p className="viewsNum">0</p>
              <p className="viewslabel">VIEWS</p>
            </button>
            <button
              name="upvotes"
              className={this.state.upvotes}
              onClick={() => this.graph("upvotes")}
              style={{
                borderRight: "none",
                borderTop: "none"
              }}
            >
              <p className="upvotesNum">0</p>
              <p className="upvoteslabel">UPVOTES</p>
            </button>
            <button
              name="downvotes"
              className={this.state.downvotes}
              onClick={() => this.graph("downvotes")}
              style={{
                borderTop: "none"
              }}
            >
              <p className="downvotesNum">0</p>
              <p className="downvoteslabel">DOWNVOTES</p>
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Stats;
