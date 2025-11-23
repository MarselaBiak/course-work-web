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
            const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
            const product = res.data;

            addToCart(product, quantity);

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
