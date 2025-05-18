// src/pages/AdminProductManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ProductForm from './ProductForm';
import './AdminProductManager.css';

const API_URL = 'http://localhost:5000/api/items';

const AdminProductManager = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setProducts(response.data || []);
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                setLoading(true);
                await axios.delete(`${API_URL}/${productId}`);
                await fetchProducts();
                setError(null);
            } catch (error) {
                console.error('Error deleting product:', error);
                setError('Failed to delete product. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            setLoading(true);
            if (editProduct) {
                await axios.put(`${API_URL}/${editProduct._id}`, formData);
            } else {
                await axios.post(API_URL, formData);
            }
            setShowForm(false);
            setEditProduct(null);
            await fetchProducts();
            setError(null);
        } catch (error) {
            console.error('Error saving product:', error);
            if (error.response) {
                // Server responded with an error
                setError(error.response.data.message || 'Failed to save product. Please try again.');
            } else if (error.request) {
                // Request was made but no response
                setError('No response from server. Please check your connection.');
            } else {
                // Something else went wrong
                setError('Failed to save product. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="product-manager-container">
                <div className="loading-spinner"></div>
                <p>Loading products...</p>
            </div>
        );
    }

    return (
        <div className="product-manager-container">
            <div className="product-manager-header">
                <h2>Product Management</h2>
                <p>Manage your store's product inventory</p>
                {error && <div className="error-message">{error}</div>}
                <button className="add-product-button" onClick={() => setShowForm(true)}>
                    <FaPlus /> Add New Product
                </button>
            </div>

            {showForm && (
                <ProductForm
                    product={editProduct}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditProduct(null);
                        setError(null);
                    }}
                />
            )}

            <div className="products-grid">
                {products.map((product) => (
                                        <div key={product._id} className="product-card">                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p data-label="Category">{product.category}</p>
                            <p data-label="Color">{product.color}</p>
                            <p className="product-price">₹{product.price}</p>
                            <div className="product-actions">
                                <button
                                    className="action-button edit-button"
                                    onClick={() => handleEdit(product)}
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    className="action-button delete-button"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProductManager;
