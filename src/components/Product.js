import { Link } from 'react-router-dom'

import { Card } from 'react-bootstrap'

import Rating from './Rating'


function Product({ product })                   // product prop ho so tei vayera props destructuring gareko
{

    return (
        <div>
            <Card className="my-2 p-1 rounded">

                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} style={{ minHeight: '292px', maxHeight: '295px' }}/>
                </Link>


                <Card.Body style={{ padding: '0.5rem' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

                        <Link to={`/product/${product._id}`}>
                            <Card.Title className="text-center">
                                <bold>{product.name.length > 12 ? product.name.substring(0, 12)+ " ..." : product.name}</bold>
                            </Card.Title>
                        </Link>

                        <Card.Text as="h6" className="text-center" style={{ paddingTop: '3px' }}>
                            रू{product.price}
                        </Card.Text>

                    </div>

                </Card.Body>

            </Card>
        </div>
    )
}

export default Product
