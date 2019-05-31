import React from "react";
import firebase from "./firebase.js";
import {
  Row,
  Col,
  Input,
  Button,
  Layout,
  Collapse,
  Card,
  Icon,
  Tooltip,
  Avatar
} from "antd";

import { withRouter } from "react-router-dom";
import axios from "axios";

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
    usersList: [],
    redirect: false,
    quote: "",
    likes: 0,
    dislikes: 0,
    action: "liked"
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

  handleKanye = () => {
    axios.get("http://localhost:5000/").then(response => {
      const quote = response.data.quote;
      this.setState({
        quote: quote
      });
    });
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

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: "liked"
    });
  };

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: "disliked"
    });
  };

  render() {
    const { likes, dislikes, action } = this.state;
    const { Meta } = Card;
    return (
      <div>
        <Row>
          <Col span={3} />
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
                    </Panel>
                  </Collapse>
                );
              })}
          </Col>
          <Col span={2} />
          <Col span={10}>
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
            <Button
              style={{ background: "white", color: "#1890ff" }}
              onClick={this.logout}
            >
              Logout
            </Button>
            <br />
            <br />
            <br />
            <Card style={{ height: 175 }} title="Kanye West Quotes">
              <Meta
                avatar={
                  <Avatar
                    shape="square"
                    size={60}
                    src="https://stickeroid.com/uploads/pic/fx0n217l-full/mask/stickeroid_5bff2ad685986.png"
                    alt="Kanye West"
                  />
                }
                description={<p>{this.state.quote}</p>}
              />
              {/* <Comment actions={actions} /> */}
            </Card>
            <br />
            <br />
            <Button
              style={{ background: "white", color: "#1890ff" }}
              onClick={this.handleKanye}
            >
              Generate inspirational Kanye quote
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Form);
