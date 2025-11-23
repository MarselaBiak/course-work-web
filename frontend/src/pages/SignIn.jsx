/* eslint-disable no-unused-vars */
import "./SignIn.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



import logoHeader from "../assets/home-page/logo.png";
import searchIcon from "../assets/home-page/search_icon.png";
import balanceIcon from "../assets/home-page/balace_icon.png";
import { useCart } from "../context/CartContext";



const SignIn = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
    };
    const { totalPrice } = useCart();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://127.0.0.1:5000/api/auth/login", {
                email,
                password,
            });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user)); // 🎯 сохраняем ROLE
            }

            // 🎯 РЕДИРЕКТ ПО РОЛИ
            if (res.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/home");
            }

        } catch (error) {
            setError("Server error");
        }
    };


    console.log("EMAIL STATE:", email);
    console.log("PASSWORD STATE:", password);

    useEffect(() => {
        window.scrollTo(0, 0);
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

            {/* ---------- OVERLAY (тёмный фон) ---------- */}
            {isMenuOpen && (
                <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
            )}

            {/* ---------- HEADER ---------- */}
            <header className="main-header">
                <div className="header-inner">
                    
                    {/* LEFT — burger */}
                    <button className="header-burger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span className="span-1-header"></span>
                        <span className="span-2-header"></span>
                    </button>

                    {/* CENTER — logo */}
                    <img className="logo-header" src={logoHeader} alt="logo" />

                    {/* RIGHT — icons */}
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

            {/* ---------- HERO SECTION ---------- */}
            <main className="hero">
                <div className="hero-content">
                    <h1 className="signin">Sing in</h1>
                    <div className="inputs-signin-block">
                        <div className="text-input-signin">
                            <p>email</p>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="text-input-signin">
                            <p>password</p>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <button className="btn-hero" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Loading..." : "Sign in"}
                    </button>
                    {error && <p className="error-text">{error}</p>}
                    <Link to="/signup" className="signin-link">
                        i dont have an account
                    </Link>

                </div>

            </main>
            
        </div>
    );
};

export default SignIn;
