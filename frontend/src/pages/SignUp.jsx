/* eslint-disable no-unused-vars */
import "./SignUp.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoHeader from "../assets/home-page/logo.png";
import searchIcon from "../assets/home-page/search_icon.png";
import balanceIcon from "../assets/home-page/balace_icon.png";
import { useCart } from "../context/CartContext";


const SignUp = () => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    window.location.href = "/signin";
    };
    const { totalPrice } = useCart();
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);

    const [error, setError] = useState("");
    const navigate = useNavigate();

    //  handleRegister
    const handleRegister = async () => {
        setError("");

        if (!agree) {
            setError("You must agree to personal data processing");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nickname,
                    email,
                    password,
                    agree
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Registration failed");
                return;
            }

            navigate("/signin");

        } catch (error) {
            setError("Server error, try again later");
        }
    };
    
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
                            <h1 className="signup">Sign up</h1>

                            

                            <div className="inputs-signup-block">
                                <div className="text-input-signup">
                                    <p>nickname</p>
                                    <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                </div>
                                <div className="text-input-signup">
                                    <p>email</p>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="text-input-signup">
                                    <p>password</p>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="text-input-signup">
                                    <p>confirm password</p>
                                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className="check-box-hero">
                                    <input type="checkbox" id="agree" checked={agree} onChange={() => setAgree(!agree)} />
                                    <label htmlFor="agree">I agree to the processing of personal data</label>
                                </div>
                            </div>
                            <button className="btn-hero" onClick={handleRegister}>sign up</button>
                            {/* Ошибка */}
                            
                            {error && (
                                <p style={{ color: "red", 
                                    textAlign: "center", 
                                    fontFamily: "Montserrat",
                                fontSize: "24px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "122%", /* 29.28px */
                                letterSpacing: "-1.08px" }}>
                                    {error}
                                </p>
                            )}
                            <Link to="/signin" className="signup-link">i have an account</Link>
                        </div>
        
                    </main>
                    
                </div>
    );
};

export default SignUp;
