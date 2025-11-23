import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Product1Page from "./pages/Product1Page";
import Product2Page from "./pages/Product2Page";
import Product3Page from "./pages/Product3Page";
import Product4Page from "./pages/Product4Page";
import Product5Page from "./pages/Product5Page";
import Product6Page from "./pages/Product6Page";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Contacts from "./pages/Contacts";
import PaymentOk from "./pages/PaymentOk";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function App() {

    useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    }, []);

    

    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/product/1" element={<Product1Page />} />
                    <Route path="/product/2" element={<Product2Page />} />
                    <Route path="/product/3" element={<Product3Page />} />
                    <Route path="/product/4" element={<Product4Page />} />
                    <Route path="/product/5" element={<Product5Page />} />
                    <Route path="/product/6" element={<Product6Page />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/paymentok" element={<PaymentOk />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route
                        path="/admin"
                        element={
                            <AdminProtectedRoute>
                                <Admin />
                            </AdminProtectedRoute>
                        }
                    />

                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
