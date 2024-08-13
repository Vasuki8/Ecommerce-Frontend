import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex justify-center space-x-8">  {/* Updated this line */}
                <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
                <li><Link to="/products" className="text-white hover:text-gray-300">Products</Link></li>
                <li><Link to="/cart" className="text-white hover:text-gray-300">Cart</Link></li>
                <li><Link to="/add-product" className="text-white hover:text-gray-300">Add Product</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
