import Counter from "./Counter";
import { useCart } from "../context/CartContext";
import "./CartItem.css";
import { RiDeleteBin6Line } from "react-icons/ri";


const CartItem = ({ item }) => {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div className="cart-item">
            <div className="cart-cont-item">
                <img src={item.img} alt={item.title} className="cart-item-img" />

                <div className="cart-item-info">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <p className="cart-item-price">${item.price}</p>
                    <p className="cart-item-size">Size: medium</p>
                </div>

                <div className="cart-item-actions">
                    <Counter 
                        value={item.quantity}
                        onChange={(qty) => updateQuantity(item.id, qty)}
                    />

                    <button className="cart-delete-btn" onClick={() => removeItem(item.id)}>
                        <RiDeleteBin6Line size={18} />
                    </button>
                </div>

                <div className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default CartItem;
