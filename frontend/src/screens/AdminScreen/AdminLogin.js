import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const login = () => {
    axios
      .post("http://localhost:5000/admin/adminlogin", {
        adminEmail: adminEmail,
        adminPassword: adminPassword,
      })
      .then((response) => {
        setMessage(response.data.message);
        if (response.data.adminLoggedIn === true) {
          localStorage.setItem("adminEmail", response.data.adminEmail);
          navigate("/allusers");
        }
      });
  };

  return (
    <Container className="mt-3">
      <title>Admin Login</title>
      <Row>
        <h1>Admin Login</h1>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form className="py-4">
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={adminEmail}
                onChange={(event) => {
                  setAdminEmail(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={adminPassword}
                onChange={(event) => {
                  setAdminPassword(event.target.value);
                }}
              ></Form.Control>
              {message}
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={4}>
          <Button onClick={login}>Login</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;
