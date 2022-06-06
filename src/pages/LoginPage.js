import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Group, InputGroup } from 'react-bootstrap'

import { Email } from '@material-ui/icons';
import { Lock } from '@material-ui/icons';

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import axios from "axios"

import { UserAuthContext } from '../contexts/userContext';


function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { state, dispatch } = useContext(UserAuthContext);               
    const { error, loading, userInfo } = state                              

    console.log('UserInfo Initial : ', userInfo)

    useEffect(() => {

        console.log('UserInfo in UseEffect : ', userInfo);

        if (JSON.stringify(userInfo) !== '{}' && userInfo?.tokens !== undefined) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo))            

            navigate('/')                                        
        }

    }, [dispatch, userInfo])                                                  



    const submitHandler = async (e) => {                                    

        e.preventDefault()                                                  


        try {

            dispatch({
                type: 'USER_LOGIN_REQUEST'
            })

            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }

            const { data } = await axios.post(
                '/api/users/login/',
                { 'username': email, 'password': password },
                config
            )


            dispatch({
                type: 'USER_LOGIN_SUCCESS',
                payload: data
            })

        } catch (error) {

            dispatch({
                type: 'USER_LOGIN_FAIL',
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
            })
        }


    }


    return (

        <FormContainer>

            <h2 style={{ textAlign: 'center' }}>Sign In</h2>

            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>

                    <Form.Label className='mt-3'> <Email /> Email Address  </Form.Label>
                    
                    <Form.Control
                        type='email'
                        placeholder='Enter Email Address'
                        value={email}
                        required
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>



                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label className='mt-2'> <Lock /> Password </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        required
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary' className='btn-block' style={{ marginTop: '25px', width: '100%' }}>
                    Sign In
                </Button>

            </Form>

            <Row className='pt-4'>
                <Col>
                    Not registered yet ? <Link to='/register'> Create an Account </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginPage