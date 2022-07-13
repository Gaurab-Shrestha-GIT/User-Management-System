import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [userDetails, setUserDetails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/admin/allusers").then((response) => {
      setUserDetails(response.data);
      console.log(response);
    });
  }, []);

  const changeToCustomer = (id) => {
    axios
      .put(`http://localhost:5000/admin/alluserscust/${id}`)
      .then((response) => {
        alert("User Successfully Changed to Customer");
        window.location.reload();
      });
  };
  const changeToStaff = (id) => {
    axios
      .put(`http://localhost:5000/admin/allusersstaf/${id}`)
      .then((response) => {
        alert("User Successfully Changed to Staff");
        window.location.reload();
      });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Container className="mt-3">
      <title>All Users</title>
      <Row>
        <h1>All Users</h1>
      </Row>
      <Row className="p-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">User Type</th>

              <th scope="col">Action</th>
            </tr>
          </thead>

          {userDetails.map((val) => {
            return (
              <tbody key={val.id}>
                <tr>
                  <td>{val.id}</td>
                  <td>{val.user_name}</td>
                  <td>{val.user_email}</td>
                  <td>{val.user_number}</td>
                  <td>{val.user_type}</td>
                  <td>
                    <Button
                      className="bg-success"
                      disabled={val.user_type === "Staff"}
                      onClick={() => {
                        changeToStaff(val.id);
                      }}
                    >
                      Staff
                    </Button>
                    <Button
                      className="bg-dark"
                      disabled={val.user_type === "Customer"}
                      onClick={() => {
                        changeToCustomer(val.id);
                      }}
                    >
                      Customer
                    </Button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={4} md={4}>
          <Button onClick={logout}>Logout</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AllUsers;
