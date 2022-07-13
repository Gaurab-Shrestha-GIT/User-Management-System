import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const customerEmail = localStorage.getItem("customerEmail");

  const [userDetails, setUserDetails] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:5000/user/customerprofile", {
        customerEmail: customerEmail,
      })
      .then((response) => {
        setUserDetails(response.data[0]);
      });
  }, [customerEmail]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const update = () => {
    navigate(`/updatecustomerprofile/${userDetails.id}`);
  };

  return (
    <Container className="mt-3">
      <title>Customer Profile</title>
      <Row>
        <h1>Customer Profile</h1>
      </Row>
      <Row className="m-5">
        <Col className="p-2">User ID: {userDetails.id}</Col>
        <Col className="p-2">Customer Email: {userDetails.user_email}</Col>
        <Col className="p-2">Customer Name: {userDetails.user_name}</Col>
      </Row>
      <Row className="m-5">
        <Col className="p-2">
          Customer Number:
          {userDetails.user_number}
        </Col>
        <Col className="p-2">
          User Type:
          {userDetails.user_type}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={update}>Update</Button>
        </Col>
        <Col>
          <Button onClick={logout}>Logout</Button>
        </Col>
      </Row>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

export default CustomerProfile;
