import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Backend Response:", result);

      if (!response.ok) {
        alert(result.message || "Login failed");
        return;
      }

      // ✅ Save both tokens (your backend sends these)
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      console.log("Login successful ✅");
      navigate("/Dashbord");
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="center-form">
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
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
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100 mt-3">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
