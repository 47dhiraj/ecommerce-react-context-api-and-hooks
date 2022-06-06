import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

import useAxios from '../hooks/useAxios'

import { UserAuthContext, UserDetailsContext, UserUpdateProfileContext } from '../contexts/userContext';

import { ListMyOrdersContext } from '../contexts/orderContext';



function ProfileScreen() {

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const { state: auth_state, dispatch: auth_dispatch } = useContext(UserAuthContext)
    const { userInfo } = auth_state

    const { state, dispatch } = useContext(UserDetailsContext)
    const { error, loading, user } = state

    const { state: update_state, dispatch: update_dispatch } = useContext(UserUpdateProfileContext)
    const { success } = update_state

    const { state: order_state, dispatch: order_dispatch } = useContext(ListMyOrdersContext)
    const { success: successOrders, error: errorOrders, loading: loadingOrders, orders } = order_state

    let api = useAxios()                            


    useEffect(() => {

        if (!userInfo) {
            navigate(`/login`);
        }
        else {

            if (success == true) {
                update_dispatch({
                    type: 'USER_UPDATE_PROFILE_RESET'
                })
            }


            getDetailsOfUser()                              


            if (Array.isArray(orders) && orders?.length <= 0) {
                getMyOrdersList()                               
            }

        }

    }, [dispatch, userInfo, user, success,])                 



    let getDetailsOfUser = async () => {

        if (JSON.stringify(userInfo) === '{}' || userInfo == undefined) {
            navigate(`/login`);
        }
        else {

            if (!user || !user.name || userInfo.name !== user.name) {
                try {
                    dispatch({
                        type: 'USER_DETAILS_REQUEST'
                    })

                    const { data } = await api.get(`/api/users/profile/`)

                    dispatch({
                        type: 'USER_DETAILS_SUCCESS',
                        payload: data
                    })
                }
                catch (error) {
                    dispatch({
                        type: 'USER_DETAILS_FAIL',
                        payload: error.response && error.response.data.detail
                            ? error.response.data.detail
                            : error.message,
                    })
                }
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }

        }

    }


    let getMyOrdersList = async () => {

        if (Array.isArray(orders) && orders?.length <= 0 || orders == undefined) {

            try {
                order_dispatch({
                    type: 'LIST_MY_ORDERS_REQUEST'
                })

                const { data } = await api.get(`/api/orders/myorders/`)
                console.log('Orders Fetched : ', data)

                order_dispatch({
                    type: 'LIST_MY_ORDERS_SUCCESS',
                    payload: data,
                })

            }
            catch (error) {

                order_dispatch({
                    type: 'LIST_MY_ORDERS_FAIL',
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                })

            }

        }

    }



    const submitHandler = async (e) => {

        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        }
        else {

           
            try {

                update_dispatch({
                    type: 'USER_UPDATE_PROFILE_REQUEST'
                })

                const { data } = await api.put(
                    `/api/users/profile/update/`,
                    {
                        'id': user._id,
                        'name': name,
                        'email': email,
                        'password': password
                    },
                )


                update_dispatch({
                    type: 'USER_UPDATE_PROFILE_SUCCESS',
                    payload: data
                })

                auth_dispatch({                                                      
                    type: 'USER_LOGIN_SUCCESS',
                    payload: data
                })

                localStorage.setItem('userInfo', JSON.stringify(data))          

                setMessage('Profile updated successfully !')

            }
            catch (error) {
                update_dispatch({
                    type: 'USER_UPDATE_PROFILE_FAIL',
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                })
            }

        }
    }


    return (
        <Row className="py-3" style={{ marginTop: '80px', minHeight: '540px' }}>

            <Col md={1} className='mb-1'>
            </Col>


            <Col md={3} className='mb-5 mt-3'>

                <h3 style={{ textAlign: 'center' }}>Edit Profile</h3>

                {message && (success ? <Message variant='success'>{message}</Message> : <Message variant='danger'>{message}</Message>)}
                {(error) && <Message variant='danger'>{error}</Message>}
                {(loading) && <Loader />}

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='mt-4'>
                        Update
                    </Button>

                </Form>
            </Col>



            <Col md={1} className='mb-1'>
            </Col>



            <Col md={6} className='mb-5 mt-3'>

                <h3 style={{ textAlign: 'center' }}> Ordered Products</h3>

                {
                    loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant='danger'>{errorOrders}</Message>
                    ) : (
                        <Table striped responsive className='table-sm'>
                            <thead>

                                <tr className='text-center' >
                                    <th>S.N</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>View</th>
                                </tr>

                            </thead>

                            <tbody>
                                {
                                    orders.map((order, i) => (

                                        <tr className='text-center' key={order._id}>

                                            <td>{i+1}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice}</td>

                                            <td>
                                                {
                                                    order.isPaid ? (
                                                        <span> 
                                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                                            {/* { ' '+ order.paidAt.substring(0, 10) } */}
                                                        </span>
                                                    ) : (
                                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                    )
                                                }
                                            </td>

                                            <td className='text-left'>
                                                <LinkContainer to={`/order/${order._id}`} >
                                                    <Button className='btn btn-md btn-dark py-1'>Detail</Button>
                                                </LinkContainer>
                                            </td>

                                        </tr>

                                    ))
                                }
                            </tbody>

                        </Table>
                    )
                }


            </Col>



            <Col md={1}>
            </Col>

        </Row >
    )
}

export default ProfileScreen



