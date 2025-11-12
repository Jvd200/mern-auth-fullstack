import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    password: "",
  });
  //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      navigate("/Login");
    } catch (error) {
      console.error(error.message);
    } finally {
      setFormData({
        email: "",
        name: "",
        password: "",
      });
    }
  };
  return (
    <div className="center-form">
      <Form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
