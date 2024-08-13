import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProductsPage from './pages/ProductsPage';
import Cart from './components/Cart/Cart';
import AddProductForm from './components/AddProduct/AddProductForm';
import Home from './pages/Home';
import { CartProvider } from './components/Cart/CartContext';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      
  <CartProvider>
          <Navbar />
          <main className="App-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/add-product" element={<AddProductForm />} />
              <Route path="/checkout" element={<CheckoutPage />} /> {/* Add Checkout route */}
              <Route path="/confirmation" element={<ConfirmationPage />} /> Add confirmation route
            </Routes>
          </main>
          <Footer />
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;