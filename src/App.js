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
import Profile from './pages/Profile';
import Testpage from './pages/Testpage';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import DoctorRegistration from './pages/DoctorRegistration';
import Doctors from './pages/Doctors';
import Appointment from './pages/Appointment';
import MyAppointments from './pages/MyAppointments';
import PayMenually from './pages/PayMenually';

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
        <Route path='/myappointments' element={<MyAppointments />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/test' element={<Testpage />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/return-policy' element={<ReturnPolicy />} />
        <Route path='/doctor-registration' element={<DoctorRegistration />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/self_payment/:paymentID' element={<PayMenually />} />
        <Route path='/appointment/:drId' element={<Appointment />} />
        <Route path='/order-detail/:orderId' element={<OrderDetail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
