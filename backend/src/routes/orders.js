import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);

        const orders = await Order.find({ userId });  
        res.json(orders);

    } catch (error) {
        console.error("Order fetch error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
