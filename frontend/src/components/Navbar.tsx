import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token"); // Check if the token exists

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token from local storage
        navigate("/login"); // Redirect to the login page
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
                backgroundColor: "#333",
                color: "#fff",
            }}
        >
            <h1 style={{ margin: 0 }}>Musician Hub</h1>
            <ul
                style={{
                    listStyle: "none",
                    display: "flex",
                    gap: "1rem",
                    margin: 0,
                    padding: 0,
                }}
            >
                {!isLoggedIn && (
                    <>
                        <li>
                            <Link
                                to="/signup"
                                style={{ color: "white", textDecoration: "none" }}
                            >
                                Signup
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                style={{ color: "white", textDecoration: "none" }}
                            >
                                Login
                            </Link>
                        </li>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <li>
                            <Link
                                to="/create-ensemble"
                                style={{ color: "white", textDecoration: "none" }}
                            >
                                Create Ensemble
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/ensembles"
                                style={{ color: "white", textDecoration: "none" }}
                            >
                                All Ensembles
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register-ensemble"
                                style={{ color: "white", textDecoration: "none" }}
                            >
                                Register in Ensemble
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: "transparent",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
