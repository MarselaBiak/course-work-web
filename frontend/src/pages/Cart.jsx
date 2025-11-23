import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import CartItem from "../components/CartItem";

import "./Cart.css";
import "./Home.css";
import logoHeader from "../assets/home-page/logo.png";
import searchIcon from "../assets/home-page/search_icon.png";
import balanceIcon from "../assets/home-page/balace_icon.png";
import logo2 from "../assets/home-page/LOGO2.png";
import cardsImg from "../assets/home-page/image12.png";

const Cart = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("LOCAL STORAGE USER RAW =", localStorage.getItem("user"));
    console.log("PARSED USER =", user);

    const [sellerNotes, setSellerNotes] = useState("");
    const [giftMessage, setGiftMessage] = useState("");

    const { cart, totalPrice } = useCart();

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
    };

    useEffect(() => {
    window.scrollTo(0, 0);
    }, []);

    const handleCheckout = async () => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;

        if (!userId) {
            console.error("User is not logged in!");
            alert("Please log in first.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/payment/create-checkout-session",
                {
                    items: cart,
                    sellerNotes,
                    giftMessage,
                    userId,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            window.location.href = res.data.url;
        } catch (err) {
            console.error(err);
        }
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
            
            <main className="hero-section-cart">
                <div className="cont-section-all">
                    <div className="cont-sec-1-text">
                        <h2 className="hero-cart-h2">Home / Cart</h2>
                        <p className="hero-cart-p">Product</p>
                    </div>
                    <div className="cont-sec-2-text">
                        <Link to="/catalog">
                            <h2 className="link-h2-hero-cart">Continue shopping</h2>            
                        </Link>
                        <div className="cont-sec-1-text-2">
                            <p className="hero-cart-p">Quantity</p>
                            <p className="hero-cart-p">Total</p>
                        </div>
                    </div>
                </div>
            </main>
    
            <section className="products-section-on-cart">
                <div className="cart-page">
                    {cart.length === 0 ? (
                        <p className="cart-empty">Your cart is empty</p>
                    ) : (
                        cart.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))
                    )}
                </div>
            </section>

            <section className="pay-section">
                <div className="form-area">
                    <div className="field-group">
                        <label htmlFor="seller-notes">Special instructions for seller</label>
                        <textarea
                        id="seller-notes"
                        value={sellerNotes}
                        onChange={(e) => setSellerNotes(e.target.value)}
                        placeholder="Add your instructions for seller here"
                        ></textarea>
                    </div>

                    <div className="form-and-btn">
                        <div className="field-group">
                            <label htmlFor="gift-message">Gift message</label>
                            <textarea
                            id="gift-message"
                            value={giftMessage}
                            onChange={(e) => setGiftMessage(e.target.value)}
                            placeholder="Add your gift message here"
                            ></textarea>
                        </div>

                        <div className="check-out-sec">
                            <div className="check-out-cont">
                                <p className="check-out-p">Subtotal</p>
                                <span className="cart-amount-check-out">
                                    {totalPrice > 0 ? `$${totalPrice}` : ""}
                                </span>
                            </div>
                            <p className="check-out-p-2">Taxes and shipping calculated at checkout</p>
                            <button className="check-out-btn" onClick={handleCheckout}>Check out</button>    
                        </div>
                    </div>
                </div>  
            </section>            

            <section className="special-offer" >
            <h2 className="sp-of-title">SPECIAL OFFER</h2>
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
            <div className="top-more-wrap">
                <Link to="/catalog">           
                    <button className="btn-more">Show more</button>
                </Link>  
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

export default Cart;
