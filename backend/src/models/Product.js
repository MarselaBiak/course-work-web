import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id: Number,
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    img: { type: String, required: true },
});

export default mongoose.model("Product", ProductSchema);
