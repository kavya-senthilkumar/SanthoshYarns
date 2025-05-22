import React, { useEffect, useState } from 'react';
import './Orders.css';
import { FaSearch, FaFilter, FaDownload, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedDate, setSelectedDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            const ordersData = response.data.success ? response.data.data : [];
            console.log('Fetched orders:', ordersData);
            setOrders(ordersData);
            setFilteredOrders(ordersData);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load orders');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`, {
                status: newStatus
            });
            
            if (response.data.success) {
                toast.success(`Order status updated to ${newStatus}`);
                fetchOrders();
            } else {
                toast.error('Failed to update order status');
            }
        } catch (err) {
            console.error('Error updating order status:', err);
            toast.error('Failed to update order status');
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`, {
                status: 'cancelled'
            });
            
            if (response.data.success) {
                toast.success('Order cancelled successfully');
                fetchOrders();
            } else {
                toast.error('Failed to cancel order');
            }
        } catch (err) {
            console.error('Error cancelling order:', err);
            toast.error('Failed to cancel order');
        }
    };

    useEffect(() => {
        if (!Array.isArray(orders)) return;
        
        let result = [...orders];

        // Apply search
        if (searchTerm) {
            result = result.filter(order => 
                order.items && order.items.some(item => 
                    item.category.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        // Apply status filter
        if (filterStatus !== 'all') {
            result = result.filter(order => order.status === filterStatus);
        }

        // Apply date filter
        if (selectedDate) {
            const filterDate = new Date(selectedDate);
            result = result.filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate.toDateString() === filterDate.toDateString();
            });
        }

        setFilteredOrders(result);
    }, [searchTerm, filterStatus, selectedDate, orders]);

    const totalAmount = Array.isArray(filteredOrders) 
        ? filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
        : 0;

    const handleExport = () => {
        if (!Array.isArray(filteredOrders)) return;

        const csvContent = "data:text/csv;charset=utf-8," + 
            "Order ID,Customer,Category,Size,Price,Date\n" +
            filteredOrders.map(order => 
                order.items.map(item => 
                    `${order.orderId || ''},${order.customer?.name || ''},${item.category || ''},${item.size || ''},${item.price || ''},${new Date(order.createdAt).toLocaleDateString()}`
                ).join("\n")
            ).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "orders.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="orders-container loading-container">
                <div className="loading-spinner"></div>
                <p>Loading orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="orders-container error-container">
                <div className="error-message">
                    <h3>Error</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-container">
            <div className="orders-header">
                <h2>Order Management</h2>
                <div className="orders-summary">
                    <div className="summary-card">
                        <span className="summary-value">{filteredOrders.length}</span>
                        <span className="summary-label">Total Orders</span>
                    </div>
                    <div className="summary-card">
                        <span className="summary-value">₹{totalAmount.toLocaleString()}</span>
                        <span className="summary-label">Total Revenue</span>
                    </div>
                </div>
            </div>

            <div className="orders-filters">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="date-filter">
                    <FaCalendarAlt className="calendar-icon" />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>
                <button className="export-button" onClick={handleExport}>
                    <FaDownload /> Export
                </button>
            </div>

            <div className="orders-table-container">
                {!Array.isArray(filteredOrders) || filteredOrders.length === 0 ? (
                    <div className="no-orders">
                        <p>No orders found</p>
                    </div>
                ) : (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, orderIndex) => (
                                <tr key={order._id || orderIndex}>
                                    <td>#{order.orderId || `ORD${orderIndex + 1000}`}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>{order.customer?.name || 'N/A'}</td>
                                    <td>
                                        <div className="order-items">
                                            {order.items?.map((item, itemIndex) => (
                                                <div key={itemIndex} className="order-item">
                                                    <span className="item-category">{item.category}</span>
                                                    <span className="item-size">{item.size}</span>
                                                </div>
                                            )) || 'No items'}
                                        </div>
                                    </td>
                                    <td className="order-total">
                                        ₹{(order.totalAmount || 0).toLocaleString()}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${order.status || 'pending'}`}>
                                            {order.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {order.status !== 'delivered' && order.status !== 'cancelled' && (
                                                <>
                                                    <button 
                                                        className="btn-deliver"
                                                        onClick={() => handleStatusUpdate(order._id, 'delivered')}
                                                    >
                                                        Mark Delivered
                                                    </button>
                                                    <button 
                                                        className="btn-cancel"
                                                        onClick={() => handleCancelOrder(order._id)}
                                                    >
                                                        Cancel Order
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Orders;
