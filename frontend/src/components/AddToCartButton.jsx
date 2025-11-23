import { useCart } from "../context/CartContext";
import axios from "axios";

const AddToCartButton = ({ productId, quantity = 1, className = "" }) => {
    const { addToCart } = useCart();
    
    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
            const fullProduct = res.data;
            
            addToCart(fullProduct, quantity);

            await axios.post("http://localhost:5000/api/cart/add", {
                productId,
                quantity
            });

        } catch (error) {
            console.error("Ошибка:", error);
        }
    };
    
    return (
        <button className={className} onClick={handleAdd}>
            Add to cart
        </button>
    );
};

export default AddToCartButton;
