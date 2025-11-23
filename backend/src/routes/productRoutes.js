import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/*
====================================
 GET /api/products
 Получить все товары
====================================
*/
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error("Error loading products:", err);
        res.status(500).json({ message: "Failed to load products" });
    }
});


/*
====================================
 GET /api/products/search?q=rose
 Поиск товаров
====================================
*/
router.get("/search", async (req, res) => {
    try {
        const query = req.query.q?.trim() || "";

        if (!query) {
            return res.json([]); // пустая строка → ничего не ищем
        }

        const regex = new RegExp(query, "i");

        const products = await Product.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } }
            ]
        });

        res.json(products);
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ message: "Search failed" });
    }
});


/*
====================================
 GET /api/products/:id
 Получить один товар по id
====================================
*/
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.error("Single product load error:", err);
        res.status(500).json({ message: "Error loading product" });
    }
});

export default router;

