import { useState } from "react";
import searchicon from "../assets/home-page/searchiconbig.png";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (onSearch) onSearch(query);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="search-wrapper">
            <input
                type="text"
                placeholder="Search our store"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="search-input"
            />

            <button className="search-button" onClick={handleSearch}>
                <img src={searchicon} alt="search" />
            </button>
        </div>
    );
};

export default SearchBar;
