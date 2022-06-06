import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Row, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import { CarttContext } from '../contexts/cartContext';


function PaymentPage() {

    const navigate = useNavigate()

    const { state, dispatch } = useContext(CarttContext);
    const { shippingAddress } = state

    if (!shippingAddress.address){
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState(state.paymentMethod)


    useEffect(() => {

        if (paymentMethod !== "" && paymentMethod !== undefined) {
            localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))             
        }

    }, [dispatch, paymentMethod])


    
    const submitHandler = (e) => {

        e.preventDefault()

        if (paymentMethod !== "" && paymentMethod !== undefined)            
        {
            dispatch({                                         
                type: 'CART_SAVE_PAYMENT_METHOD',
                payload: paymentMethod
            })

            navigate('/placeorder')
        }
    }

    

    return (
        <Row className="pt-0" style={{ minHeight: '580px' }}>

            <FormContainer>
                <CheckoutSteps step1 step2 step3 />

                <Form onSubmit={submitHandler} >

                    <Form.Group className='pt-4'>

                        <Form.Label as='legend' className='text-center mb-2'>Select a payment method</Form.Label>

                        <Col className='d-flex .flex-row justify-content-center'>

                            <Form.Check
                                type='checkbox'
                                label='e-sewa'
                                id='esewa'
                                value='esewa'
                                checked={paymentMethod === 'esewa'}
                                name='paymentMethod'
                                required={paymentMethod === ""}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className='me-4'
                            >

                            </Form.Check>
                            
                            <Form.Check
                                type='checkbox'
                                label='Khalti'
                                id='khalti'
                                value='khalti'
                                checked={paymentMethod === 'khalti'}
                                name='paymentMethod'
                                required={paymentMethod === ""}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className='ms-4'
                            >
                            </Form.Check>

                        </Col>
                        
                    </Form.Group>

                    <div className='text-center mt-4' >
                        <Button type='submit' variant='primary' className='btn btn-primary p-1' >
                            Continue
                        </Button>

                    </div>

                </Form>

            </FormContainer>

        </Row>

    )
}

export default PaymentPage

