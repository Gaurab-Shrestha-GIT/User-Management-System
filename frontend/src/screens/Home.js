import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Table, Col } from "react-bootstrap";

const Home = () => {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000").then((response) => {
      setUserDetails(response.data);
    });
  }, []);

  return (
    <Container className="mt-3">
      <title>User Management System</title>
      <Row>
        <h1>User Management System</h1>
      </Row>
      <Row className="p-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">User Type</th>
            </tr>
          </thead>
          {userDetails.map((val) => {
            return (
              <tbody key={val.id}>
                <tr>
                  <td>{val.user_name}</td>
                  <td>{val.user_email}</td>
                  <td>{val.user_number}</td>
                  <td>{val.user_type}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </Row>
      <Row>
        <Col>
          Go to{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            Register Form
          </Link>
        </Col>
        <Col>
          Go to{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Col>
      </Row>
      <div>
        <div></div>
        <div></div>
        <div className="bg-primary"></div>
      </div>
    </Container>
  );
};

export default Home;
