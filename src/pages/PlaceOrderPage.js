import { useState, useEffect, useContext } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

import { UserAuthContext } from '../contexts/userContext';

import { CarttContext } from '../contexts/cartContext';
import { OrderCreateContext } from '../contexts/orderContext';

import useAxios from '../hooks/useAxios'



function PlaceOrderPage() {

    const navigate = useNavigate()

    const { state: auth_state } = useContext(UserAuthContext)
    const { userInfo } = auth_state

    const { state, dispatch: cartdispatch } = useContext(CarttContext);
    const { paymentMethod } = state

    const { state: orderState, dispatch } = useContext(OrderCreateContext);
    const { order, error, success } = orderState


    let api = useAxios()                          

    state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    state.shippingPrice = (state.itemsPrice > 100 ? 0 : 10).toFixed(2)
    state.taxPrice = Number((0.082) * state.itemsPrice).toFixed(2)

    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2)


    useEffect(() => {

        ((paymentMethod === "" || state.cartItems.length <= 0) && navigate(`/payment`))

        if (success) 
        {
            cartdispatch({type: 'CART_CLEAR_ITEMS'})       
            localStorage.removeItem('cartItems')           
            localStorage.removeItem('shippingAddress')      

            navigate(`/order/${order._id}`)

            dispatch({ type: 'ORDER_CREATE_RESET' })     
        }

    }, [success])


    const placeOrder = async () => {

        if (JSON.stringify(userInfo) === '{}' || userInfo == undefined) {
            navigate(`/login`);
        }
        else {

            try {

                dispatch({
                    type: 'ORDER_CREATE_REQUEST'                      
                })

                const { data } = await api.post(
                    `/api/orders/add/`,
                    {
                        'orderItems': state.cartItems,                
                        'shippingAddress': state.shippingAddress,
                        'paymentMethod': state.paymentMethod,
                        'itemsPrice': state.itemsPrice,
                        'shippingPrice': state.shippingPrice,
                        'taxPrice': state.taxPrice,
                        'totalPrice': state.totalPrice,
                    }
                )

                dispatch({
                    type: 'ORDER_CREATE_SUCCESS',               
                    payload: data
                })


            }
            catch (error) {

                dispatch({
                    type: 'ORDER_CREATE_FAIL',                   
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                })

                if (error.response.status == 406) {           

                    cartdispatch({type: 'CART_CLEAR_ITEMS'})

                    localStorage.removeItem('cartItems')            
                    localStorage.removeItem('shippingAddress')

                    dispatch({ type: 'ORDER_CREATE_RESET' })

                    navigate('/')
                }
            }

        }


    }




    return (
        state.cartItems.length == 0 ?
            <div style={{ minHeight: '580px', marginTop: '150px' }}>
                <Message variant='danger'>Either, Payment method is not selected, or, the Cart is empty !</Message>
            </div>
            :
            <div className="mt-5">

                <CheckoutSteps step1 step2 step3 step4 />

                <Row className="pt-3" style={{ minHeight: '460px' }}>

                    <Col md={1}>
                    </Col>

                    <Col md={6}>

                        <ListGroup variant='flush' className='rounded' >
                            <ListGroup.Item >
                                <h4 className='pt-1 pb-0 mb-0'>Shipping Address</h4>

                                <h6 className='pt-0'>
                                    {state.shippingAddress.address},  {state.shippingAddress.city}
                                    {'  '}                                          
                                    {state.shippingAddress.postalCode},
                                    {'  '}                                          
                                    {state.shippingAddress.country}
                                </h6>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h4 className='pb-0 pb-0 mb-0'>Payment Method</h4>
                                <h6 className='pt-0'>
                                    {state.paymentMethod ? state.paymentMethod : ''}
                                </h6>
                            </ListGroup.Item>

                            <ListGroup.Item className='pt-0'>
                                <h4>Ordered Items</h4>
                                {
                                    state.cartItems.length === 0 ? <Message variant='info'>
                                        Your cart is empty
                                    </Message> : (
                                        <ListGroup style={{ background: `linear-gradient(45deg, #b3ccff, #7f83cc)` }}>
                                            {
                                                state.cartItems.map((item, index) => (

                                                    <ListGroup.Item key={index} >
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>

                                                            <Col >
                                                                <Link to={`/product/${item.product}`} className='text-dark' style={{ fontSize: 'large', fontWeight: 'bold' }}> {item.name} </Link>
                                                            </Col>

                                                            <Col md={4} style={{ color: 'black', fontWeight: 'bold' }} >
                                                                {item.qty} X {item.price} =  रू {(item.qty * item.price).toFixed(2)}
                                                            </Col>
                                                        </Row>

                                                        <hr className='mt-2 mb-0' style={{ opacity: '0.6', height: '2px' }}></hr>
                                                    </ListGroup.Item>

                                                ))
                                            }

                                        </ListGroup>
                                    )
                                }
                            </ListGroup.Item>

                        </ListGroup>

                    </Col>


                    <Col md={1}>
                    </Col>


                    <Col md={3} >

                        <Card className='text-center' style={{ background: `linear-gradient(45deg, #686dc3, #e83283)` }}>
                            <ListGroup>

                                <ListGroup.Item>
                                    <h3 className='pt-1 pb-0 mb-0'><u>  Order Detail </u></h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items : </Col>
                                        <Col> रू {state.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping : </Col>
                                        <Col> रू {state.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax : </Col>
                                        <Col> रू {state.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total : </Col>
                                        <Col> रू {state.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {error &&
                                    <ListGroup.Item>
                                        <Message variant='danger'>{error}</Message>
                                    </ListGroup.Item>
                                }


                                <ListGroup.Item className='text-center'>
                                    <Button
                                        type='button'
                                        className='btn-block w-50 center p-1'
                                        disabled={state.cartItems === 0 || JSON.stringify(userInfo) === '{}' || !paymentMethod}
                                        onClick={placeOrder}                         
                                    >
                                        Place Order
                                    </Button>
                                </ListGroup.Item>


                            </ListGroup>

                        </Card>
                    </Col>




                </Row>

            </div>

    )


}

export default PlaceOrderPage
