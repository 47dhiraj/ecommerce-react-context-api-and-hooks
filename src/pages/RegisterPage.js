import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { Email } from '@material-ui/icons';
import { Person } from '@material-ui/icons';
import { Lock } from '@material-ui/icons';


import axios from "axios"

import { UserAuthContext } from '../contexts/userContext';


function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const { state, dispatch, register_state, register_dispatch } = useContext(UserAuthContext);
    const { error, loading, userInfo } = register_state

    console.log('Register page UserInfo Initial : ', userInfo)


    useEffect(() => {

        if (JSON.stringify(userInfo) !== '{}' && userInfo?.tokens !== undefined)    
        {
            localStorage.setItem('userInfo', JSON.stringify(userInfo))

            navigate('/')
        }

    }, [userInfo])



    const submitHandler = async (e) => {

        e.preventDefault()                                  

        console.log('Register button clicked')


        if (password != confirmPassword) {
            setMessage('Passwords do not match')

        } else {

            try {
                register_dispatch({
                    type: 'USER_REGISTER_REQUEST'
                })

                const config = {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }

                const { data } = await axios.post(
                    '/api/users/register/',
                    { 'name': name, 'email': email, 'password': password },
                    config
                )


                register_dispatch({
                    type: 'USER_REGISTER_SUCCESS',
                    payload: data
                })

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

    }


    return (
        <FormContainer>

            <h2 style={{ textAlign: 'center' }}>Sign Up</h2>

            {message && <Message variant='danger'>{message}</Message>}

            {error && <Message variant='danger'>{error}</Message>}

            {loading && <Loader />}


            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label className='mt-1'> <Person /> Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label className='mt-1'> <Email /> Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email Address'
                        value={email}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label className='mt-1'> <Lock /> Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label className='mt-1'> <Lock /> Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        autoComplete="off"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='btn-block' style={{ marginTop: '15px', width: '100%' }}>
                    Register
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account ? <Link to='/login'> Sign In </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default RegisterPage
