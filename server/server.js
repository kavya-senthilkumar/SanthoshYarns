// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const PORT = process.env.PORT || 5000;

// // Configure CORS
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));

// // Connect to MongoDB database
// connectDB();

// // Routes
// app.use("/api/items", require("./routes/items")); // Ensure items.js handles routes properly
// app.use("/api/orders", require("./routes/orderRoutes")); // Add order routes


// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// Allowed origins (local dev + deployed frontend)
const allowedOrigins = [
  'http://localhost:3000',
  'https://santhosh-yarns.vercel.app'
];

// Configure CORS with dynamic origin checking
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Connect to MongoDB database
connectDB();

// Routes
app.use("/api/items", require("./routes/items"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
