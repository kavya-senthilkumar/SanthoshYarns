const Order = require('../models/Order');

// Create new order
exports.createOrder = async (req, res) => {
    try {
        const { customer, items, totalAmount, shippingAddress } = req.body;
        
        console.log('Received order data:', {
            customer,
            itemsCount: items?.length,
            totalAmount,
            shippingAddress
        });

        // Validate required fields
        if (!customer?.name || !customer?.email || !items?.length || !totalAmount) {
            console.log('Validation failed:', {
                hasCustomerName: !!customer?.name,
                hasCustomerEmail: !!customer?.email,
                hasItems: !!items?.length,
                hasTotalAmount: !!totalAmount
            });
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                details: {
                    customerName: !customer?.name ? 'Required' : null,
                    customerEmail: !customer?.email ? 'Required' : null,
                    items: !items?.length ? 'At least one item required' : null,
                    totalAmount: !totalAmount ? 'Required' : null
                }
            });
        }

        // Validate items data
        const validItems = items.every(item => 
            item.productId && 
            item.category && 
            item.size && 
            item.price && 
            item.quantity > 0
        );

        if (!validItems) {
            return res.status(400).json({
                success: false,
                message: 'Invalid items data',
                details: 'Each item must have productId, category, size, price, and quantity'
            });
        }

        // Create new order
        const order = new Order({
            customer,
            items,
            totalAmount,
            shippingAddress
        });

        console.log('Created order instance:', {
            orderId: order.orderId,
            customer: order.customer,
            itemsCount: order.items.length,
            totalAmount: order.totalAmount
        });

        await order.save();
        console.log('Order saved successfully:', order._id);

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        });
    } catch (error) {
        console.error('Error creating order:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        
        // Send appropriate error response
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;

        // Validate status
        const validStatuses = ['pending', 'processing', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value',
                details: `Status must be one of: ${validStatuses.join(', ')}`
            });
        }

        console.log(`Updating order ${orderId} status to: ${status}`);

        const order = await Order.findById(orderId);
        
        if (!order) {
            console.log(`Order not found: ${orderId}`);
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Store previous status for logging
        const previousStatus = order.status;
        
        // Update the status
        order.status = status;
        await order.save();

        console.log(`Order ${orderId} status updated: ${previousStatus} -> ${status}`);

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            data: {
                orderId: order.orderId,
                previousStatus,
                currentStatus: status,
                updatedAt: order.updatedAt
            }
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating order status',
            error: error.message
        });
    }
}; 