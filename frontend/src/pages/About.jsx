// src/pages/About.jsx
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./About.css";
import logoHeader from "../assets/home-page/logo.png";
import searchIcon from "../assets/home-page/search_icon.png";
import balanceIcon from "../assets/home-page/balace_icon.png";
import logo2 from "../assets/home-page/LOGO2.png";
import cardsImg from "../assets/home-page/image12.png";
import { useCart } from "../context/CartContext";
// src/pages/Home.jsx

const About = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
    };
    const { totalPrice } = useCart();

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

            <main className="hero-about">
                <h1>ABOUT AS</h1>
                <div class="img-hero-about"></div>
                <p>
                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.
                    <br />       
                    <br />    
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </main>
            <section className="cards-section">
                <div className="card-about">
                    <div className="card1 card-set"></div>
                    <div className="card-cont-text">
                        <h1>In amet, mollis </h1>
                        <p>Ipsum dui sit non ipsum leo, dictumst. Dictumst. Et pulvinar leo, id ut. Eget mattis pellentesque mattis dolor adipiscing accumsan elit. Non libero, libero, amet tortor, velit ex. </p>
                    </div>                    
                </div>
                <div className="card-about">
                    <div className="card2 card-set"></div>
                    <div className="card-cont-text">
                        <h1>In amet, mollis </h1>
                        <p>Ipsum dui sit non ipsum leo, dictumst. Dictumst. Et pulvinar leo, id ut. Eget mattis pellentesque mattis dolor adipiscing accumsan elit. Non libero, libero, amet tortor, velit ex. </p>
                    </div>    
                </div>
                <div className="card-about">
                    <div className="card3 card-set"></div>
                    <div className="card-cont-text">
                        <h1>In amet, mollis </h1>
                        <p>Ipsum dui sit non ipsum leo, dictumst. Dictumst. Et pulvinar leo, id ut. Eget mattis pellentesque mattis dolor adipiscing accumsan elit. Non libero, libero, amet tortor, velit ex. </p>
                    </div>
                </div>
            </section>

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

export default About;