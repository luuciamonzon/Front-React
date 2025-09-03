import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './layouts/home/index';

import ProductRoutes from './layouts/products/index';
import { ProductProvider } from './context/ProductContext';

import UserRoutes from './layouts/users/index';
import { UserProvider } from './context/UserContext'

import { AuthProvider } from './context/AuthContext';
import LoginForm from './layouts/auth/LoginForm';
import RegisterForm from './layouts/auth/RegisterForm';

import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';
import PublicRoute from './utils/PublicRoute';
import Navbar from './components/Navbar';
import { ToastProvider } from './components/Toast';

import './App.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <Fragment>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path='/inicio-sesion' 
                  element={
                    <PublicRoute>
                      <LoginForm/>
                    </PublicRoute>
                  }
                />
                <Route 
                  path='/registro' 
                  element={
                    <PublicRoute>
                      <RegisterForm/>
                    </PublicRoute>
                  }
                />
                <Route
                  path="/productos/*"
                  element={
                    <PrivateRoute>
                      <ProductProvider>
                        <ProductRoutes />
                      </ProductProvider>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/usuarios/*"
                  element={
                    <AdminRoute>
                      <UserProvider>
                        <UserRoutes />
                      </UserProvider>
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>
          </Fragment>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
