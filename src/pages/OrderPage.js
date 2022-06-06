import React, { useState, useEffect, useContext } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import khalti from '../assets/khalti.svg'
import esewa from '../assets/esewa.png'

import { UserAuthContext } from '../contexts/userContext';

import { OrderDetailsContext } from '../contexts/orderContext';

import useAxios from '../hooks/useAxios'



function OrderPage() {

    const { id: orderId } = useParams();

    const navigate = useNavigate()

    const { state, dispatch } = useContext(OrderDetailsContext)
    const { order, error, loading, success } = state

    const { state: auth_state } = useContext(UserAuthContext)
    const { userInfo } = auth_state


    let api = useAxios()                               



    if (!loading && loading !== undefined)                             
    {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    useEffect(() => {

        if (!userInfo) {
            navigate(`/login`);
        }

        if (order == undefined || order._id !== Number(orderId)) {
            getOrderDetails()
        }

    }, [dispatch, order, error, success])



    let getOrderDetails = async () => {
        try {

            dispatch({
                type: 'ORDER_DETAILS_REQUEST'
            })

            const { data } = await api.get(`/api/orders/${orderId}/`)

            dispatch({
                type: 'ORDER_DETAILS_SUCCESS',
                payload: data
            })

        } catch (error) {

            dispatch({
                type: 'ORDER_DETAILS_FAIL',
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
            })

        }
    }




    let esewaPaymentRequest = async (e) => {

        let path = "https://uat.esewa.com.np/epay/main"

        let params = {
            amt: order.totalPrice,
            psc: 0,
            pdc: 0,
            txAmt: 0,
            tAmt: order.totalPrice,
            pid: order._id,
            scd: "EPAYTEST",
            su: "http://127.0.0.1:8000/api/orders/esewa_payment/",
            fu: `http://127.0.0.1:3000/order/${order._id}`
        }


        var esewa_form = document.createElement("form");
        esewa_form.setAttribute("method", "POST");
        esewa_form.setAttribute("action", path);
        esewa_form.setAttribute("id", "esewa_form");

        for (var key in params) {

            var hiddenField = document.createElement("input");

            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            esewa_form.appendChild(hiddenField);
        }

        document.body.appendChild(esewa_form);

        esewa_form.submit();

        const form = document.getElementById("esewa_form");
        form.remove();

    }

    return loading || order == undefined ? (
        <Loader />
    ) : !loading && error ? (
        <Message variant='danger'>{error}</Message>
    ) : (

        <div className="mt-5 pt-0">

            <Row className="pt-3" style={{ minHeight: '580px' }}>

                <Col md={1}>
                </Col>


                <Col md={6}>

                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h4>Shipping Information</h4>
                            <p><strong>Name : </strong> {order.user.name}</p>
                            <p><strong>Email : </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p className='mb-0 pb-0'>
                                <strong>Shipping : </strong>
                                {order.shippingAddress.address},  {order.shippingAddress.city}
                                {'  '}
                                {order.shippingAddress.postalCode},
                                {'  '}
                                {order.shippingAddress.country}
                            </p>

                            {
                                order.isDelivered ? (
                                    <Message variant='success'> Delivered on : {order.deliveredAt.substring(0, 10)} </Message>
                                ) : (
                                    <Message variant='warning'> Not delivered </Message>
                                )
                            }
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h4 >Payment Method</h4>
                            <p className='mb-0 pb-0'>
                                <strong>Method : </strong>
                                {order.paymentMethod}
                            </p>

                            {
                                order.isPaid ? (
                                    <Message variant='success'> Paid on : {order.paidAt.substring(0, 10)} </Message>
                                ) : (
                                    <Message variant='warning'> Not paid yet </Message>
                                )
                            }

                        </ListGroup.Item>


                        <ListGroup.Item className='pt-0'>
                            <h4>Order Items</h4>

                            {
                                order.orderItems.length === 0 ?
                                    <Message variant='info' >
                                        Order Empty
                                    </Message>
                                    : (
                                        <ListGroup variant='flush' style={{ background: `linear-gradient(45deg, #b3ccff, #7f83cc)` }}>

                                            {
                                                order.orderItems.map((item, index) => (

                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>

                                                            <Col>
                                                                <Link to={`/product/${item.product}`} className='text-dark' style={{ fontSize: 'large', fontWeight: 'bold' }}>{item.name}</Link>
                                                            </Col>

                                                            <Col md={4} style={{ color: 'black', fontWeight: 'bold' }}>
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


                <Col md={3}>
                    <Card className="mt-0 text-center" style={{ background: `linear-gradient(45deg, #686dc3, #e83283)` }}>
                        <ListGroup variant='flush'>

                            <ListGroup.Item>
                                <h3 className='pt-1 pb-0 mb-0'><u>  Order Detail </u></h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className='text-center'>
                                    <Col>Items : </Col>
                                    <Col>  रू {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className='text-center'>
                                    <Col>Shipping : </Col>
                                    <Col> रू {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className='text-center'>
                                    <Col>Tax : </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className='text-center'>
                                    <Col>Total : </Col>
                                    <Col> रू {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {
                                order.paymentMethod == 'esewa' && JSON.stringify(userInfo) !== '{}' && order.isPaid !== true ?
                                    <ListGroup.Item>
                                        <Row className='justify-content-center'>
                                            <Link to="#">
                                                <img onClick={esewaPaymentRequest} src={esewa} alt={esewa} className='rounded w-50' />
                                            </Link>
                                        </Row>
                                    </ListGroup.Item>
                                    : order.paymentMethod == 'khalti' && JSON.stringify(userInfo) !== '{}' && order.isPaid !== true ?
                                        <ListGroup.Item>
                                            <Row className='justify-content-center'>
                                                <Link to="#">
                                                    <img src={khalti} alt={khalti} className='rounded w-50' />
                                                </Link>
                                            </Row>
                                        </ListGroup.Item>
                                        :
                                        <ListGroup.Item>
                                            <Row></Row>
                                        </ListGroup.Item>
                            }





                        </ListGroup>


                    </Card>
                </Col>

            </Row>
        </div>

    )


}

export default OrderPage

