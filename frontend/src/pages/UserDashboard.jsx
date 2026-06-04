import React, { useEffect, useState } from "react";

import axios from "axios";

function UserDashboard() {

    const [favoriteCount, setFavoriteCount] =
        useState(0);

    const [chatCount, setChatCount] =
        useState(0);

    const [reviewCount, setReviewCount] =
        useState(0);

    const darkMode =
        localStorage.getItem("darkMode") === "true";

    useEffect(() => {

        loadDashboardData();

    }, []);

    const loadDashboardData = async () => {

        // FAVORITES

        const favorites =
            JSON.parse(
                localStorage.getItem("favorites")
            ) || [];

        setFavoriteCount(favorites.length);

        // CHAT HISTORY

        try {

            const chatResponse =
                await axios.get(
                    "http://localhost:8080/api/gemini/history/user@gmail.com"
                );

            setChatCount(
                chatResponse.data.length
            );

        } catch (error) {

            console.log(error);
        }

        // REVIEWS

        try {

            const reviews =
                JSON.parse(
                    localStorage.getItem("reviews")
                ) || [];

            setReviewCount(
                reviews.length
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",

                padding: "40px",

                backgroundColor:
                    darkMode
                        ? "#0f172a"
                        : "#e2e8f0"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    background:
                        "linear-gradient(to right, #2563eb, #7c3aed)",

                    padding: "50px",

                    borderRadius: "25px",

                    color: "white",

                    marginBottom: "40px"
                }}
            >

                <h1
                    style={{
                        fontSize: "50px"
                    }}
                >
                    📊 User Dashboard
                </h1>

                <p
                    style={{
                        marginTop: "20px",

                        fontSize: "20px"
                    }}
                >
                    Track your AI activity and statistics.
                </p>

            </div>

            {/* STATS */}

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",

                    gap: "30px"
                }}
            >

                {/* FAVORITES */}

                <div
                    style={{
                        backgroundColor:
                            darkMode
                                ? "#1e293b"
                                : "white",

                        padding: "35px",

                        borderRadius: "20px",

                        textAlign: "center",

                        boxShadow:
                            "0 8px 20px rgba(0,0,0,0.1)"
                    }}
                >

                    <h2
                        style={{
                            fontSize: "50px"
                        }}
                    >
                        ❤️
                    </h2>

                    <h1
                        style={{
                            fontSize: "45px",

                            marginTop: "15px",

                            color:
                                darkMode
                                    ? "white"
                                    : "#0f172a"
                        }}
                    >
                        {favoriteCount}
                    </h1>

                    <p
                        style={{
                            marginTop: "10px",

                            color:
                                darkMode
                                    ? "#cbd5e1"
                                    : "#475569"
                        }}
                    >
                        Favorite Apps
                    </p>

                </div>

                {/* CHATS */}

                <div
                    style={{
                        backgroundColor:
                            darkMode
                                ? "#1e293b"
                                : "white",

                        padding: "35px",

                        borderRadius: "20px",

                        textAlign: "center",

                        boxShadow:
                            "0 8px 20px rgba(0,0,0,0.1)"
                    }}
                >

                    <h2
                        style={{
                            fontSize: "50px"
                        }}
                    >
                        🤖
                    </h2>

                    <h1
                        style={{
                            fontSize: "45px",

                            marginTop: "15px",

                            color:
                                darkMode
                                    ? "white"
                                    : "#0f172a"
                        }}
                    >
                        {chatCount}
                    </h1>

                    <p
                        style={{
                            marginTop: "10px",

                            color:
                                darkMode
                                    ? "#cbd5e1"
                                    : "#475569"
                        }}
                    >
                        AI Chats
                    </p>

                </div>

                {/* REVIEWS */}

                <div
                    style={{
                        backgroundColor:
                            darkMode
                                ? "#1e293b"
                                : "white",

                        padding: "35px",

                        borderRadius: "20px",

                        textAlign: "center",

                        boxShadow:
                            "0 8px 20px rgba(0,0,0,0.1)"
                    }}
                >

                    <h2
                        style={{
                            fontSize: "50px"
                        }}
                    >
                        ⭐
                    </h2>

                    <h1
                        style={{
                            fontSize: "45px",

                            marginTop: "15px",

                            color:
                                darkMode
                                    ? "white"
                                    : "#0f172a"
                        }}
                    >
                        {reviewCount}
                    </h1>

                    <p
                        style={{
                            marginTop: "10px",

                            color:
                                darkMode
                                    ? "#cbd5e1"
                                    : "#475569"
                        }}
                    >
                        Reviews Given
                    </p>

                </div>

            </div>

        </div>
    );
}

export default UserDashboard;