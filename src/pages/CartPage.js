import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

import axios from "axios"

import { CarttContext } from '../contexts/cartContext';


const CartPage = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const qty = location.state

  const { id } = useParams();

  const { state, dispatch } = useContext(CarttContext);
  const { cartItems } = state


  if (cartItems?.length > 0 && cartItems !== undefined) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))            
  }
  else {
    localStorage.removeItem('cartItems')
  }



  useEffect(() => {

    const fetchProducts = async () => {                                     

      try {

        if (qty !== null & id !== undefined) {
          const { data } = await axios.get(`/api/products/${id}`)

          dispatch({                                                      
            type: 'CART_ADD_ITEM',
            payload: {
              product: data._id,
              name: data.name,
              image: data.image,
              price: data.price,
              countInStock: data.countInStock,
              qty
            }
          })

        }

      } catch (err) {
        console.log("Oops error occured ")
      }

    }



    fetchProducts()


  }, [dispatch, , id, qty])



  const checkoutHandler = () => {
    navigate('/shipping')
  }


  // Alternative way of dispatching action : 
  // const removeFromCartHandler = (id) => {
  //   dispatch({
  //     type: 'CART_REMOVE_ITEM',
  //     payload: id,
  //   })
  // }


  return (

    <Row className="py-5" style={{ minHeight: '580px', fontWeight: '500' }}>

      <Col md={1}></Col>


      <Col md={7}>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Link to="/" className='btn btn-primary my-3 p-1' style={{ marginRight: 'auto' }}> Go Back</Link>
          <h3 style={{ marginRight: 'auto', paddingTop: '32px' }}> Shopping Cart </h3>
        </div>

        {(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) < 0.1 | cartItems.length == 0) ? (
          <Message variant='info'>
            cart is empty ! <Link to='/'> Do Shopping </Link>
          </Message>
        ) : (
          <ListGroup variant='flush' className='rounded'>

            <ListGroupItem style={{ textAlign: 'center', fontSize: 'large', }} className='pt-2 pb-2 mb-0'>

              <Row>
                <Col md={2}>
                  Image
                </Col>

                <Col md={3}>
                  Name
                </Col>

                <Col md={2}>
                  Price
                </Col>

                <Col md={3}>
                  Quantity
                </Col>

                <Col md={1}>
                  Action
                </Col>
              </Row>

              <hr className='mt-2 mb-0' style={{ opacity: '0.6', height: '1.5px' }}></hr>

            </ListGroupItem>



            {cartItems.map(item => (
              <ListGroup.Item key={item.product} style={{ textAlign: 'center' }}>

                <Row>

                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    रू {item.price}
                  </Col>

                  <Col md={3}>
                    <Form.Select
                      defaultValue={item.qty}
                      onChange={
                        (e) => {
                          dispatch({
                            type: 'CART_ADD_ITEM',
                            payload: {
                              product: item.product,
                              name: item.name,
                              image: item.image,
                              price: item.price,
                              countInStock: item.countInStock,
                              qty: Number(e.target.value)
                            }
                          })
                        }
                      }
                    >
                      {

                        [...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))
                      }

                    </Form.Select>
                  </Col>

                  <Col md={1}>
                    <Button
                      type='button'
                      variant=''
                      onClick={() =>

                        dispatch({
                          type: 'CART_REMOVE_ITEM',
                          payload: item.product,
                        })

                        
                      }
                    >
                      <i className='fas fa-trash fa-lg'></i>
                    </Button>
                  </Col>

                </Row>

              </ListGroup.Item>
            ))}


          </ListGroup>
        )}


      </Col>

      <Col md={1}>
      </Col>

      <Col md={3} >
        <Card className='my-5' style={{ float: 'left', background: `linear-gradient(45deg, #686dc3, #e83283)` }}>
          <ListGroup variant='flush'>
            <ListGroup.Item style={{ fontSize: 'larger', fontWeight: 'bold' }}>

              <h4 style={{ color: '#000' }}>Quantity : <span style={{ color: 'white' }}> {cartItems.reduce((acc, item) => acc + item.qty, 0)} </span></h4>


              <span style={{ color: '#000' }} > Total : </span>
              <span> रू, </span>
              <span >
                {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </span>


            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block w-100'
              onClick={checkoutHandler}
              disabled={cartItems.length == 0 | cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) < 1}
            >
              CHECKOUT
            </Button>
          </ListGroup.Item>


        </Card>
      </Col>



    </Row>

  )



}

export default CartPage
