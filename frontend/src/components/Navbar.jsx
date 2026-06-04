import React, { useState } from "react";

import {
    Link,
    useLocation
} from "react-router-dom";

function Navbar() {

    const location = useLocation();

    const token =
        localStorage.getItem("token");

    const [darkMode, setDarkMode] =
        useState(
            localStorage.getItem("darkMode") === "true"
        );

    // DARK MODE

    const toggleDarkMode = () => {

        localStorage.setItem(
            "darkMode",
            !darkMode
        );

        setDarkMode(!darkMode);

        window.location.reload();
    };

    // LOGOUT

    const logout = () => {

        localStorage.removeItem("token");

        window.location.href = "/login";
    };

    return (

        <nav
            style={{
                background:
                    "linear-gradient(to right, #2563eb, #7c3aed)",

                padding: "18px 40px",

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                flexWrap: "wrap"
            }}
        >

            {/* LOGO */}

            <h1
                style={{
                    color: "white",

                    fontSize: "30px",

                    fontWeight: "bold"
                }}
            >
                AppVerse AI 🚀
            </h1>

            {/* NAVIGATION */}

            <div
                style={{
                    display: "flex",

                    gap: "15px",

                    alignItems: "center",

                    flexWrap: "wrap"
                }}
            >

                {/* ALWAYS SHOW HOME */}

                <Link
                    to="/"
                    style={linkStyle}
                >
                    Home
                </Link>
           
                {/* IF USER LOGGED IN */}

                {
                    token && (
                        <>
                            <Link
                                to="/favorites"
                                style={linkStyle}
                            >
                                Favorites
                            </Link>

                            <Link
                                to="/ai-chat"
                                style={linkStyle}
                            >
                                AI Chat
                            </Link>

                            <Link
                                to="/chat-history"
                                style={linkStyle}
                            >
                                Chat History
                            </Link>

                            <Link
                                to="/user-dashboard"
                                style={linkStyle}
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/profile"
                                style={linkStyle}
                            >
                                Profile
                            </Link>
                            <Link
    to="/support"
    style={linkStyle}
>
    Support
</Link>
                        </>
                    )
                }

                {/* DARK MODE */}

                <button

                    onClick={toggleDarkMode}

                    style={{
                        background:
                            darkMode
                                ? "#facc15"
                                : "#1e293b",

                        color:
                            darkMode
                                ? "#0f172a"
                                : "white",

                        border: "none",

                        padding: "10px 18px",

                        borderRadius: "10px",

                        cursor: "pointer",

                        fontWeight: "bold"
                    }}
                >
                    {
                        darkMode
                            ? "☀ Light"
                            : "🌙 Dark"
                    }
                </button>

                {/* LOGIN BUTTON */}

                {
                    !token && (
                        <Link
                            to="/login"
                            style={{
                                ...linkStyle,
                                background: "#16a34a"
                            }}
                        >
                            Login
                        </Link>
                    )
                }

                {/* LOGOUT BUTTON */}

                {
                    token && (
                        <button

                            onClick={logout}

                            style={{
                                background: "#dc2626",

                                color: "white",

                                border: "none",

                                padding: "10px 18px",

                                borderRadius: "10px",

                                cursor: "pointer",

                                fontWeight: "bold"
                            }}
                        >
                            Logout
                        </button>
                    )
                }

            </div>

        </nav>
    );
}

const linkStyle = {

    color: "white",

    textDecoration: "none",

    fontWeight: "bold",

    background:
        "rgba(255,255,255,0.15)",

    padding: "10px 16px",

    borderRadius: "10px"
};

export default Navbar;