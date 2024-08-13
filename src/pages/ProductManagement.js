import React from 'react';
import AddProductForm from '../components/Products/AddProductForm'; // Adjust path as needed

function ProductManagement() {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-semibold mb-4">Product Management</h1>
            <AddProductForm />
        </div>
    );
}

export default ProductManagement;
