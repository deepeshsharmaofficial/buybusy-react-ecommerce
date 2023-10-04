import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

// CSS
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

// Context API
import { useAuth } from "../context/AuthContext"

// React Toastify
import { toast } from 'react-toastify';

export default function ForgotPassword() {

  const { resetPassword } = useAuth()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true);
    try {
      setLoading(true)
      await resetPassword(email);
      toast.success("Check your inbox for further instructions !");
      navigate("/");

    } catch {
      toast.error("Failed to reset password");
    }
    setLoading(false);
    setEmail("");
  }

  return (
    <>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>

            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Forget Password</h2>
                  <p className=" mb-5">Please enter your login email</p>

                  <div className="mb-3">

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            placeholder="Enter email"
                            required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <p className="small">
                          <NavLink className="text-primary" to="/login">
                            Login?
                          </NavLink>
                        </p>
                      </Form.Group>
                      
                      <div className="d-grid">
                        <Button variant="primary" type="submit" disabled={loading}>
                          Reset Password
                        </Button>
                      </div>

                    </Form>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Need an account?{" "}

                        <NavLink to="/register" className="text-primary fw-bold">
                          Sign Up
                        </NavLink>
                      </p>
                    </div>

                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}