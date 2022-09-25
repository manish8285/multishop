import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';

function App() {
  return (
    
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
