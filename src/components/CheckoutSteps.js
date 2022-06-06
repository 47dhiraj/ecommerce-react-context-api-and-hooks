import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'



function CheckoutSteps({ step1, step2, step3, step4 }) {

    return (
        <Nav className='justify-content-center mt-3 mb-1'>           

            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login' style={{ fontSize: 'larger' }}>
                        <Nav.Link >Login</Nav.Link>
                    </LinkContainer >
                ) : (
                        <Nav.Link disabled style={{ fontSize: 'larger' }}>Login</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping' style={{ fontSize: 'larger' }}>
                        <Nav.Link>Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled style={{ fontSize: 'larger' }}>Shipping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment' style={{ fontSize: 'larger' }}>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled style={{ fontSize: 'larger' }}>Payment</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder' style={{ fontSize: 'larger' }}>
                        <Nav.Link>Place an order</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled style={{ fontSize: 'larger' }}>Place an order</Nav.Link>
                )}
            </Nav.Item>

        </Nav>
    )
}

export default CheckoutSteps

