import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import "./Search.css";
import logoHeader from "../assets/home-page/logo.png";
import searchIcon from "../assets/home-page/search_icon.png";
import balanceIcon from "../assets/home-page/balace_icon.png";
import logo2 from "../assets/home-page/LOGO2.png";
import cardsImg from "../assets/home-page/image12.png";
import { useCart } from "../context/CartContext";



const Search = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
    };
    const { totalPrice } = useCart();
    
    const [results, setResults] = useState([]);

    const handleSearch = async (query) => {
        console.log("Search triggered:", query);

        if (!query.trim()) {
            setResults([]);
            return;
        }

        try {
            const res = await axios.get(
                `http://localhost:5000/api/products/search?q=${query}`
            );

            setResults(res.data);
        } catch (err) {
            console.error("Search error:", err);
        }
    };

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

            <main className="hero-search">
                <div className="hero-content-search">
                    <h1 className="hero-title-search">
                        SEARCH
                    </h1>
                    <SearchBar onSearch={handleSearch} />
                </div>
            </main>

            <section className="serch-section-class">
                <div className="search-results">
                    {results.length === 0 ? (
                        <p className="no-results">No results yet</p>
                    ) : (
                        <div className="results-grid">
                            {results.map((item) => (
                                <Link key={item.id} to={`/product/${item.id}`} className="result-card">
                                    <img src={item.img} alt={item.title} className="result-card-img"/>
                                        <div className="res-cont-text">
                                        <div className="res-text-card-cont">
                                            <p className="result-title">{item.title}</p>
                                            <p className="result-price">${item.price}</p>
                                        </div>
                                        <button className="btn-dark">View</button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
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

export default Search;