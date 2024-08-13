import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ProductForm({ setProducts }) {
    const { id } = useParams(); // Get the product ID from URL parameters
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Fetch existing product data if ID is present
            axios.get(`http://localhost:8080/api/products/${id}`)
                .then(response => {
                    console.log("Fetched product data:", response.data); // Debug log
                    setProduct(response.data); // Populate form with existing data
                })
                .catch(error => {
                    console.error("Error fetching the product!", error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            name: product.name,
            description: product.description,
            price: parseFloat(product.price),
            stock: parseInt(product.stock, 10),
        };

        try {
            let response;
            if (id) {
                // Update existing product
                response = await axios.put(`http://localhost:8080/api/products/${id}`, updatedProduct);
            } else {
                // Add new product
                response = await axios.post('http://localhost:8080/api/products', updatedProduct);
            }
            if (response.status === 200) {
                alert('Product saved successfully!');
                navigate('/products'); // Redirect to the products page
            }
        } catch (error) {
            console.error('Error saving product', error);
            alert('Error saving product');
        }
    };

    return (
        <div>
            <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{id ? 'Update Product' : 'Add Product'}</button>
            </form>
        </div>
    );
}

export default ProductForm;
