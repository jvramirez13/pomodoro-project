import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar.js";
import firebase from "./firebase.js";
import Chart from "react-google-charts";
import { Table, PageHeader, Row, Col, Layout } from "antd";

const data = userData => {
  var School = 0;
  var Work = 0;
  var Leisure = 0;
  var Other = 0;
  var i;
  if (userData !== null) {
    for (i = 0; i < userData.length; i++) {
      if (userData[i].label === "School") {
        School++;
      }
      if (userData[i].label == "Work") {
        Work++;
      }
      if (userData[i].label == "Leisure") {
        Leisure++;
      }
      if (userData[i].label == "Other") {
        Other++;
      }
    }
  }
  return [
    ["Task Type", "Tasks Completed"],
    ["School", School],
    ["Work", Work],
    ["Leisure", Leisure],
    ["Other", Other]
  ];
};

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          // User is signed in.
          const tasksRef = firebase.database().ref("users/" + user.uid);
          console.log(tasksRef);
          tasksRef.on("value", snapshot => {
            if (snapshot.val() != null) {
              this.setState({ userData: Object.values(snapshot.val()) });
            }
          });
        }
      }.bind(this)
    );
  }

  //simple list of tasks with info, add table
  render() {
    const { Header } = Layout;

    return (
      <div>
        <Navbar />
        <br />
        <Row>
          <Col span={1} />
          <Col span={22}>
            <Header
              style={{
                background: "#1890ff",
                textAlign: "center"
              }}
            >
              <h2 style={{ color: "white" }}>Your Tasks Completed by Type</h2>
            </Header>
            <Row>
              <Col span={4} />
              <Col span={12}>
                <Chart
                  width={"900px"}
                  height={"500px"}
                  chartType="BarChart"
                  data={data(this.state.userData)}
                  options={{
                    chartArea: { width: "60%", height: "80%" },
                    hAxis: {
                      title: "Tasks Completed",
                      minValue: 0
                    },
                    vAxis: {
                      title: "Task Type"
                    },
                    legend: "none"
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={1} />
        </Row>
      </div>
    );
  }
}
export default Graph;
