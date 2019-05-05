import React, { Component } from "react";
import "antd/dist/antd.css";
import "./DashboardCharts.css";
import axios from "axios";

import DashboardCharts from "./DashboardCharts";
// import { Element } from "react-faux-dom";
// import * as d3 from "d3";
import { Row, Col, Select } from "antd";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graphData: {},
      xAxis: {}
    };
  }
  makeGraph = (graphRange, graphType) => {
    console.log(graphRange, graphType);
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMTY0MDIyMC02ODAyLTExZTktOGUxYS1iZDE3NmJmNjdkYWEiLCJjcmVhdGVkX2F0IjoxNTU2NzQzMTcwMzIyLCJpYXQiOjE1NTY3NDMxNzAsImV4cCI6MTU1OTMzNTE3MH0.CNknpZADc05g6Un4ogHzO8pmdW5mDB3QnhRLQKHcmm0";

    axios
      .get("/v1/views?frequency=" + graphRange + "&type=" + graphType, {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        if (res.status === 200) {
          // console.log("view response data", res.data.data.graphData);

          let result = res.data.data.graphData.map((value, i) => {
            return value["value"];
          });

          let result1 = res.data.data.graphData.map((date, i) => {
            return date["timestamp"];
          });

          //   console.log("result", result1);
          let graphData = this.state.graphData || {};
          let xAxis = this.state.xAxis || {};

          graphData[graphType] = result;
          xAxis[graphType] = result1;

          this.setState({
            graphData: graphData,
            xAxis: xAxis
          });
        }
      })
      .catch(err => {
        console.log("view error: ", err);
      });
  };
  makeAllGraph = value => {
    let graphRange = value;
    let graphAttr = [
      { graphRange: graphRange, graphType: "login" },
      { graphRange: graphRange, graphType: "signup" },
      { graphRange: graphRange, graphType: "questions" },
      { graphRange: graphRange, graphType: "answers" },
      { graphRange: graphRange, graphType: "comments" }
    ];

    graphAttr.map((d, i) => {
      this.makeGraph(d.graphRange, d.graphType);
    });
  };
  componentDidMount() {
    this.makeAllGraph("hour");
  }

  render() {
    let chartData = [
      {
        name: "Login",
        color: "#ff6361",
        graphData: this.state.graphData["login"],
        xAxis: this.state.xAxis["login"]
      },
      {
        name: "Signup",
        color: "#bc5090",
        graphData: this.state.graphData["signup"],
        xAxis: this.state.xAxis["signup"]
      },
      {
        name: "Questions",
        color: "#58508d",
        graphData: this.state.graphData["questions"],
        xAxis: this.state.xAxis["questions"]
      },
      {
        name: "Answer",
        color: "#003f5c",
        graphData: this.state.graphData["answers"],
        xAxis: this.state.xAxis["answers"]
      },
      {
        name: "Comments",
        color: "#ffa600",
        graphData: this.state.graphData["comments"],
        xAxis: this.state.xAxis["comments"]
      }
    ];

    const Option = Select.Option;

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    console.log(chartData);

    return (
      <Row
        style={{
          marginTop: "100px",
          marginLeft: "40px"
        }}
      >
        <Row>
          <Col span={24}>
            <Col span={8}>
              <h4 className="dashboardChartTitle">Quora Dashboard</h4>
            </Col>
            <Col span={8} />
            <Col span={8} style={{ float: "right", marginRight: "80px" }}>
              <Select
                defaultValue="hour"
                style={{ width: 120 }}
                onChange={this.makeAllGraph}
                style={{ float: "right" }}
              >
                <Option value="hour">Hour</Option>
                <Option value="day">Day</Option>
                <Option value="week">Week</Option>
                <Option value="month">Month</Option>
                <Option value="year">Year</Option>
              </Select>
            </Col>
          </Col>
        </Row>
        <Row>
          {chartData.map((value, i) => (
            <Col span={8}>
              <DashboardCharts
                name={value.name}
                color={value.color}
                graphData={value.graphData}
                xAxis={value.xAxis}
              />
            </Col>
          ))}
        </Row>
      </Row>
    );
  }
}

export default Dashboard;
