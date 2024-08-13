import React, { useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../Cart/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
    const { cart, removeFromCart, setCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Cart state:', cart);
    }, [cart]);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleRemove = (productId) => {
        removeFromCart(productId);
        axios.delete(`http://localhost:8081/api/cart/${productId}`)
            .then(() => {
                console.log('Cart item removed');
            })
            .catch(error => console.error("Error removing cart item:", error));
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            handleRemove(productId);
            return;
        }

        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            );
            return updatedCart;
        });

        axios.put(`http://localhost:8081/api/cart/${productId}`, { quantity: newQuantity })
            .then(response => {
                console.log('Cart item quantity updated:', response.data);
            })
            .catch(error => console.error("Error updating cart item quantity:", error));
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul className="cart-items">
                        {cart.map(({ product, quantity }) => (
                            <li key={product.id} className="cart-item">
                                <img
                                    src={`/images/${product.imageId}`}
                                    alt={product.name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h2 className="cart-item-name">{product.name}</h2>
                                    <div className="cart-item-quantity">
                                        <button
                                            onClick={() => handleQuantityChange(product.id, quantity - 1)}
                                            className="quantity-button"
                                        >
                                            -
                                        </button>
                                        <span>{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(product.id, quantity + 1)}
                                            className="quantity-button"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cart-item-price">Price: ${product.price}</p>
                                </div>
                                <button
                                    onClick={() => handleRemove(product.id)}
                                    className="remove-from-cart-button"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleCheckout}
                        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    >
                        Proceed to Checkout
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;
