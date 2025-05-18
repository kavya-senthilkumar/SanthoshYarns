const mongoose = require('mongoose');

// Define the schema for an item
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['cotton', 'polyester', 'nylon'] // restrict to allowed categories
    },
    size: {
        type: [String],
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
}, { 
    timestamps: true,
    versionKey: false // disable the __v field
});

// Create the model for the item schema
const Item = mongoose.model('Item', itemSchema);

// Export the model to use in controllers
module.exports = Item;
