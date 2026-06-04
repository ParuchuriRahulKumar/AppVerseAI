import React, { useEffect, useState } from "react";

import axios from "axios";

function ChatHistory() {

    const [history, setHistory] = useState([]);

    const darkMode =
        localStorage.getItem("darkMode") === "true";

    useEffect(() => {

        fetchHistory();

    }, []);

    // FETCH CHAT HISTORY

    const fetchHistory = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/gemini/history/user@gmail.com"
            );

            setHistory(response.data);

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
                    📜 Chat History
                </h1>

                <p
                    style={{
                        marginTop: "20px",

                        fontSize: "20px"
                    }}
                >
                    View all your previous AI conversations.
                </p>

            </div>

            {/* HISTORY */}

            {
                history.length === 0 ? (

                    <div
                        style={{
                            backgroundColor:
                                darkMode
                                    ? "#1e293b"
                                    : "white",

                            padding: "40px",

                            borderRadius: "20px",

                            textAlign: "center",

                            fontSize: "22px",

                            color:
                                darkMode
                                    ? "white"
                                    : "#0f172a"
                        }}
                    >
                        No chat history found 🤖
                    </div>

                ) : (

                    history.map((chat, index) => (

                        <div
                            key={index}

                            style={{
                                backgroundColor:
                                    darkMode
                                        ? "#1e293b"
                                        : "white",

                                padding: "25px",

                                borderRadius: "20px",

                                marginBottom: "25px",

                                boxShadow:
                                    "0 8px 20px rgba(0,0,0,0.1)"
                            }}
                        >

                            {/* QUESTION */}

                            <div
                                style={{
                                    marginBottom: "20px"
                                }}
                            >

                                <h3
                                    style={{
                                        color:
                                            darkMode
                                                ? "#60a5fa"
                                                : "#2563eb"
                                    }}
                                >
                                    🙋 Question
                                </h3>

                                <p
                                    style={{
                                        marginTop: "10px",

                                        lineHeight: "28px",

                                        color:
                                            darkMode
                                                ? "white"
                                                : "#0f172a"
                                    }}
                                >
                                    {chat.question}
                                </p>

                            </div>

                            {/* ANSWER */}

                            <div>

                                <h3
                                    style={{
                                        color:
                                            darkMode
                                                ? "#4ade80"
                                                : "#16a34a"
                                    }}
                                >
                                    🤖 AI Response
                                </h3>

                                <p
                                    style={{
                                        marginTop: "10px",

                                        lineHeight: "30px",

                                        color:
                                            darkMode
                                                ? "#cbd5e1"
                                                : "#475569",

                                        whiteSpace: "pre-wrap"
                                    }}
                                >
                                    {chat.answer}
                                </p>

                            </div>

                        </div>
                    ))
                )
            }

        </div>
    );
}

export default ChatHistory;