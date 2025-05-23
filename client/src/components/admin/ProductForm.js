import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './ProductForm.css';

const ProductForm = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        color: '',
        size: []
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                category: product.category || '',
                price: product.price || '',
                color: product.color || '',
                size: Array.isArray(product.size) ? product.size : (product.size || '').split(',').map(s => s.trim())
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'size') {
            // Convert comma-separated string to array
            const sizeArray = value.split(',').map(size => size.trim()).filter(size => size !== '');
            setFormData(prev => ({
                ...prev,
                size: sizeArray
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.size.length === 0) {
            alert('Please enter at least one size');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="product-form-overlay">
            <div className="product-form">
                <button className="close-button" onClick={onCancel}>
                    <FaTimes />
                </button>
                <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="cotton">Cotton</option>
                            <option value="polyester">Polyester</option>
                            <option value="nylon">Nylon</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price (₹)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="color">Color</label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="size">Sizes (comma-separated)</label>
                        <input
                            type="text"
                            id="size"
                            name="size"
                            value={formData.size.join(', ')}
                            onChange={handleChange}
                            placeholder="e.g. 36, 38, 40, 42"
                            required
                        />
                        <small className="input-help">Enter sizes separated by commas</small>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-button">
                            {product ? 'Update Product' : 'Add Product'}
                        </button>
                        <button type="button" className="cancel-button" onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
