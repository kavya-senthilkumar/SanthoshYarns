// src/pages/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaRupeeSign } from 'react-icons/fa';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState({
        totalProducts: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        totalOrders: 0,
        recentOrders: [],
        recentProducts: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // Fetch products
                const productsResponse = await axios.get('http://localhost:5000/api/items');
                const products = productsResponse.data || [];

                // Fetch orders
                const ordersResponse = await axios.get('http://localhost:5000/api/orders');
                const orders = ordersResponse.data.success ? ordersResponse.data.data : [];

                // Calculate analytics
                const pendingOrders = orders.filter(order => order.status === 'pending').length;
                const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

                // Get recent orders and products
                const recentOrders = orders
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5);

                const recentProducts = products
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5);

                setAnalytics({
                    totalProducts: products.length,
                    totalRevenue,
                    pendingOrders,
                    totalOrders: orders.length,
                    recentOrders,
                    recentProducts,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching analytics:', error);
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="admin-dashboard loading-container">
                <div className="loading-spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
            </div>

            <div className="quick-stats">
                <div className="stat-card">
                    <FaBox className="stat-icon" />
                    <span className="stat-value">{analytics.totalProducts}</span>
                    <span className="stat-label">Total Products</span>
                </div>
                <div className="stat-card">
                    <FaRupeeSign className="stat-icon" />
                    <span className="stat-value">₹{analytics.totalRevenue.toLocaleString()}</span>
                    <span className="stat-label">Total Revenue</span>
                </div>
                <div className="stat-card">
                    <FaShoppingCart className="stat-icon" />
                    <span className="stat-value">{analytics.pendingOrders}</span>
                    <span className="stat-label">Pending Orders</span>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card" onClick={() => navigate('/admin/products')}>
                    <div className="card-icon">
                        <FaBox />
                    </div>
                    <div className="card-content">
                        <h3>Manage Products</h3>
                        <p>Add, edit, or remove products from your inventory</p>
                        <span className="card-stats">{analytics.totalProducts} products</span>
                    </div>
                </div>

                <div className="dashboard-card" onClick={() => navigate('/admin/orders')}>
                    <div className="card-icon">
                        <FaShoppingCart />
                    </div>
                    <div className="card-content">
                        <h3>Order Management</h3>
                        <p>View and manage customer orders</p>
                        <span className="card-stats">{analytics.pendingOrders} pending orders</span>
                    </div>
                </div>
            </div>

            <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                    {analytics.recentOrders.map((order, index) => (
                        <div key={order._id || index} className="activity-item">
                            <div className="activity-icon order">
                                <FaShoppingCart />
                            </div>
                            <div className="activity-details">
                                <h4>New Order #{order.orderId}</h4>
                                <p>₹{order.totalAmount.toLocaleString()} - {order.items.length} items</p>
                                <span className="activity-time">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
