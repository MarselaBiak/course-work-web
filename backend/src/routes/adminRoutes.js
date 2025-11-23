import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";

import {
    getAllUsers,
    deleteUser,
    getOrdersByUsers,
    getAllOrders,
    deleteOrder,
    deleteOrderItem,
    updateOrderItemQty
} from "../controllers/adminController.js";

import User from "../models/User.js";
import Order from "../models/Order.js";

const router = express.Router();

// ===== USERS =====
router.get("/users", authMiddleware, adminOnly, getAllUsers);
router.delete("/users/:id", authMiddleware, adminOnly, deleteUser);

// ===== ALL ORDERS =====
router.get("/orders", authMiddleware, adminOnly, getAllOrders);
router.delete("/orders/:id", authMiddleware, adminOnly, deleteOrder);

// ===== ORDERS GROUPED BY USERS =====
router.get("/orders-by-users", authMiddleware, adminOnly, getOrdersByUsers);

// ===== DELETE ITEM IN ORDER =====
router.delete(
    "/orders/:orderId/items/:itemId",
    authMiddleware,
    adminOnly,
    deleteOrderItem
);

// ===== UPDATE ITEM QUANTITY =====
router.put(
    "/orders/:orderId/items/:itemId",
    authMiddleware,
    adminOnly,
    updateOrderItemQty
);

// ===== FULL USER → ORDERS STRUCTURE =====
router.get("/user-orders", adminOnly, async (req, res) => {
    try {
        const users = await User.find({}, "_id nickname email");

        const orders = await Order.find();

        const result = users.map(u => ({
        user: u,
        orders: orders.filter(o => o.userId.toString() === u._id.toString())
        }));

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


export default router;
