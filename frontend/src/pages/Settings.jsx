import { useState } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import axios from "axios";

import "./Home.css";
import "./Settings.css";
import logoHeader from "../assets/home-page/logo.png";
import searchIcon from "../assets/home-page/search_icon.png";
import balanceIcon from "../assets/home-page/balace_icon.png";
import logo2 from "../assets/home-page/LOGO2.png";
import cardsImg from "../assets/home-page/image12.png";

const Settings= () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [orders, setOrders] = useState([]);


    const raw = localStorage.getItem("user");
        const user = raw ? JSON.parse(raw) : null;
        const userId = user?.id;

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
    };
    const { totalPrice } = useCart();

    useEffect(() => {
    window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!userId) return;   

        axios.get(`http://localhost:5000/api/orders/${userId}`)
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));

    }, [userId]);


    const toggleOrder = (id) => {
        setOrders((prev) =>
            prev.map((order) =>
                order._id === id
                    ? { ...order, open: !order.open }
                    : order
            )
        );
    };


    return (
        <div className={`home-page ${isMenuOpen ? "menu-open" : ""}`}>
            <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
                <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>×</button>

                <nav className="menu-list">
                    <Link to="/search">Search</Link>
                    <Link to="/">Home</Link>
                    <Link to="/about">About us</Link>
                    <Link to="/catalog">Catalog</Link>
                    <Link to="/contacts">Contacts</Link>

                    {!user && (
                        <>
                            <Link to="/signin" className="bold">Sign in</Link>
                            <Link to="/signup" className="bold">Sign up</Link>
                        </>
                    )}

                    {user && (
                        <div className="user-block">
                            <Link to="/settings" >
                                <p className="user-nickname">Hello, {user.nickname}</p>
                            </Link>
                            <button className="logout-btn" onClick={handleLogout}>
                                Log out
                            </button>
                        </div>
                    )}
                </nav>

            </div>

            {isMenuOpen && (
                <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
            )}

            <header className="main-header">
                <div className="header-inner">
                    
                    <button className="header-burger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span className="span-1-header"></span>
                        <span className="span-2-header"></span>
                    </button>

                    <img className="logo-header" src={logoHeader} alt="logo" />

                    <div className="header-right">
                        <Link to="/search">
                            <button className="icon-button">
                                <img src={searchIcon} alt="search" />
                            </button>
                        </Link>

                        <Link to="/cart">
                            <button className="cart-button">
                                <img src={balanceIcon} alt="balance" />
                                <span className="cart-amount">
                                    {totalPrice > 0 ? `$${totalPrice}` : ""}
                                </span>
                            </button>
                        </Link>
                        
                    </div>

                </div>
            </header>

            <main className="orders-page">

                {orders.length === 0 && (
                    <p className="empty-orders">You have no orders yet.</p>
                )}

                {orders.map((order) => (
                    <div key={order._id} className="order-block">

                        <div className="order-header" onClick={() => toggleOrder(order._id)}>
                            
                            <div>
                                <h3>Order #{order._id.slice(-6)}</h3>
                                <p className="order-date">
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div className="order-status">
                                {order.status}
                            </div>

                            <button className="order-toggle-btn">
                                {order.open ? "˄" : "˅"}
                            </button>
                        </div>

                        {order.open && (
                            <div className="order-content">

                                <p><b>Notes:</b> {order.sellerNotes || "—"}</p>
                                <p><b>Gift:</b> {order.giftMessage || "—"}</p>

                                <div className="order-items">

                                    {order.items.map((item) => (
                                        <div key={item._id} className="order-item-card">

                                            <img src={item.img} alt="" className="order-item-img" />

                                            <div className="order-item-info">
                                                <h4>{item.title}</h4>
                                                <p className="order-item-price">${item.price}.00</p>
                                                <p className="order-item-qty">{item.quantity} pcs</p>
                                            </div>

                                            <div className="order-item-total">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-total-line">
                                    <span>Total:</span>
                                    <b>${order.total}.00</b>
                                </div>

                            </div>
                        )}

                    </div>
                ))}

            </main>

        <footer className="footer-bar">
            <img src={logo2} alt="" />
            <p className="footer-bar-text">
                6201 Hollywood blvd
                Los Angeles, California 90028
                <br />
                Monday - Friday 9:00 am - 8:00 pm
                Saturday 10:00 am - 5:00 pm
                Sunday 10:00 am - 5:00 pm
                <br />
                <span>
                    +214 772 56 74
                    cherryblossom@gmail.com
                </span>
            </p>
            <img src={cardsImg} alt="" />
            <p className="footer-bar-text">© 2022, Los Angeles Florist - Cherry Blossom</p>
        </footer>                             

        </div>
    );
};

export default Settings;
