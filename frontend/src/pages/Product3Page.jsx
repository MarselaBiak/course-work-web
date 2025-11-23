/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import product3Img from "../assets/home-page/product3.png";
import logoHeader from "../assets/home-page/logo.png";
import searchIcon from "../assets/home-page/search_icon.png";
import balanceIcon from "../assets/home-page/balace_icon.png";
import logo2 from "../assets/home-page/LOGO2.png";
import cardsImg from "../assets/home-page/image12.png";
import "../components/cards/Product.css";
import AddToCartWithCounter from "../components/AddToCartWithCounter";
import { useCart } from "../context/CartContext";
import "./ProductPage.css";


// ВАЖНО — импортируем картинку товара!

const Product3Page = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));


    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
    };
    const { totalPrice } = useCart();
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useLayoutEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    const newItem = {
        id: 3,
        title: "Diamond bouquet pink roses)",
        price: "$200.00",
        img: product3Img
    };

    const updated = [
        newItem,
        ...viewed.filter(p => p.id !== 3)
    ];

    localStorage.setItem("recentlyViewed", JSON.stringify(updated));

    setRecentlyViewed(updated);
    }, []);

    useEffect(() => {
    window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`home-page ${isMenuOpen ? "menu-open" : ""}`}>
            
            {/* ---------- MOBILE MENU ---------- */}
            <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
                <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>×</button>

                <nav className="menu-list">
                    <Link to="/search">Search</Link>
                    <Link to="/">Home</Link>
                    <Link to="/about">About us</Link>
                    <Link to="/catalog">Catalog</Link>
                    <Link to="/contacts">Contacts</Link>

                    {/* === ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕ ЗАЛОГИНЕН === */}
                    {!user && (
                        <>
                            <Link to="/signin" className="bold">Sign in</Link>
                            <Link to="/signup" className="bold">Sign up</Link>
                        </>
                    )}

                    {/* === ЕСЛИ ПОЛЬЗОВАТЕЛЬ ЗАЛОГИНЕН === */}
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

            {/* HEADER */}
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

            {/* PRODUCT PAGE */}
            <main className="hero-product">
                <div className="product-h1-cont">
                    <h2 className="product-h1">Home / Cristal (pink carnations with mix flowers)</h2>
                </div>  
                
                <div className="product-content">

                    <img src={product3Img} alt="Cristal bouquet" className="product-main-img" />

                    <div className="product-info">
                        <h2 className="product-h2">Diamond bouquet pink roses</h2>
                        <p className="product-price">$200.00</p>
                        <p className="shipping-text">Shipping calculated at checkout</p>

                        <div className="product-buy-block">

                            <AddToCartWithCounter className="btn-dark" productId={3}    />

                        </div>

                        <p className="pickup-text">
                            Pickup available at <span>Hollywood blvd</span> Usually ready tomorrow
                        </p>
                    </div>
                </div>
            </main>

            <section className="recently-viewed-section">
                <h3 className="recent-h-title">Recently viewed products</h3>

                <div className="recently-viewed-list">
                    {recentlyViewed.length === 0 ? (
                        <p className="no-recent">No recently viewed products</p>
                    ) : (
                        recentlyViewed.slice(0, 3).map(item => (
                            <Link key={item.id} to={`/product/${item.id}`} className="recent-card">
                                
                                <img src={item.img} alt={item.title} className="recent-img"/>

                                <div className="top-info">
                                    <div className="card-text-cont">
                                        <p className="recent-title">{item.title}</p>
                                        <p className="recent-price">{item.price}</p>
                                    </div>
                                    <button className="btn-dark">View</button>
                                </div>
                                
                            </Link>
                        ))
                    )}
                </div>
            </section>
                    
            {/* FOOTER */}
            <footer className="footer-bar">
                <img src={logo2} alt="" />
                <p className="footer-bar-text">
                    6201 Hollywood blvd<br />
                    Los Angeles, California 90028<br />
                    Monday - Friday 9:00 am - 8:00 pm<br />
                    Saturday 10:00 am - 5:00 pm<br />
                    Sunday 10:00 am - 5:00 pm<br />
                    <span>+214 772 56 74 — cherryblossom@gmail.com</span>
                </p>
                <img src={cardsImg} alt="" />
                <p className="footer-bar-text">© 2022 Cherry Blossom</p>
            </footer>

        </div>
    );
};

export default Product3Page;
