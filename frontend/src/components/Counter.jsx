import "./Counter.css";

const Counter = ({ value, onChange, small = false }) => {

    const minus = () => {
        if (value > 1) onChange(value - 1);
    };

    const plus = () => {
        onChange(value + 1);
    };

    return (
        <div className={`counter-box ${small ? "counter-small" : ""}`}>
            <button 
                onClick={minus} 
                disabled={value <= 1}
                className="counter-btn"
            >
                -
            </button>

            <span className="counter-value">{value}</span>

            <button 
                onClick={plus} 
                className="counter-btn"
            >
                +
            </button>
        </div>
    );
};

export default Counter;
