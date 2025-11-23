import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import Counter from "./Counter";
import "../pages/ProductPage.css";

const AddToCartWithCounter = ({ productId }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAdd = async () => {
        try {
            // 1. загружаем товар с бэкенда
            const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
            const product = res.data;

            // 2. добавляем с нужным количеством
            addToCart(product, quantity);

            // 3. отправляем на сервер (если нужно)
            await axios.post("http://localhost:5000/api/cart/add", {
                productId,
                quantity
            });

        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div className="quantity-block">
                <p className="quantity-block-text">Quantity</p>
                    <Counter value={quantity} onChange={setQuantity} />
            </div>

            <button className="btn-dark-big" onClick={handleAdd}>
                Add to cart
            </button>
        </div>
    );
};

export default AddToCartWithCounter;
