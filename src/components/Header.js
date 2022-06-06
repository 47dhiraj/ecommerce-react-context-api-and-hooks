import { useState, useEffect, useContext } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'


import { LinkContainer } from 'react-router-bootstrap'


import { UserAuthContext, UserDetailsContext } from '../contexts/userContext';
import { CarttContext } from '../contexts/cartContext';


function Header() {

    const navigate = useNavigate();

    const { state, dispatch, register_state, register_dispatch } = useContext(UserAuthContext);
    const { userInfo } = state

    const { dispatch: details_dispatch } = useContext(UserDetailsContext)

    const { state: cart_state } = useContext(CarttContext);
    const { cartItems } = cart_state


    // component wala file ma generally useEffect() hook function use garidaina


    const logoutHandler = () => {

        localStorage.removeItem('userInfo')                         // removing userInfo from localstorage

        // dispatching the logout action for both loginreducer and registerreducer because they both contains same userInfo state, so removing this same state from both reducer
        dispatch({ type: 'USER_LOGOUT' })                           // user logout garne action
        register_dispatch({ type: 'USER_LOGOUT' })                  // if register pachi login vako, and then logout gareko wala case

        details_dispatch({ type: 'USER_DETAILS_RESET' })

        navigate('/')
    }




    return (

        <header>                            {/* <header> chai html tag ho... js component haina don't get confuse*/}

            <Navbar fixed="top"  bg="" variant="dark" expand="lg" collapseOnSelect style={{ background: `linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.15))`, }}>

                <Container>

                    <LinkContainer to={`/`} style={{ fontSize: '1.5rem', fontWeight: 'bold' }} >
                        <Navbar.Brand>Ecommerce App</Navbar.Brand>
                    </LinkContainer>

                    {/* <Link className="navbar-brand" to="/">Ecommerce App</Link> */}


                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="ms-auto">


                            <LinkContainer to={`/cart`} style={{ marginRight: '25px' }}>
                                <Nav.Link >
                                    {/* <i className="fas fa-shopping-cart"></i> */}

                                    <span className="cart-basket d-flex" style={{ marginLeft: '13px', marginTop: '-0.7%' }}>
                                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                    </span>

                                    <i className="fas fa fa-shopping-cart fa-lg d-flex"></i>

                                </Nav.Link>
                            </LinkContainer>

                            {/* <Link className="nav-link" to="/cart"><i className="fas fa-shopping-cart"></i>Cart</Link> */}



                            {userInfo?.tokens ? (
                                <NavDropdown title={`Hi , ` + userInfo.name} style={{ fontSize: '18px' }} id='username'>
                                    <LinkContainer to={`/profile`}>
                                        <NavDropdown.Item><i className="fas fa-sign-in-alt fa-user" > Profile </i></NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}><i className="fas fa-sign-in-alt" > Logout </i></NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                <LinkContainer to={`/login`}>
                                    <Nav.Link ><i className="fas fa-sign-in-alt fa-lg" > Login</i></Nav.Link>
                                </LinkContainer>
                            )}





                            {/* <Link className="nav-link" to="/login"><i className="fas fa-shopping-cart"></i>Login</Link> */}




                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}

                        </Nav>

                    </Navbar.Collapse>

                </Container>

            </Navbar>

        </header>
    )
}

export default Header
