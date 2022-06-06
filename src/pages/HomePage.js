import { useEffect, useContext } from "react"
import { Row, Col, Container } from "react-bootstrap"
import axios from "axios"
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ProductListContext } from '../contexts/productContext';
import Product from '../components/Product'



function HomePage() {

    const { dispatch } = useContext(ProductListContext);
    

    useEffect(() => {

        async function fetchProduct() {
            try {

                const { data } = await axios.get(`/api/products/`)

                dispatch({
                    type: 'PRODUCT_LIST_SUCCESS',
                    payload: data
                })
            }
            catch (error) {

                dispatch({
                    type: 'PRODUCT_LIST_FAIL',
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                })
            }
        }

        fetchProduct()

    }, [dispatch])



    const { state } = useContext(ProductListContext);
    const { loading, products, error } = state


    return (

        <Container className="mt-5" style={{ minHeight: '80vh' }}>
            <div>
                <h3>Electronics</h3>

                {
                    loading === undefined ? <Loader />
                        : error ? <Message variant='danger' > {error} </Message>
                            :
                            <Row>
                                {
                                    products ? products.map(product => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product} />
                                        </Col>
                                    )) : null
                                }
                            </Row>
                }


                
            </div>
        </Container>

       
    )
}

export default HomePage
