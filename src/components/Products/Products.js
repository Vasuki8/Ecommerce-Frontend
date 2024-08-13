import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../Cart/CartContext';
import './Products.css';

function Products() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get('http://localhost:8080/api/list')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    const handleAddToCart = (product) => {
        const cartItem = { productId: product.id, quantity: 1 };

        axios.post('http://localhost:8081/api/cart', cartItem)
            .then(response => {
                console.log('Cart item saved:', response.data);
                addToCart(product, 1);
            })
            .catch(error => {
                console.error('There was an error adding the product to the cart!', error);
            });
    };

    return (
        <div className="products-container">
            <h1 className="products-title">Products</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img
                            src={`/images/${product.imageId}`}
                            alt={product.name}
                            className="product-image"
                        />
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-price">Price: ${product.price}</p>
                        <p className="product-description">Description: {product.description}</p>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="add-to-cart-button"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
