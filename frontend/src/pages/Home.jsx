import { useState } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

import "./Home.css";
import logoHeader from "../assets/home-page/logo.png";
import searchIcon from "../assets/home-page/search_icon.png";
import balanceIcon from "../assets/home-page/balace_icon.png";
import rightPetal from "../assets/home-page/flower_right.png";
import leftPetal from "../assets/home-page/flower_left.png";
import develiry1Img from "../assets/home-page/delivery1.png";
import develiry2Img from "../assets/home-page/delivery2.png";
import whyuscard1 from "../assets/home-page/whyuscard1.png";
import whyuscard2 from "../assets/home-page/whyuscard2.png";
import whyuscar3 from "../assets/home-page/whyuscard3.png";
import instimg from "../assets/home-page/instimg.png";
import geoicon from "../assets/home-page/geoicon.png";
import logo2 from "../assets/home-page/LOGO2.png";
import cardsImg from "../assets/home-page/image12.png";

const Home = () => {

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

            <main className="hero">

                <img src={leftPetal} alt="" className="petal petal-left" />

                <img src={rightPetal} alt="" className="petal petal-right" />

                <div className="hero-content">
                    <h1 className="hero-title">
                        CHOOSE FLOWERS <br /> FOR ANY OCCASION
                    </h1>

                    <p className="hero-subtitle">
                        Our goal is to provide the highest quality
                        <br />
                        and fresh flower delivery in Los Angeles.
                    </p>

                    <button 
                    onClick={() => {
                        document.getElementById("features").scrollIntoView({
                            behavior: "smooth"
                        });
                    }} className="hero-button">
                        View now
                    </button>

                </div>

            </main>

            <section className="info-strip">
                <div className="info-item">
                    <div className="info-cont">
                        <div className="info-title">Need flowers delivered today?</div>
                        <div className="info-text">Call or chat us</div>
                    </div>
                    <img src={develiry1Img} alt="delivery1" />
                </div>

                <div className="info-item">
                    <div className="info-cont">
                        <div className="info-title">Free delivery within 4 miles</div>
                        <div className="info-text">No minimum order</div>   
                    </div>
                    <img src={develiry2Img} alt="delivery2" />
                </div>
            </section>

            <section className="top-rated" id="features">
            <h2 className="top-title">TOP RATED</h2>

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
            
            <div className="top-more-wrap">
                <Link to="/catalog">           
                    <button className="btn-more">Show more</button>
                </Link>  
            </div>
        </section>

        <section className="why-us-section">
            <h1 className="why-us-h1">why choose us?</h1>  
            <div className="why-us-cont-card">            
                <div className="why-us-card">
                    <div className="why-us-cont-text">
                        <h2 className="why-us-h2">Extensive сhoice</h2>
                        <img src={whyuscard1} alt="" className="why-us-img" />
                    </div>
                    <p className="why-us-p">We have a huge selection of the most beautiful flowers in town. Our flower shop stocks all types of flowers, including roses, tulips, lilies, and more!</p>
                </div>
                <div className="why-us-card">
                    <div className="why-us-cont-text">
                        <h2 className="why-us-h2">Fast delivery</h2>
                        <img src={whyuscard2} alt="" className="why-us-img" />
                    </div>
                    <p className="why-us-p">When it comes to delivering flowers as fast as possible, we don't mess around. We also provide next-day delivery from our store to your door.</p>
                </div>
                <div className="why-us-card">
                    <div className="why-us-cont-text">
                        <h2 className="why-us-h2">Online ordering</h2>
                        <img src={whyuscar3} alt="" className="why-us-img" />
                    </div>
                    <p className="why-us-p">All you need to do is select the type and quantity of what you want online - we'll take care of the rest! Our team is online 24/7 with clients.</p>
                </div>
            </div>                  
        </section>                    

        <section className="follow-us-section">
            <h2 className="follow-us-h2">FOLLOW US ON INSTAGRAM</h2>
            <a href="https://www.instagram.com/" className="follow-us-a" target="_blank">@CHERRYBLOSSOM.LA</a>
            <img src={instimg} alt="instimg" className="follow-us-img" />
        </section>

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

        <section className="location-section">
            <div className="location-bar">
                <div className="location-card">
                    <img src={geoicon} alt="geoicon" className="location-img" />
                    <h2 className="location-h2">Сherry Blossom Address</h2>
                    <p className="location-p">
                            6201 Hollywood blvd Los Angeles, California 90028
                        <br /> 
                        <br />   
                            Monday - Friday 9:00 am - 8:00 pm
                            Saturday 10:00 am - 5:00 pm
                            Sunday 10:00 am - 5:00 pm    
                    </p>
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

export default Home;
