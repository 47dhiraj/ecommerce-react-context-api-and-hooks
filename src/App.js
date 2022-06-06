import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'

import { ProductListContextProvider, ProductDetailsContextProvider } from './contexts/productContext'
import { CarttContextProvider } from './contexts/cartContext'
import { OrderCreateContextProvider, OrderDetailsContextProvider, ListMyOrdersContextProvider } from './contexts/orderContext'
import { UserAuthContextProvider, UserDetailsContextProvider, UserUpdateProfileProvider } from './contexts/userContext'


function App() {

  return (
    <div>
      <Router>

        <ProductListContextProvider>
          <ProductDetailsContextProvider>
            <CarttContextProvider>
              <UserAuthContextProvider>
                <UserDetailsContextProvider>
                  <UserUpdateProfileProvider>
                    <OrderCreateContextProvider>
                      <OrderDetailsContextProvider>
                        <ListMyOrdersContextProvider>


                          <Header />


                          <Routes>

                            <Route path='/' element={<HomePage />} exact />

                            <Route path='/login' element={<LoginPage />} />

                            <Route path='/register' element={<RegisterPage />} />

                            <Route path='/profile' element={<ProfilePage />} />

                            <Route path='/product/:id' element={<ProductPage />} />

                            <Route path="/cart">
                              <Route index element={<CartPage />} />
                              <Route path=":id" element={<CartPage />} />
                            </Route>

                            <Route path='/shipping' element={<ShippingPage />} />

                            <Route path='/payment' element={<PaymentPage />} />

                            <Route path='/placeorder' element={<PlaceOrderPage />} />

                            <Route path='/order/:id' element={<OrderPage />} />


                          </Routes>


                        </ListMyOrdersContextProvider>
                      </OrderDetailsContextProvider>
                    </OrderCreateContextProvider>
                  </UserUpdateProfileProvider>
                </UserDetailsContextProvider>
              </UserAuthContextProvider>
            </CarttContextProvider>
          </ProductDetailsContextProvider>
        </ProductListContextProvider>


        <Footer />

      </Router>
    </div>


  );
}

export default App;
