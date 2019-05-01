import React, { Component } from "react";
import "antd/dist/antd.css";
import "./../../style.css";
import axios from "axios";
import "./Stats.css";
import { Element } from "react-faux-dom";
import * as d3 from "d3";
import data from "./Data";
import graphData from "./graphData";
import viewGraph from "./viewGraph";
import upvotesGraph from "./upvotes";
import downvotesGraph from "./downvotes";

import { Button, Row, Col, Menu, Dropdown } from "antd";

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      views: "statsTab-active",
      upvotes: "statsTab",
      downvotes: "statsTab",
      viewsCount: graphData[0].views,
      upvotesCount: graphData[0].upvotes,
      downvotesCount: graphData[0].downvotes,
      graphData: viewGraph[0].graphData
    };
  }

  // componentDidMount() {
  //   axios
  //     .get("http://10.0.0.188:7836/v1/answers?top=10&sort=views", {
  //       headers: {
  //         authorization: token
  //       }
  //     })
  //     .then(res => {
  //       if (res.status === 200) {
  //         console.log("view response data", res.data);

  // this.setState({
  //   viewsCount: res.data[0].views,
  //   upvotesCount: res.data[0].upvotes,
  //   downvotesCount: res.data[0].downvotes,
  // })

  //axios
  //     .get("http://10.0.0.188:7836/v1/answers/:answerId/views?day=30", {
  //       headers: {
  //         authorization: token
  //       }
  //     })
  //     .then(res => {
  //       if (res.status === 200) {
  //         console.log("view response data", res.data);
  // this.setState({
  //   graphData: resizeBy.data[0].graphData
  // })
  //       }
  //     })
  //     .catch(err => {
  //       console.log("view error: ", err);
  //     });

  //       }

  //     })
  //     .catch(err => {
  //       console.log("view error: ", err);
  //     });

  // }

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
        downvotes: "statsTab",
        graphData: viewGraph[0].graphData
      });

      // axios
      //   .post("http://10.0.0.188:7836/v1/signin")
      //   .then(res => {
      //     if (res.status === 200) {
      //       console.log("views response data", res.data);
      //     }
      //   })
      //   .catch(err => {
      //     console.log("views error: ", err);
      //   });
    } else if (name === "upvotes") {
      this.setState({
        upvotes: "statsTab-active",
        views: "statsTab",
        downvotes: "statsTab",
        graphData: upvotesGraph[0].graphData
      });
    } else if (name === "downvotes") {
      this.setState({
        downvotes: "statsTab-active",
        upvotes: "statsTab",
        views: "statsTab",
        graphData: downvotesGraph[0].graphData
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
    // var viewData = [];
    // viewData = viewGraph[0].views;

    // console.log("view Data", viewGraph[0].views);

    // create scales!
    const xScale = d3
      .scaleBand()
      .domain(this.state.graphData.map((d, i) => d.timestamp))
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(this.state.graphData, d => d.view)])
      .range([height, 0]);
    //  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    chart
      .selectAll(".bar")
      .data(this.state.graphData)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("x", d => xScale(d.timestamp))
      .attr("y", d => yScale(d.view))
      .attr("height", d => height - yScale(d.view))
      .attr("width", d => xScale.bandwidth() - 1)
      .style("fill", "#84B1E1");
    //.style("fill", (d, i) => colorScale(i));

    // chart
    //   .selectAll(".bar-label")
    //   .data(data)
    //   .enter()
    //   .append("text")
    //   .classed("bar-label", true)
    //   .attr("x", d => xScale(d.country) + xScale.bandwidth() / 2)
    //   .attr("dx", 0)
    //   .attr("y", d => yScale(d.value))
    //   .attr("dy", -6)
    //   .text(d => d.value);

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

    // chart
    //   .select(".x.axis")
    //   .append("text")
    //   .attr("x", width / 2)
    //   .attr("y", 60)
    //   .attr("fill", "#000")
    //   .style("font-size", "20px")
    //   .style("text-anchor", "middle")
    //   .text("Country");

    // chart
    //   .select(".y.axis")
    //   .append("text")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("transform", `translate(-50, ${height / 2}) rotate(-90)`)
    //   .attr("fill", "#000")
    //   .style("font-size", "20px")
    //   .style("text-anchor", "middle")
    //   .text("Government Expenditure in Billion Dollars");

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

  onChangeQuestion = answerId => {
    console.log("key ", answerId);
    graphData.map((data, i) => {
      console.log("key ", data);
      if (answerId === data.answerId) {
        // console.log("key ", i);
        this.setState({
          viewsCount: graphData[i].views,
          upvotesCount: graphData[i].upvotes,
          downvotesCount: graphData[i].downvotes,
          graphData:
            viewGraph[0].graphData ||
            upvotesGraph[0].graphData ||
            downvotesGraph[0].graphData
        });
      }
    });
  };

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
                defaultSelectedKeys={["0"]}
                defaultOpenKeys={["sub1"]}
                mode={this.state.mode}
                theme={this.state.theme}
              >
                {graphData.map((q, i) => (
                  <Menu.Item
                    key={i}
                    onClick={() => this.onChangeQuestion(q.answerId)}
                  >
                    <a>{q.question}</a>
                  </Menu.Item>
                ))}
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
              <p className="viewsNum">{this.state.viewsCount}</p>
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
              <p className="upvotesNum">{this.state.upvotesCount}</p>
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
              <p className="downvotesNum">{this.state.downvotesCount}</p>
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
