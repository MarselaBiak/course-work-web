/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Загружаем из localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(saved);
    }, []);

    // Сохраняем изменения
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // ============================
    // ДОБАВЛЕНИЕ ТОВАРА
    // ============================
    const addToCart = (product, quantity) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);

            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, { ...product, quantity }];
        });
    };

    // ============================
    // НОВОЕ — ОБНОВЛЕНИЕ КОЛИЧЕСТВА
    // ============================
    const updateQuantity = (id, quantity) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    // ============================
    // НОВОЕ — УДАЛЕНИЕ ТОВАРА
    // ============================
    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    // ============================
    // СУММА КОРЗИНЫ
    // ============================
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            updateQuantity,   // ⭐ новое
            removeItem,       // ⭐ новое
            totalPrice 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
