import React from "react";
import Navbar from "./Navbar.js";
import { Row, Col, Layout, Button } from "antd";
import firebase from "./firebase.js";

const { Content, Header } = Layout;

class Home extends React.Component {
  state = {
    email: ""
  };

  // componentDidMount () {
  // firebase.auth().onAuthStateChanged(function(user) {
  // console.log(user.email);
  // }

  //   componentDidMount() {
  //     firebase.auth().onAuthStateChanged(function(user) {
  //       console.log(user.email);
  //       const email = user.email;
  //       console.log(email);
  //       this.setState({ email: email });
  //     });
  //   }

  render() {
    return (
      <div>
        <Row>
          <Navbar />
          <br />
          <Col span={1} />
          <Col span={22}>
            <Layout style={{ background: "white" }}>
              <Header
                style={{
                  background: "#1890ff",
                  textAlign: "center"
                }}
              >
                <h2 style={{ color: "white" }}>
                  Home
                  {/* Welcome {this.state.email !== undefined && this.state.email} */}
                </h2>
              </Header>
              <br />
              <Layout style={{ background: "white" }}>
                <Row>
                  <Col span={1} />
                  <Col span={6}>
                    <img src="https://zapier.cachefly.net/storage/photos/8acfb44560032afc68dece092fadc0c9_2.png" />
                  </Col>
                  <Col span={16}>
                    <Content>
                      <h3>
                        <p>
                          The Pomodoro Technique is a popular time management
                          method developed in the late 80's to improve
                          productivity. It's really simple. Essentially, you
                          break down your work into 25 minutes intervals
                          separated by short breaks.
                        </p>
                        <p>Here's how it works:</p>
                        <p>1. Start the 25 minute timer.</p>
                        <p>2. Submit completed tasks as you finish them.</p>
                        <p>3. After 25 minutes, take a 5 minute break.</p>
                        <p>
                          4. After your break, come back and start working
                          again.
                        </p>
                      </h3>
                    </Content>
                  </Col>
                </Row>
              </Layout>
            </Layout>
            <br />
          </Col>
          <Col span={1} />
        </Row>
      </div>
    );
  }
}

export default Home;
