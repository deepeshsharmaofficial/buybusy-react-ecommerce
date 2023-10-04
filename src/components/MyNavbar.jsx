import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

// CSS
import { Container, Nav, Navbar, Button, ButtonGroup, Offcanvas  } from "react-bootstrap";

// Context API
import { useAuth } from "../context/AuthContext"

// React Toastify
import { toast } from 'react-toastify';

const MyNavbar = () => {
  const navigate = useNavigate();

  const { currentUser, logout, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {

    setLoading(true);

    try {
      await logout();
      navigate("/");
      toast.success("Successfully Logout !");

    } catch(error) {
      toast.error("Failed to Logout");
    }
    setLoading(false);
  }

  const [offcanvasOpen, setOffcanvasOpen] = useState(false); // State to track offcanvas menu open/close

  const toggleOffcanvas = () => {
    setOffcanvasOpen(!offcanvasOpen); // Toggle the state when called
  };

  // Function to close the offcanvas when a link is clicked
  const handleCloseOffcanvas = () => {
    setOffcanvasOpen(false);
  };

  const authButton = () => {
      if (!currentUser) {
          return (
            <>            
              <ButtonGroup>
                  <Button variant="light" as={NavLink} to="/login" onClick={handleCloseOffcanvas}>Login</Button>
                  <Button variant="light" as={NavLink} to="/register" onClick={handleCloseOffcanvas}>Signup</Button>
              </ButtonGroup>
            </>
          )

      } else {
          return (
            <>
              <Nav.Link className="me-3" as={NavLink} to="/order" onClick={handleCloseOffcanvas}>
                Order
              </Nav.Link>
              <Nav.Link className="me-3" as={NavLink} to="/cart" onClick={handleCloseOffcanvas}>
                Cart
              </Nav.Link>

        
                {isAdmin ? 
                (<Nav.Link className="mb-2 mb-lg-0 me-3" as={NavLink} to="/admin/addproduct" onClick={handleCloseOffcanvas}>
                  Admin
                </Nav.Link>)
                :
                null
                }

              <Button disabled={loading} variant="light" onClick={() => { handleLogout(); handleCloseOffcanvas(); }}> Logout </Button>
            </>
          )
      }
    }

    return (
        <Navbar expand="lg" bg="primary" data-bs-theme="dark" fixed="top">
          <Container>

            <Navbar.Brand as={NavLink} to="/" onClick={handleCloseOffcanvas}>
              BuyBusy
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" onClick={toggleOffcanvas}/>

            <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offnvasNavbarLabel-expand-lg" placement="end" bg="primary" data-bs-theme="dark" show={offcanvasOpen} onHide={handleCloseOffcanvas} >

              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offnvasNavbarLabel-expand-lg" > BuyBusy </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">            
                  <Nav.Link as={NavLink} to="/" onClick={handleCloseOffcanvas}> Home </Nav.Link>
                </Nav>

                <Nav>
                    {authButton()}
                </Nav>
              </Offcanvas.Body>

            </Navbar.Offcanvas>
            
          </Container>
        </Navbar>
    )
}

export default MyNavbar;