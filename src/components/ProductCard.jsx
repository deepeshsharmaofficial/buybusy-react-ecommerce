import React from 'react'

// CSS
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductCard = (props) => {

  const { name, price, category, imageURL } = props

  return (

    <Card>
      <Card.Img variant="top" src={imageURL} />

      <Card.Body className="m-0">
        <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Price: ₹{price}</Card.Text>
      </Card.Body>

      <Card.Body>
        <div className="d-grid">
          <Button variant="primary"> Add to Cart </Button>

        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;
