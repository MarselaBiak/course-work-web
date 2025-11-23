import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cartRoutes from "./routes/cart.js";
import paymentRoutes from "./routes/paymentRoutes.js"
import orderRoutes from "./routes/orders.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

console.log("****************************************");
console.log("ENV FILE PATH:", path.resolve(process.cwd(), ".env"));
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded OK" : "NOT FOUND");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded OK" : "NOT FOUND");
console.log("****************************************");
console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json()); 
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";    
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use("/products", express.static("public/products"));
app.use("/uploads", express.static("public"));   
app.use("/api/products", productRoutes);   

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected "))
    .catch((err) => {
        console.log("MongoDB connection error");
        console.error(err);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`! Server running on port ${PORT}`);
});
