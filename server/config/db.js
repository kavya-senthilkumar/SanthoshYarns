const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('MongoDB URI:', process.env.MONGO_URI);
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log("MongoDB Connected Successfully!");
        console.log("Database Name:", conn.connection.name);
        console.log("Host:", conn.connection.host);
        console.log("Port:", conn.connection.port);
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        console.error("Error Details:", {
            name: err.name,
            message: err.message,
            code: err.code
        });
        process.exit(1);
    }
};

module.exports = connectDB;
