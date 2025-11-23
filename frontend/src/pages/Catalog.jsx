import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logoHeader from "../assets/home-page/logo.png";
import searchIcon from "../assets/home-page/search_icon.png";
import balanceIcon from "../assets/home-page/balace_icon.png";
import AddToCartButton from "../components/AddToCartButton";
import { useCart } from "../context/CartContext";
import logo2 from "../assets/home-page/LOGO2.png";
import cardsImg from "../assets/home-page/image12.png";


const Catalog = () => {

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

            <section className="top-rated" id="features">
            <h2 className="top-title-catalog">Catalog</h2>

            <div className="top-grid">

                <div className="top-card">
                    <Link to="/product/1" >
                        <div className="product1"></div>
                    </Link>
                    <div className="top-info">
                        <div className="card-text-cont">
                            <p className="top-name">Cristal (pink carnations with mix flowers)</p>
                            <p className="top-price">$125.00</p>
                        </div>
                        <AddToCartButton className="btn-dark" productId={1} />
                    </div>
                </div>

                <div className="top-card">
                    <Link to="/product/2" >
                        <div className="product2"></div>
                    </Link>
                    <div className="top-info">
                        <div className="card-text-cont">
                            <p className="top-name">Milana (bouquet with garden roses)</p>
                            <p className="top-price">$245.00</p>
                        </div>
                        <AddToCartButton className="btn-dark" productId={2} />
                    </div>
                
                </div>            
                <div className="top-card">
                    <Link to="/product/3" >
                        <div className="product3"></div>
                    </Link>
                    <div className="top-info">
                        <div className="card-text-cont">
                            <p className="top-name">Diamond bouquet pink roses</p>
                            <p className="top-price">From $200.00</p>
                        </div>
                        <AddToCartButton className="btn-dark" productId={3} />
                    </div>
                </div>

                <div className="top-card">
                <Link to="/product/4" >
                    <div className="product4"></div>
                </Link>
                    <div className="top-info">
                        <div className="card-text-cont">
                            <p className="top-name">Bouquet Hyacinth pink</p>
                            <p className="top-price">$180.00</p>
                        </div>
                        <AddToCartButton className="btn-dark" productId={4} />
                    </div>
                </div>

                <div className="top-card">
                    <Link to="/product/5" >
                        <div className="product5"></div>
                    </Link>
                    <div className="top-info">
                        <div className="card-text-cont">
                            <p className="top-name">Bouquet rose bush odilia</p>
                            <p className="top-price">From $245.00</p>
                        </div>
                        <AddToCartButton className="btn-dark" productId={5} />
                    </div>
                </div>

                <div className="top-card">
                <Link to="/product/6" >
                    <div className="product6"></div>
                </Link>
                    <div className="top-info">
                        <div className="card-text-cont">
                            <p className="top-name">Bouquet of delicate carnation rose</p>
                            <p className="top-price">From $210.00</p>
                        </div>
                        <AddToCartButton className="btn-dark" productId={6} />
                    </div>
                </div>
            </div>
            <h2 className="top-title-catalog-bottom">_ </h2>                  
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

export default Catalog;
