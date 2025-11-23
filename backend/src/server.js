import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cartRoutes from "./routes/cart.js";
import paymentRoutes from "./routes/paymentRoutes.js"
import orderRoutes from "./routes/orders.js";
import adminRoutes from "./routes/adminRoutes.js";


// =========================
// Load .env
// =========================
dotenv.config();

// DEBUG — показать, что .env загружен
console.log("****************************************");
console.log("ENV FILE PATH:", path.resolve(process.cwd(), ".env"));
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded OK" : "NOT FOUND");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded OK" : "NOT FOUND");
console.log("****************************************");
console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY);

// =========================
// Init Express
// =========================
const app = express();
app.use(cors());
app.use(express.json()); // для JSON тела запросов
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// =========================
// Routes
// =========================
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";    // <-- добавили
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
// теперь доступно:
// POST /api/auth/signup
// POST /api/auth/signin

app.use("/products", express.static("public/products"));
app.use("/uploads", express.static("public"));
// Продукты (поиск, получение всех, получение одного)   // <-- добавили
app.use("/api/products", productRoutes);    // <-- добавили 

// Дополнительный тестовый маршрут
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// =========================
// Error Handler Middleware
// =========================
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
});


// =========================
// MongoDB
// =========================
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected "))
    .catch((err) => {
        console.log("MongoDB connection error");
        console.error(err);
    });

// =========================
// Start server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
