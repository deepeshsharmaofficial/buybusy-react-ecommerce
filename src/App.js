// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/admin/AddProduct';
import Cart from './pages/Cart';
import Order from './pages/Order';
import ForgetPassword from './pages/ForgetPassword';
import NoPage from './pages/NoPage';

// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';

// Component
import MyNavbar from './components/MyNavbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {

  return (
    <>
    <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Slide}
        />

      <MyNavbar/>
      <Routes>
        <Route exact path="/" element= {<Home />} />
        <Route path="/forgetpassword" element ={<ForgetPassword />} />
        <Route path="/login" element= {<Login />} />
        <Route path="/register" element= { <Register /> } />

        <Route path="/admin/addProduct" element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        } />

        <Route path="/order" element={
          <PrivateRoute>
            <Order />
          </PrivateRoute>
      
        } />

        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />

        <Route path="/*" element={<NoPage />} />
      </Routes>    
    </>
  );
}

export default App;