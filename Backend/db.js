const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/inotebook");
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
    }
};

module.exports = connectMongo;
