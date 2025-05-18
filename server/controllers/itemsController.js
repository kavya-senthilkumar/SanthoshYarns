const Item = require("../models/itemsModel");
const mongoose = require("mongoose");

// Get all items
const getItem = async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error: error.message });
    }
};

// Get item by ID
const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid item ID format" });
        }

        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Error fetching item", error: error.message });
    }
};

// Add a new item
const addItem = async (req, res) => {
    try {
        const {
            name,
            price,
            category,
            color
        } = req.body;

        // Validate required fields
        if (!name || !price || !category || !color) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create new item
        const newItem = new Item({
            name,
            price: Number(price),
            category,
            color
        });

        const savedItem = await newItem.save();
        res.status(201).json({ message: "Item added successfully", item: savedItem });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", error: error.message });
        }
        res.status(500).json({ message: "Error adding item", error: error.message });
    }
};

// Update an item
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid item ID format" });
        }

        const {
            name,
            price,
            category,
            color
        } = req.body;

        // Validate required fields
        if (!name || !price || !category || !color) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            id,
            {
                name,
                price: Number(price),
                category,
                color
            },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Item updated successfully", item: updatedItem });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", error: error.message });
        }
        res.status(500).json({ message: "Error updating item", error: error.message });
    }
};

// Delete an item
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid item ID format" });
        }

        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json({ message: "Item deleted successfully", item: deletedItem });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item", error: error.message });
    }
};

module.exports = {
    getItem,
    getItemById,
    addItem,
    updateItem,
    deleteItem
};
