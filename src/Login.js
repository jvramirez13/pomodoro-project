import React, { Component } from "react";
import firebase from "./firebase.js";
import { Row, Col, Input, Button, PageHeader, Form, Icon } from "antd";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: "",
      emailVerified: false
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        if (u.user.emailVerified === false) {
          alert("You still need to verify your email!");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  signup(e) {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        if (u.user.emailVerified === false) {
          u.user.sendEmailVerification();
          alert("An email verification was sent!");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <Row>
        <br />
        <Col span={6} />
        <Col span={12} style={{ textAlign: "center" }}>
          <PageHeader
            style={{ background: "#ffff6", textAlign: "center" }}
            title="Sign in to your pomodoro account:"
          />
          <br />
          <div className="col-md-6">
            <Form>
              <div class="form-group">
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  style={{ width: 280 }}
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <br />
              <div class="form-group">
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  style={{ width: 280 }}
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <br />
              <br />
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.login}
              >
                Log in
              </Button>
              <Button
                onClick={this.signup}
                style={{ marginLeft: "25px" }}
                className="btn btn-success"
              >
                Sign up
              </Button>
            </Form>
          </div>
        </Col>
        <Col span={6} />
      </Row>
    );
  }
}
export default Login;
