/* eslint-disable react-hooks/set-state-in-effect */
import "./About.css";
import "./Admin.css";
import logoHeader from "../assets/home-page/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
    const [users, setUsers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [userOrders, setUserOrders] = useState([]);

    const loadUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
        } catch (err) {
            console.log("Error loading users:", err);
        }
    };

    const loadUserOrders = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/user-orders", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUserOrders(res.data);
    };

    const deleteOrder = async (orderId) => {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/admin/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        loadOrdersByUsers();
    };

    const updateQty = async (orderId, productId, newQty) => {
        const token = localStorage.getItem("token");

        await axios.put(
            `http://localhost:5000/api/admin/orders/${orderId}/items/${productId}`,
            { quantity: newQty },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        loadOrdersByUsers();
    };

    const deleteItem = async (orderId, productId) => {
        const token = localStorage.getItem("token");

        await axios.delete(
            `http://localhost:5000/api/admin/orders/${orderId}/items/${productId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        loadOrdersByUsers();
    };

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            loadUsers();
        } catch (err) {
            console.log("Error deleting user", err);
        }
    };
    
    const [ordersByUsers, setOrdersByUsers] = useState([]);

    const loadOrdersByUsers = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/orders-by-users", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setOrdersByUsers(res.data);
    };

    useEffect(() => {
        loadUsers();
        loadOrdersByUsers();
    }, []);

    return (
        <div className="home-page">
            <header className="main-header-admin">
                <img className="logo-header" src={logoHeader} alt="logo" />
            </header>

            <main className="main-admin">
                <h1>Admin Panel</h1>
                <div className="users-panel">

                    <h2>Users</h2>
                    {users.map(u => (
                        <div className="users-list" key={u._id}>
                            {u.nickname} — {u.email}
                            <button className="delete-user-btn" onClick={() => deleteUser(u._id)}>Delete</button>
                        </div>
                    ))}

                </div>
                
                <h2 className="h2-orders-user-panel">Orders by Users</h2>
                {ordersByUsers.map(block => (
                <div key={block.user._id} className="user-order-panel">
                    <h3 className="h3-user-panel">{block.user.nickname} — {block.user.email}</h3>

                    {block.orders.length === 0 && <p className="no-orders">No orders</p>}

                    {block.orders.map(order => (
                        <div key={order._id} style={{ marginLeft: "20px" }}>

                            <p className="p-user-panel"><b>Order #{order._id}</b> — Total: ${order.total}</p>

                            {order.items.map(item => (
                                <div className="product-user-panel" key={item._id}>
                                    {item.title} — {item.quantity} pcs × ${item.price}

                                    <div className="btn-cont-panel">
                                        <button className="plus-user-panel-btn" onClick={() => updateQty(order._id, item.id, item.quantity + 1)}>+</button>
                                        <button className="minus-user-panel-btn" onClick={() => updateQty(order._id, item.id, item.quantity - 1)}>-</button>
                                        <button className="delete-user-panel-btn" onClick={() => deleteItem(order._id, item.id)}>Delete item</button>
                                    </div>
                                </div>
                            ))}

                            <button className="delete-order-panel-btn" onClick={() => deleteOrder(order._id)} style={{ marginTop: "10px" }}>
                                Delete whole order
                            </button>
                        </div>
                    ))}
                </div>
                ))}
            </main>
        </div>
    );
};

export default Admin;
