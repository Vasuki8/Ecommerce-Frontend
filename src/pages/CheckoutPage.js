import React from 'react';
import CheckoutForm from '../components/Checkout/CheckoutForm';
import axios from 'axios';

function CheckoutPage() {
    const handleSubmit = async (formData) => {
        try {
            await axios.post('http://localhost:8083/api/add', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Form submitted with data:', formData);
        } catch (error) {
            console.error('Error submitting form:', error);
            throw new Error('There was an error processing your payment. Please try again.');
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <CheckoutForm onSubmit={handleSubmit} />
        </div>
    );
}

export default CheckoutPage;
