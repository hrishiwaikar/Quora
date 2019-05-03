import React, { Component } from "react";
import "antd/dist/antd.css";
import "./DashboardCharts.css";
//import axios from "axios";

import DashboardCharts from "./DashboardCharts";
// import { Element } from "react-faux-dom";
// import * as d3 from "d3";
import { Button, Row, Col, Menu, Dropdown, AutoComplete } from "antd";

class Dashboard extends Component {
  render() {
    let chartData = [
      {
        name: "Login",
        color: "#ff6361"
      },
      {
        name: "Signup",
        color: "#bc5090"
      },
      {
        name: "Questions",
        color: "#58508d"
      },
      {
        name: "Answer",
        color: "#003f5c"
      },
      {
        name: "Comments",
        color: "#ffa600"
      }
    ];
    return (
      <Row
        style={{
          marginTop: "100px",
          marginLeft: "40px"
        }}
      >
        <h4 className="dashboardChartTitle">Quora Dashboard</h4>
        {chartData.map((value, i) => (
          <Col span={8}>
            <DashboardCharts name={value.name} color={value.color} />
          </Col>
        ))}
      </Row>
    );
  }
}

export default Dashboard;
