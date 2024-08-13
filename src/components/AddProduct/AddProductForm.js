import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddProductForm.css';

const AddProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:8080/api/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                alert('Product added successfully!');
                setName('');
                setDescription('');
                setPrice('');
                setStock('');
                setImage(null);
                navigate('/products');
            }
        } catch (error) {
            console.error('Error adding product', error);
            alert('Error adding product');
        }
    };

    return (
        <div className="add-product-container">
            <h1>Add New Product</h1>
            <form onSubmit={handleSubmit} className="add-product-form">
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Stock:</label>
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductForm;
