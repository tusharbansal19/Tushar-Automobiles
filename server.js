const express = require("express");
const next = require("next");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import your existing API routes
const authRoutes = require("./server/routes/auth");
const contactRoutes = require("./server/routes/contact");
const productsRoutes = require("./server/routes/products");
const autoPartsRoutes = require("./server/routes/autoParts");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/automobile-parts");
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        console.log("🔧 The application will continue running without database functionality");
        console.log("📋 To fix this issue:");
        console.log("   1. Go to MongoDB Atlas → Network Access");
        console.log("   2. Add your current IP address to the IP Access List");
        console.log("   3. Or add 0.0.0.0/0 to allow all IPs (for development only)");
        console.log("   4. Wait 2-3 minutes for changes to take effect");
        console.log("   5. Restart the server");
        // Don't exit the process, let the app run without database
    }
};

app.prepare().then(() => {
    const server = express();

    // Connect to database
    connectDB();

    // Middleware
    server.use(cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true
    }));

    server.use(express.json({ limit: '10mb' }));
    server.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // API Routes
    server.use("/api/auth", authRoutes);
    server.use("/api/contact", contactRoutes);
    server.use("/api/products", productsRoutes);
    server.use("/api/auto-parts", autoPartsRoutes);

    // Test API route
    server.get("/api/test", (req, res) => {
        res.json({
            success: true,
            message: "Automobile Parts API is working!",
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || "development"
        });
    });

    // Health check endpoint
    server.get("/api/health", (req, res) => {
        res.json({
            status: "healthy",
            database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        });
    });

    // Auto parts seeding endpoint (for production setup)
    server.post("/api/seed", async (req, res) => {
        try {
            // Import and run the seeder
            const { seedAutoParts } = require("./server/services/autoPartsSeeder");
            await seedAutoParts();
            res.json({ success: true, message: "Auto parts data seeded successfully" });
        } catch (error) {
            console.error("Seeding error:", error);
            res.status(500).json({ success: false, message: "Failed to seed data", error: error.message });
        }
    });

    // Serve static files from public directory
    server.use("/images", express.static("public/images"));
    server.use("/icons", express.static("public/icons"));

    // Let Next.js handle all other routes
    server.all("*", (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 3000;

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`🚀 Server ready on http://localhost:${port}`);
        console.log(`📱 Frontend: http://localhost:${port}`);
        console.log(`🔌 API: http://localhost:${port}/api`);
        console.log(`🏥 Health Check: http://localhost:${port}/api/health`);
        console.log(`🌱 Environment: ${process.env.NODE_ENV || "development"}`);
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});