import { Link } from "react-router-dom";
import Product1 from "./cards/Product1";
import Product2 from "./cards/Product2";
import Product3 from "./cards/Product3";
import Product4 from "./cards/Product4";
import Product5 from "./cards/Product5";
import Product6 from "./cards/Product6";

const productComponents = {
    "/product/1": <Product1 />,
    "/product/2": <Product2 />,
    "/product/3": <Product3 />,
    "/product/4": <Product4 />,
    "/product/5": <Product5 />,
    "/product/6": <Product6 />,
};

const RecentlyViewed = () => {
    const viewed = JSON.parse(localStorage.getItem("recentProducts")) || [];

    if (viewed.length === 0) return null;

    return (
        <div className="recently-viewed-block">
            <h2 className="section-title">RECENTLY VIEWED PRODUCTS</h2>

            <div className="recent-grid">
                {viewed.map((path) => (
                    <Link key={path} to={path} className="recent-card">
                        {productComponents[path]}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewed;
