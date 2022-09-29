import logo from './logo.svg';
import './App.css';
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';

function App() {
  return (
    
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
