import React, { useState } from 'react'

// CSS
import { Col, Button, Row, Container, Form } from "react-bootstrap";

// Context API
import { useProduct } from '../../context/ProductContext';

const AddProduct = () => {

  const { handleCreateNewListing } = useProduct();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Men's Clothing");
  const [price, setPrice] = useState(0);
  const [imageURL, setImageURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    handleCreateNewListing(name, category, price, imageURL);

    setName("");
    setPrice(0);
    setImageURL("");
  };
  
  return (
    <>

    <Container style={{ marginTop: "80px"}}>

      <h3 className="text-center mb-4">Add Product</h3>

      <Row className="d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text" 
                      placeholder="Enter Product Name"
                      required
                  />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Category</Form.Label>
                    <Form.Select 
                      aria-label="Default select example"
                      defaultValue={category} 
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Men's Clothing">Men's Clothing</option>
                      <option value="Women's Clothing">Women's Clothing</option>
                      <option value="Jewelery">Jewelery</option>
                      <option value="Electronics">Electronics</option>
                    </Form.Select>  
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type="number" 
                      placeholder="Enter Price" 
                      required
                  />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Product Picture link </Form.Label>
                  <Form.Control
                      value={imageURL}
                      onChange={(e) => setImageURL(e.target.value)}
                      type="text"
                      required
                  />
              </Form.Group>

              <Button variant="primary" type="submit">
                  Add Product
              </Button>
          </Form>
        </Col>

      </Row>

    </Container>
    </>    
  )
}

export default AddProduct;