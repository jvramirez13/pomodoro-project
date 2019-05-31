import React from "react";
import firebase from "./firebase.js";
import { Radio, Row, Col, Input, Button, Layout, Collapse } from "antd";

import { withRouter } from "react-router-dom";

const { Footer } = Layout;
const Panel = Collapse.Panel;
const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 24,
  overflow: "hidden"
};

var usersLists = [];

class Form extends React.Component {
  state = {
    activity: "",
    value: 0,
    label: "",
    usersList: [],
    redirect: false,
    quote: ""
  };

  handleChange = evt => {
    evt.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(evt.target.value);
  };

  handleSubmit = event => {
    const activityName = this.state.activity;
    firebase.auth().onAuthStateChanged(
      function(user) {
        event.preventDefault();
        document.getElementById("activity").value = "";
        //Need to access firebase on the certain user and push the activity, date and time up
        const usersRef = firebase.database().ref("users/" + user.uid);
        const User = {
          activity: activityName,
          label: this.state.label,
          date: this.getDate(),
          time: this.getTime()
        };
        usersRef.push(User);
        usersLists.push(User);
        this.setState({ usersList: usersLists });
        console.log(User);
      }.bind(this)
    );
    console.log(this.state.activity);
    this.setState({
      activity: ""
    });
  };

  getLabel = e => {
    console.log("radio checked", e.target.value);
    if (e.target.value == 1) {
      this.setState({
        value: e.target.value,
        label: "School"
      });
    }
    if (e.target.value == 2) {
      this.setState({
        value: e.target.value,
        label: "Work"
      });
    }
    if (e.target.value == 3) {
      this.setState({
        value: e.target.value,
        label: "Leisure"
      });
    }
    if (e.target.value == 4) {
      this.setState({
        value: e.target.value,
        label: "Other"
      });
    }
  };

  componentDidMount() {
    this.setState({
      usersList: usersLists
    });
  }

  getDate = () => {
    var tempDate = new Date();
    var date =
      tempDate.getMonth() +
      1 +
      "/" +
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear();
    const currDate = date;
    return currDate;
  };

  getTime = () => {
    var tempDate = new Date();
    var hour = tempDate.getHours();
    var time = "AM";
    if (hour > 12) {
      hour = hour - 12;
      time = "PM";
    }
    var time =
      hour +
      ":" +
      ((tempDate.getMinutes() < 10 ? "0" : "") + tempDate.getMinutes()) +
      " " +
      time;
    const currTime = time;
    return currTime;
  };

  logout = () => {
    firebase.auth().signOut();
    this.props.reset();
    usersLists = [];
    this.setState({
      redirect: true,
      usersList: []
    });
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={2} />
          <Col span={10}>
            <h3>Select a label: </h3>
            <br />
            <Radio.Group onChange={this.getLabel} value={this.state.value}>
              <Radio value={1}>School</Radio>
              <Radio value={2}>Work</Radio>
              <Radio value={3}>Leisure</Radio>
              <Radio value={4}>Other</Radio>
            </Radio.Group>
            <br />
            <br />
            <br />
            <h3>Submit your completed activity:</h3>
            <br />
            <Input
              type="text"
              name="activity"
              id="activity"
              style={{ width: 350 }}
              onChange={this.handleChange}
              value={this.state.activity}
              placeholder="completed activity"
            />
            <Footer style={{ background: "white", textAlign: "center" }}>
              <Button
                style={{ background: "#1890ff", color: "white" }}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Footer>
            <br />
            <Button
              style={{ background: "white", color: "#1890ff" }}
              onClick={this.logout}
            >
              Logout
            </Button>
          </Col>
          <Col span={2} />
          <Col
            span={9}
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            {this.state.usersList !== null &&
              this.state.usersList.map(submission => {
                return (
                  <Collapse>
                    <Panel
                      style={customPanelStyle}
                      header={submission.activity}
                    >
                      <p>Date: {submission.date}</p>
                      <p>Time: {submission.time}</p>
                      <p>Label: {submission.label}</p>
                    </Panel>
                  </Collapse>
                );
              })}
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Form);
