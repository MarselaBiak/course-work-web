import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Stripe from "stripe";
import Order from "../models/Order.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
    try {
        const { items, sellerNotes, giftMessage, userId } = req.body;

        const line_items = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title,
                    images: [`http://localhost:5000${item.img}`],
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: "http://localhost:5173/paymentok?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:5173/cart",
        });

        const order = await Order.create({
            userId,
            items,
            total: items.reduce((num, it) => num + it.price * it.quantity, 0),
            sellerNotes,
            giftMessage,
            stripeSessionId: session.id,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Stripe Error:", err);
        res.status(500).json({ message: "Payment session failed" });
    }
});

router.post("/confirm", async (req, res) => {
    const { session_id } = req.body;

    const order = await Order.findOne({ stripeSessionId: session_id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "paid";
    await order.save();

    res.json({ message: "Order updated" });
});

export default router;
