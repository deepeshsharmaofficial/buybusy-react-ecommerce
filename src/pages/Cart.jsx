import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';

// Component
import MySpinner from '../components/MySpinner';

// CSS
import { Button, Container, Figure } from "react-bootstrap";

// Context API
import { useProduct } from "../context/ProductContext";

const Cart = () => {

  const { 
    handleAdd,
    handleRemove, 
    userCart, 
    productLoading,
    getUserCart, 
    TotalCart,
    addRemovecartLoading 
  } = useProduct();

  useEffect(() => {
    getUserCart();
  }, [])
  
  return (
    <Container style={{ marginTop: "80px" }}>

      {productLoading ?
        <MySpinner />

        :

        (
          <>
            <h3 className="text-center mb-4">Shopping Cart</h3>
            { userCart.length === 0 ? (<p className="text-center"> OOPS! Your Cart is Empty 🛒</p>) 
            
              : 
              
              (
                <div className="row justify-content-center mb-5">
                  <div className="col-12">
                    <div>
                      {userCart.map((p) => (
                        <div key={p.id} className="border mb-3 p-3">

                          <div className="d-flex justify-content-between">
                            <div className="p-2 d-flex">
                              <Figure className="me-5">
                                <Figure.Image width={80} src={p.imageURL} />
                              </Figure>

                              <div>
                                <p className="mb-2 text-muted"></p>
                                <p> {p.name}</p>
                                <p >Price: {p.price} </p>
                              </div>
                            </div>

                            <div className="p-2 d-flex align-items-center">
                              <Button disabled={addRemovecartLoading} onClick={() => handleRemove(p.id)} variant="primary"> - </Button>
                              <span className='m-4'>   {p.quantity} </span>
                              <Button disabled={addRemovecartLoading} onClick={() => handleAdd({ ...p })} variant="primary"> + </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-lg-4 mt-4 ">
                    <h5 className="text-center">Order Summary</h5>

                    <div className="d-flex justify-content-between mt-4 mb-4 p-3 mb-2 bg-body-secondary rounded">
                      <div>Total Price</div>
                      <div> &#x20B9; {TotalCart(userCart)} </div>
                    </div>

                    <div className="d-grid mt-3">
                      <Button variant="danger" as={NavLink} to="/order" >Purchase</Button>
                    </div>
                  </div>
                </div>
              )
            }
          </>
        )
      }

    </Container>
  )
}

export default Cart;