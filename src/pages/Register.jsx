import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

// CSS
import { Col, Button, Row, Container, Card, Form  } from "react-bootstrap";

// Context API
import { useAuth } from '../context/AuthContext';

// React Toastify
import { toast } from 'react-toastify';

const Register = () => {
  const { registerWithEmailAndPassword, currentUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      await registerWithEmailAndPassword(email, password);;
      navigate("/");
      toast.success('Successfully Register !');
      
      } catch(err) {  
        toast.error("Failed to create an account");
      }

      setLoading(false);

      setEmail("");
      setPassword("");
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
   })
   

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>

            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Register</h2>
                  <p className=" mb-5">Please enter your name, email and password!</p>

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

                      
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              type="password" 
                              placeholder="Password"
                              required
                          />
                      </Form.Group>
                      
                      <div className="d-grid">
                        <Button variant="primary" type="submit" disabled={loading}>
                          Register
                        </Button>
                      </div>

                    </Form>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}

                        <NavLink to="/login" className="text-primary fw-bold">
                          Sign In
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
    </div>
  )
}

export default Register;