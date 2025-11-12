import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Headder.css";

function Headder() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };
  return (
    <div>
      <Navbar bg={token ? "primary" : "dark"} variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="">
            {token ? "Logged-In" : "Not-Logged-In"}
          </Navbar.Brand>
          <Nav className="ml-auto">
            {token ? (
              <>
                <Nav.Link as={Link} to="/Dashbord" className="nav-link">
                  Dashbord
                </Nav.Link>
                <Nav.Link className="nav-link" onClick={handLogout}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register" className="nav-link">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/Login" className="nav-link">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Headder;
