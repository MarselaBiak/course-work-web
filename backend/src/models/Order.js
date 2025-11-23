import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            id: Number,
            title: String,
            price: Number,
            quantity: Number,
            img: String,
        }
    ],
    total: Number,
    sellerNotes: String,
    giftMessage: String,
    stripeSessionId: String,
    status: { type: String, default: "pending" }, // pending / paid
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
