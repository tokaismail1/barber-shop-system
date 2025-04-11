
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const workLogRoutes = require('./routes/workLogRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB connection
const url = "mongodb+srv://toka123:VFfLxVbJJoLkhT3d@cluster0.fqtsyab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToDatabase = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(url);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Database connection error:", error);
        process.exit(1); // Exit with failure
    }
};

connectToDatabase();

// Routes
app.use('/api', workLogRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('🚀 Welcome to the API!');
});

// Start server
const port = 5000;
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});