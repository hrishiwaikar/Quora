import React, { Component } from "react";
import "antd/dist/antd.css";
import "./../../style.css";
import Highcharts from "highcharts";

//import $ from "jquery";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
// import { Element } from "react-faux-dom";
// import * as d3 from "d3";
// import { Button, Row, Col, Menu, Dropdown } from "antd";

class DashboardCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graphData: "",
      xAxis: []
    };
  }

  componentDidMount() {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMTY0MDIyMC02ODAyLTExZTktOGUxYS1iZDE3NmJmNjdkYWEiLCJjcmVhdGVkX2F0IjoxNTU2NzQzMTcwMzIyLCJpYXQiOjE1NTY3NDMxNzAsImV4cCI6MTU1OTMzNTE3MH0.CNknpZADc05g6Un4ogHzO8pmdW5mDB3QnhRLQKHcmm0";

    axios
      .get("v1/answers?top=10&sort=views", {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        if (res.status === 200) {
          console.log("view response data", res.data.answers);

          this.setState({
            answerId: res.data.answers[0].answerId
          });

          axios
            .get("v1/answers/" + this.state.answerId + "/views?day=30", {
              headers: {
                authorization: token
              }
            })
            .then(res => {
              if (res.status === 200) {
                console.log("graph response data", res.data.data.graphData);
                let result = res.data.data.graphData.map((value, i) => {
                  return value["value"];
                });

                let result1 = res.data.data.graphData.map((date, i) => {
                  return date["timestamp"];
                });

                console.log("result", result1);

                this.setState({
                  graphData: result,
                  xAxis: result1
                });
              }
            })
            .catch(err => {
              console.log("view error: ", err);
            });
        }
      })
      .catch(err => {
        console.log("view error: ", err);
      });
  }
  render() {
    const options = {
      chart: {
        height: 250,
        width: 400
      },

      title: {
        text: ""
      },
      xAxis: {
        //visible: true,
        categories: this.state.xAxis
      },
      yAxis: {
        title: {
          text: null
        }
      },
      series: [
        {
          name: this.props.name,
          type: "area",
          data: this.state.graphData,
          color: this.props.color
        }
      ],
      credits: {
        enabled: false
      }
    };
    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={options}
      />
    );
  }
}

export default DashboardCharts;
