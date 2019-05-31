import React, { Component } from "react";
import Navbar from "./Navbar.js";
import Form from "./Form.js";
import { Statistic, Row, Col, Layout, Button } from "antd";
import { Card, Avatar } from "antd";

import axios from "axios";

const { Meta } = Card;
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
    alert("Finished! Take a 5 minute break!");
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

  handleKanye = () => {
    axios.get("http://localhost:5000/").then(response => {
      const quote = response.data.quote;
      this.setState({
        quote: quote
      });
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <br />
        <Row>
          <Col span={1} />
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
          <Col span={8}>
            <Header
              style={{
                background: "#1890ff",
                textAlign: "center"
              }}
            >
              <h2 style={{ color: "white" }}>Completed activities</h2>
            </Header>
            <br />
          </Col>
          <Col span={1} />
        </Row>
        <Row gutter={16}>
          <Col span={2} />
          <Col span={5} style={{ textAlign: "center" }}>
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
            <br />
            <br />
            <br />
            <Card style={{ height: 225 }} title="Kanye West Quotes">
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
          <Col span={16} style={{ textAlign: "center" }}>
            <Form reset={this.reset} history={this.props.history} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Timer;
