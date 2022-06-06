import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'

import CheckoutSteps from '../components/CheckoutSteps'

import { CarttContext } from '../contexts/cartContext';


function ShippingPage() {

    const navigate = useNavigate()

    const { state, dispatch } = useContext(CarttContext);
    const { shippingAddress } = state

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)


    useEffect(() => {

        if (JSON.stringify(shippingAddress) !== '{}' && shippingAddress !== undefined) {
            localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress))               
        }

    }, [dispatch, shippingAddress])


    const submitHandler = (e) => {

        e.preventDefault()                                                    

        dispatch({                                                          
            type: 'CART_SAVE_SHIPPING_ADDRESS',
            payload: { address, city, postalCode, country }
        })


        setTimeout(() => {             
            navigate('/payment')        
        }, 700);

    }


    return (
        <Row className="pt-0 " style={{ minHeight: '580px' }}>

            <FormContainer>

                <h2 style={{ textAlign: 'center' }}>Product Shipping Form</h2>

                <CheckoutSteps step1 step2 />


                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='address'>

                        <Form.Label className='mt-2'> Shipping Address </Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter shipping address'
                            value={address ? address : ''}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>

                    </Form.Group>

                    <Form.Group controlId='city'>

                        <Form.Label className='mt-2'> City </Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter city'
                            value={city ? city : ''}
                            onChange={(e) => setCity(e.target.value)}
                        >
                        </Form.Control>

                    </Form.Group>

                    <Form.Group controlId='postalCode'>

                        <Form.Label className='mt-2'> Postal Code </Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter postal code'
                            value={postalCode ? postalCode : ''}
                            onChange={(e) => setPostalCode(e.target.value)}
                        >
                        </Form.Control>

                    </Form.Group>

                    <Form.Group controlId='country'>

                        <Form.Label className='mt-2'> Country </Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter country'
                            value={country ? country : ''}
                            onChange={(e) => setCountry(e.target.value)}

                        >
                        </Form.Control>

                    </Form.Group>

                    <div className='text-start mt-3' >
                        <Button type='submit' variant='primary' className='btn-block w-25' >
                            Continue
                        </Button>
                    </div>


                </Form>

            </FormContainer>

        </Row>
    )

}

export default ShippingPage
