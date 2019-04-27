import React, { Component } from "react";
import "antd/dist/antd.css";
import "./../../style.css";
import axios from "axios";
import "./Stats.css";
import { Element } from "react-faux-dom";
import * as d3 from "d3";
import data from "./Data";

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

  plot = (chart, width, height) => {
    // create scales!
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.country))
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("x", d => xScale(d.country))
      .attr("y", d => yScale(d.value))
      .attr("height", d => height - yScale(d.value))
      .attr("width", d => xScale.bandwidth())
      .style("fill", (d, i) => colorScale(i));

    chart
      .selectAll(".bar-label")
      .data(data)
      .enter()
      .append("text")
      .classed("bar-label", true)
      .attr("x", d => xScale(d.country) + xScale.bandwidth() / 2)
      .attr("dx", 0)
      .attr("y", d => yScale(d.value))
      .attr("dy", -6)
      .text(d => d.value);

    const xAxis = d3.axisBottom().scale(xScale);

    chart
      .append("g")
      .classed("x axis", true)
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    const yAxis = d3
      .axisLeft()
      .ticks(5)
      .scale(yScale);

    chart
      .append("g")
      .classed("y axis", true)
      .attr("transform", "translate(0,0)")
      .call(yAxis);

    chart
      .select(".x.axis")
      .append("text")
      .attr("x", width / 2)
      .attr("y", 60)
      .attr("fill", "#000")
      .style("font-size", "20px")
      .style("text-anchor", "middle")
      .text("Country");

    chart
      .select(".y.axis")
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("transform", `translate(-50, ${height / 2}) rotate(-90)`)
      .attr("fill", "#000")
      .style("font-size", "20px")
      .style("text-anchor", "middle")
      .text("Government Expenditure in Billion Dollars");

    const yGridlines = d3
      .axisLeft()
      .scale(yScale)
      .ticks(5)
      .tickSize(-width, 0, 0)
      .tickFormat("");

    chart
      .append("g")
      .call(yGridlines)
      .classed("gridline", true);
  };

  drawChart() {
    const width = 800;
    const height = 500;

    const el = new Element("div");
    const svg = d3
      .select(el)
      .append("svg")
      .attr("id", "chart")
      .attr("width", width)
      .attr("height", height);

    const margin = {
      top: 60,
      bottom: 100,
      left: 80,
      right: 40
    };

    const chart = svg
      .append("g")
      .classed("display", true)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    this.plot(chart, chartWidth, chartHeight);

    return el.toReact();
  }

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
            <Col span={24}>{this.drawChart()}</Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Stats;
