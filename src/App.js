import './App.css';
import Signup from './components/USER/Registration/Signup';
import { BrowserRouter,  HashRouter,  Route, Routes } from 'react-router-dom';
import Login from './components/USER/Registration/Login';
import Cart from './components/USER/Cart/Cart';
import Checkout from './components/USER/Checkout/Checkout';
import Layout from './components/USER/Layout/Layout';
import Home from './components/USER/Home/Home';
import Products from './components/USER/Products/Products';
import Detailes from './components/USER/Detailes/Detailes';
import AdminLayout from './components/ADMIN/Layout/AdminLayout';
import Order from './components/USER/Orders/Order';
import ProtectAdmin from './components/ADMIN/ProtectAdmin';
import Wishlist from './components/USER/Wishlist/Wishlist';

function App() { 

  return (
    <div className="App ">
      <HashRouter>

      <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/products' element={<Products />}/>
            <Route path="/products/:id" element={<Detailes/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/order' element={<Order/>}/>
            <Route path='/wishlist' element={<Wishlist/>}/>


        </Route>
        <Route path='admin' element={<ProtectAdmin>  <AdminLayout/> </ProtectAdmin>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/login' element={<Login />}/>

      </Routes>
     
      </HashRouter>
     
    </div>
  );
}

export default App;
