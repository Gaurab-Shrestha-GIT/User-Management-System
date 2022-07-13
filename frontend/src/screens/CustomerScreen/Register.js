import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [registerMessage, setRegisterMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [numberMessage, setNumberMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [cPasswordMessage, setCPasswordMessage] = useState("");

  const register = () => {
    axios
      .post("http://localhost:5000/user/register", {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      })
      .then((response) => {
        setRegisterMessage(response.data.registerMessage);
        setNameMessage(response.data.nameMessage);
        setEmailMessage(response.data.emailMessage);
        setNumberMessage(response.data.numberMessage);
        setPasswordMessage(response.data.passwordMessage);
        setCPasswordMessage(response.data.cPasswordMessage);
      });
  };

  return (
    <Container className="mt-3">
      <title>Register Form</title>
      <Row>
        <h1>Register Form</h1>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form className="py-4">
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></Form.Control>
              <Form.Label>{nameMessage}</Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                }}
              ></Form.Control>
              <Form.Label>{numberMessage}</Form.Label>
            </Form.Group>
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
              <Form.Label>{emailMessage}</Form.Label>
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
              <Form.Label>{passwordMessage}</Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={passwordConfirm}
                onChange={(event) => {
                  setPasswordConfirm(event.target.value);
                }}
              ></Form.Control>
              <Form.Label>{cPasswordMessage}</Form.Label>
            </Form.Group>
            <div>
              <h1>{registerMessage}</h1>
            </div>
            <Button onClick={register}>Register</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          Go to{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login Form
          </Link>
        </Col>
        <Col>
          Go to{" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            Home Page
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
