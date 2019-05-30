import React, { Component } from "react";
import Navbar from "./Navbar.js";
import Form from "./Form.js";
import { Statistic, Row, Col, Layout, Button } from "antd";

const { Header, Content, Footer } = Layout;

const Countdown = Statistic.Countdown;

var seconds = 0;

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      time: 0
    };
  }

  componentDidMount() {
    this.setState({
      time: seconds
    });
  }

  onFinish = () => {
    alert("finished!");
  };

  handleClick = () => {
    seconds = Date.now() + 1000 * 60 * 25;
    this.setState({
      time: seconds
    });
  };

  reset = () => {
    seconds = 0;
  };

  render() {
    return (
      <div>
        <Navbar />
        <br />
        <Row>
          <Col span={1} />
          <Col span={8}>
            <Header
              style={{
                background: "#1890ff",
                textAlign: "center"
              }}
            >
              <h2 style={{ color: "white" }}>Completed activites</h2>
            </Header>
            <br />
          </Col>
          <Col span={7}>
            <Header
              style={{
                background: "#1890ff",
                textAlign: "center"
              }}
            >
              <h2 style={{ color: "white" }}>Task form</h2>
            </Header>
            <br />
            <br />
          </Col>
          <Col span={7}>
            <Header
              style={{
                background: "#1890ff",
                textAlign: "center"
              }}
            >
              <h2 style={{ color: "white" }}>Timer</h2>
            </Header>
            <br />
          </Col>
          <Col span={1} />
        </Row>
        <Row gutter={16}>
          <Col span={16} style={{ textAlign: "center" }}>
            <Form reset={this.reset} history={this.props.history} />
          </Col>
          <Col span={7} style={{ textAlign: "center" }}>
            <Content>
              <Countdown value={this.state.time} onFinish={this.onFinish} />
            </Content>
            <Footer style={{ background: "white", textAlign: "center" }}>
              <Button
                style={{ background: "#1890ff", color: "#fffff6" }}
                onClick={this.handleClick}
              >
                Start
              </Button>
            </Footer>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Timer;
