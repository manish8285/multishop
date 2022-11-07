import logo from './logo.svg';
import './App.css';
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderDetail from './pages/OrderDetail';
import Landing from './pages/Landing';

//Owl Carousel Libraries and Module
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ForgetPassword from './pages/ForgetPassword';
import Category from './pages/Category';

function App() {
  return (
    
    <HashRouter>
      <ToastContainer position='bottom-center' />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home/:q' element={<Home />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/myorders' element={<MyOrders />} />
        <Route path='/order-detail/:orderId' element={<OrderDetail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
