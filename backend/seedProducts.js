import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Product from "./src/models/Product.js";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB connected!");
    } catch (err) {
        console.error("DB ERROR:", err);
        process.exit(1);
    }
}

const products = [
    { id: 1, title: "Cristal (pink carnations with mix flowers)", price: 125, img: "/products/product1.png" },
    { id: 2, title: "Milana (bouquet with garden roses)", price: 245, img: "/products/product2.png" },
    { id: 3, title: "Diamond bouquet pink roses", price: 200, img: "/products/product3.png" },
    { id: 4, title: "Bouquet Hyacinth pink", price: 180, img: "/products/product4.png" },
    { id: 5, title: "Bouquet rose bush odilia", price: 245, img: "/products/product5.png" },
    { id: 6, title: "Bouquet of delicate carnation rose", price: 210, img: "/products/product6.png" },
];

async function seed() {
    await connectDB();

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Products added!");
    process.exit();
}

seed();
