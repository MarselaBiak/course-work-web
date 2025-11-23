import { useCart } from "../context/CartContext";
import axios from "axios";

const AddToCartButton = ({ productId, quantity = 1, className = "" }) => {
    const { addToCart } = useCart();
    
    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            // 👉 1. Получаем полный товар с backend
            const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
            const fullProduct = res.data;
            
            // fullProduct.img = `/src/assets/home-page/product${productId}.png`;


            // 👉 2. Добавляем в корзину ПОЛНЫЙ объект
            addToCart(fullProduct, quantity);

            // 👉 3. (опционально) отправляем на backend
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
