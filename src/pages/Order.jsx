import React, {useEffect} from 'react'

// Component
import MySpinner from '../components/MySpinner';

// CSS
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";

// Context API
import { useProduct } from '../context/ProductContext';


const Order = () => {
  // Context API
  const { userOrder, getUserOrderHistory, TotalCart, productLoading } = useProduct();

  useEffect(() => {
    getUserOrderHistory();
  }, []);

  return (
    <Container style={{ marginTop: "80px"}}>

      { productLoading ?
      
        <MySpinner />

        :

        <>
          <h3 className="text-center mb-4">My Orders</h3>
      
          { userOrder.length == 0 ? 

            <p className="text-center"> Place Your First Order ! 😁</p>
            
            :
        
            userOrder.map((orders) => (
              <div className="mb-5" key={orders.id}>
                <p className="text-muted fw-semibold">Order on: {orders.orderDate}</p>
                <p className="text-muted fw-semibold">Order Id: {orders.id}</p>
                <Table striped bordered hover size="sm table align-middle">
                    <thead>
                      <tr>
                        <th className="text-muted">TITLE</th>
                        <th className="text-muted">PRICE</th>
                        <th className="text-muted">QUANTITY</th>
                        <th className="text-muted">TOTAL PRICE</th>
                      </tr>
                    </thead>

                    <tbody className="table-group-divider">
                      {orders.userCart.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot>
                      <tr>
                        <th colspanspan={2}></th>
                        <th></th>
                        <th>Total</th>
                        <th>&#x20B9;
                          {TotalCart(orders.userCart)}/-
                        </th>
                      </tr>
                    </tfoot>
                </Table>
              </div> 
            ))
          }
     
        </> 
      }

  </Container>        
  )
}

export default Order;