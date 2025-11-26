import User from "../models/User.js";
import Order from "../models/Order.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getOrdersByUsers = async (req, res) => {
    try {
        const users = await User.find();

        const result = [];

        for (const user of users) {
            const orders = await Order.find({ userId: user._id });

            result.push({
                user,
                orders
            });
        }

        res.json(result);

    } catch (err) {
        console.error("Error loading orders by users:", err);
        res.status(500).json({ message: "Failed to load orders" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("items.product");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteOrderItem = async (req, res) => {
    const { orderId, itemId } = req.params;

    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        const before = order.items.length;

        order.items = order.items.filter(item => item.id !== Number(itemId));

        order.total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        if (order.items.length === before)
            return res.status(404).json({ message: "Item not found" });

        await order.save();
        res.json(order);

    } catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
};

export const updateOrderItemQty = async (req, res) => {
    try {
        const { orderId, itemId } = req.params;
        const { quantity } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const item = order.items.find(i => i.id === Number(itemId));

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        item.quantity = quantity;

        order.total = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

        await order.save();

        res.json({ message: "Quantity updated", order });
    } catch (err) {
        console.error("updateOrderItemQty error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
