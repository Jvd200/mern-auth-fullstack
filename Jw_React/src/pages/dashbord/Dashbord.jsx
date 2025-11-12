import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let tokenToUse = accessToken;

        let response = await fetch("http://localhost:4000/api/users", {
          headers: {
            Authorization: `Bearer ${tokenToUse}`,
            "Content-Type": "application/json",
          },
        });

        // If token expired (401), try refreshing it
        if (response.status === 401 && refreshToken) {
          console.warn("Access token expired — attempting refresh...");

          const refreshResponse = await fetch(
            "http://localhost:4000/auth/refresh-token",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: refreshToken }),
            }
          );

          const refreshResult = await refreshResponse.json();

          if (refreshResponse.ok && refreshResult.newToken) {
            console.log("✅ Token refreshed successfully");
            localStorage.setItem("accessToken", refreshResult.newToken);

            // Retry fetching users with new token
            response = await fetch("http://localhost:4000/api/users", {
              headers: {
                Authorization: `Bearer ${refreshResult.newToken}`,
                "Content-Type": "application/json",
              },
            });
          } else {
            console.error("❌ Refresh token invalid. Redirecting to login.");
            localStorage.clear();
            navigate("/Login");
            return;
          }
        }

        const result = await response.json();

        if (response.ok && Array.isArray(result)) {
          setUsers(result);
        } else {
          console.error("Unexpected response:", result);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
        navigate("/Login");
      }
    };

    if (accessToken) {
      fetchUsers();
    } else {
      navigate("/Login");
    }
  }, [navigate, accessToken, refreshToken]);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4">User Dashboard</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    No users found or unauthorized access.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
