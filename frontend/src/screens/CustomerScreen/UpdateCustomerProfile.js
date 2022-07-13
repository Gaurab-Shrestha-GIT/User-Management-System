import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCustomerProfile = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");

  const [nameMessage, setNameMessage] = useState("");
  const [numberMessage, setNumberMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:5000/user/updatecustomerprofile", {
        customerId: id,
      })
      .then((response) => {
        setCustomerName(response.data[0].user_name);
        setCustomerPassword(response.data[0].user_password);
        setCustomerPhoneNumber(response.data[0].user_number);
      });
  }, [id]);

  const update = () => {
    axios
      .put(`http://localhost:5000/user/updatecustomerprofile/${id}`, {
        id: id,
        name: customerName,
        number: customerPhoneNumber,
        password: customerPassword,
      })
      .then((response) => {
        setNameMessage(response.data.nameMessage);
        setNumberMessage(response.data.numberMessage);
        setPasswordMessage(response.data.passwordMessage);
        if (response.data.updated === true) {
          alert("Updated Successfully");
          navigate("/customerprofile");
        }
      });
  };

  return (
    <Container className="mt-3">
      <title>Update Customer Profile</title>
      <Row>
        <h1>Update Customer Profile</h1>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form className="py-4">
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                value={customerName}
                onChange={(event) => {
                  setCustomerName(event.target.value);
                }}
              ></Form.Control>
              <Form.Label>{nameMessage}</Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={customerPhoneNumber}
                onChange={(event) => {
                  setCustomerPhoneNumber(event.target.value);
                }}
              ></Form.Control>
              <Form.Label> {numberMessage}</Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Password"
                value={customerPassword}
                onChange={(event) => {
                  setCustomerPassword(event.target.value);
                }}
              ></Form.Control>

              <Form.Label>{passwordMessage}</Form.Label>
            </Form.Group>

            <Button onClick={update}>Update</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateCustomerProfile;
