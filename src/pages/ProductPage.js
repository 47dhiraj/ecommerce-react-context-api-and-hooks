import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { Row, Col, Image, ListGroup, Button, Card, Container, Form } from 'react-bootstrap'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

import axios from "axios"

import { ProductDetailsContext } from '../contexts/productContext';




function ProductPage() {

    const navigate = useNavigate();

    const { id } = useParams();                     

    const { state, dispatch } = useContext(ProductDetailsContext);
    const { loading, product, error } = state


    const [qty, setQty] = useState(1)



    useEffect(() => {

        async function fetchProduct() {

            try {
                const { data } = await axios.get(`/api/products/${id}`)

                dispatch({
                    type: 'PRODUCT_DETAILS_SUCCESS',
                    payload: data
                })
            }
            catch (error) {

                dispatch({
                    type: 'PRODUCT_DETAILS_FAIL',
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                })
            }
        }

        fetchProduct()

    }, [dispatch, id])

    

    const addToCartHandler = () => {

        navigate(`/cart/${id}`, { state: Number(qty) })
        // navigate(`/cart`, { state: {id, parseInt(qty)} })

    }



    return (
        <Container className="pt-2" style={{ marginTop: '50px' }}>
            <div>
                <Link to='/' className='my-3 btn btn-primary p-1'><strong> Go Back </strong></Link>
                {
                    loading === undefined ?
                        <Loader />
                        : error ?
                            <Message variant='danger'>{error}</Message>
                            : (
                                <div>
                                    <Row style={{ minHeight: '540px' }}>

                                        <Col md={5}>
                                            {/* <Image src={product.image} alt={product.name}  fluid /> */}
                                            <img src={product.image} alt={product.name} width="88%" height="90%" className='rounded'/>
                                        </Col>


                                        <Col md={3}>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <h3 className='text-center'>{product.name}</h3>
                                                </ListGroup.Item>

                                                <ListGroup.Item className='text-center fw-bold'>
                                                    <Rating value={product.rating} text={` ${product.numReviews} reviews`} color={'#f8e825'} />
                                                </ListGroup.Item>

                                                <ListGroup.Item className='text-left fw-bold'>
                                                    Price:  रू {product.price}
                                                </ListGroup.Item>

                                                <ListGroup.Item className='text-left fw-bold' >
                                                    {product.description} and it works perfectly anywhere you take it
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>


                                        <Col md={1}>
                                        </Col>


                                        <Col md={3}>
                                            <Card style={{ background: `linear-gradient(45deg, #686dc3, #e83283)` }}>
                                                <ListGroup >
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col><strong> Price : </strong></Col>
                                                            <Col>
                                                                <strong> रू {product.price}</strong>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col><strong> Status : </strong></Col>
                                                            <Col>
                                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>


                                                    {product.countInStock > 0 && (
                                                        <ListGroup.Item>
                                                            <Row>

                                                                <Col><strong> Quantity : </strong></Col>

                                                                <Col xs='auto' className='my-0.5'>

                                                                    <Form.Select style={{ color: 'black' }} defaultValue={qty} onChange={(e) => setQty(e.target.value)}>

                                                                        {/* constructing an array out of countInStock number */}
                                                                        {
                                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                                <option key={x + 1} value={x + 1}>
                                                                                    {x + 1}
                                                                                </option>
                                                                            ))
                                                                        }

                                                                    </Form.Select>

                                                                </Col>

                                                            </Row>
                                                        </ListGroup.Item>
                                                    )}


                                                    <ListGroup.Item>
                                                        <Button
                                                            onClick={addToCartHandler}
                                                            className='btn-block'
                                                            style={{ width: '100%' }}
                                                            disabled={product.countInStock <= 0}
                                                            type='button'>
                                                            Add to Cart
                                                        </Button>
                                                    </ListGroup.Item>

                                                </ListGroup>
                                            </Card>
                                        </Col>


                                    </Row>

                                </div>
                            )
                }
            </div>
        </Container>


    )
}

export default ProductPage
