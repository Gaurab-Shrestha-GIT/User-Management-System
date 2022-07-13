import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StaffProfile = () => {
  const staffEmail = localStorage.getItem("staffEmail");

  const [userDetails, setUserDetails] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:5000/user/staffprofile", {
        staffEmail: staffEmail,
      })
      .then((response) => {
        setUserDetails(response.data[0]);
      });
  }, [staffEmail]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const edit = () => {
    navigate(`/updatestaffprofile/${userDetails.id}`);
  };

  return (
    <Container className="mt-3">
      <title>Staff Profile</title>
      <Row>
        <h1>Staff Profile</h1>
      </Row>
      <Row className="m-5">
        <Col className="p-2">
          User ID:
          {userDetails.id}
        </Col>
        <Col className="p-2">Staff Email: {userDetails.user_email}</Col>
        <Col className="p-2">Staff Name: {userDetails.user_name}</Col>
      </Row>
      <Row className="m-5">
        <Col className="p-2">
          Staff Number:
          {userDetails.user_number}
        </Col>
        <Col className="p-2">
          User Type:
          {userDetails.user_type}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={edit}>Update</Button>
        </Col>
        <Col>
          <Button onClick={logout}>Logout</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default StaffProfile;
