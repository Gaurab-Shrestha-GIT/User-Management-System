import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStaffProfile = () => {
  const [staffName, setStaffName] = useState("");
  const [staffPhoneNumber, setStaffPhoneNumber] = useState("");
  const [staffPassword, setStaffPassword] = useState("");

  const [nameMessage, setNameMessage] = useState("");
  const [numberMessage, setNumberMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .post("http://localhost:5000/user/updatestaffprofile", {
        staffId: id,
      })
      .then((response) => {
        setStaffName(response.data[0].user_name);
        setStaffPhoneNumber(response.data[0].user_number);
        setStaffPassword(response.data[0].user_password);
      });
  }, [id]);

  const update = () => {
    axios
      .put(`http://localhost:5000/user/updatestaffprofile/${id}`, {
        staffName: staffName,
        staffPhoneNumber: staffPhoneNumber,
        staffPassword: staffPassword,
      })
      .then((response) => {
        setNameMessage(response.data.nameMessage);
        setNumberMessage(response.data.numberMessage);
        setPasswordMessage(response.data.passwordMessage);
        if (response.data.updated === true) {
          alert("Updated Successfully");
          navigate("/staffprofile");
        }
      });
  };

  return (
    <Container className="mt-3">
      <title>Update Staff Profile</title>
      <Row>
        <h1>Update Staff Profile</h1>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form className="py-4">
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                value={staffName}
                onChange={(event) => {
                  setStaffName(event.target.value);
                }}
              ></Form.Control>

              <Form.Label>{nameMessage}</Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={staffPhoneNumber}
                onChange={(event) => {
                  setStaffPhoneNumber(event.target.value);
                }}
              ></Form.Control>
              {numberMessage}
              <Form.Label> {numberMessage}</Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Password"
                value={staffPassword}
                onChange={(event) => {
                  setStaffPassword(event.target.value);
                }}
              ></Form.Control>
              <Form.Label>{passwordMessage}</Form.Label>
            </Form.Group>

            <Button onClick={update}>Update</Button>
          </Form>
        </Col>
      </Row>
      <div>
        <div></div>
      </div>
    </Container>
  );
};

export default UpdateStaffProfile;
