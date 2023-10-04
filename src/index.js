import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom"

// Context API
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from './context/ProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider >
            <App />
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);
