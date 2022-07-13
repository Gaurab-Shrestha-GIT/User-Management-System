import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dropdown, setDropdown] = useState("Customer");

  const login = () => {
    axios
      .post("http://localhost:5000/user/login", {
        email: email,
        password: password,
        dropdown: dropdown,
      })
      .then((response) => {
        if (response.data.customerLoggedIn === true) {
          localStorage.setItem("customerEmail", response.data.customerEmail);
          navigate("/customerprofile");
        } else if (response.data.staffLoggedIn === true) {
          localStorage.setItem("staffEmail", response.data.staffEmail);
          navigate("/staffprofile");
        } else {
          setMessage(response.data.message);
        }
      });
  };
  return (
    <Container className="mt-3 text-center">
      <title>Login</title>
      <Row>
        <h1>Login Form</h1>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form className="py-4">
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>User Type</Form.Label>

              <Form.Control
                as="select"
                id="dropdown"
                value={dropdown}
                onChange={(event) => {
                  setDropdown(event.target.value);
                }}
              >
                <option value="Customer">Customer</option>
                <option value="Staff">Staff</option>
              </Form.Control>
            </Form.Group>
            <div>{message}</div>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={4}>
          <Button onClick={login}>Login</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          Go to
          <Link to="/register" style={{ textDecoration: "none" }}>
            {" "}
            Register Form
          </Link>
        </Col>
        <Col>
          Go to
          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            Home Page
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
