import React, { useEffect, useState } from "react";

import axios from "axios";

const AIChat = () => {

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    // FETCH OLD CHAT HISTORY

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/gemini/history/user@gmail.com"
            );

            const historyMessages = [];

            response.data.reverse().forEach((chat) => {

                historyMessages.push({
                    sender: "user",
                    text: chat.question
                });

                historyMessages.push({
                    sender: "ai",
                    text: chat.answer
                });
            });

            setMessages(historyMessages);

        } catch (error) {

            console.log(error);
        }
    };

    // ASK AI

    const askGemini = async () => {

        if (!question.trim()) return;

        const userMessage = {
            sender: "user",
            text: question
        };

        setMessages((prev) => [...prev, userMessage]);

        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:8080/api/gemini/ask?email=user@gmail.com",
                question,
                {
                    headers: {
                        "Content-Type": "text/plain"
                    }
                }
            );

            const aiMessage = {
                sender: "ai",
                text: response.data
            };

            setMessages((prev) => [...prev, aiMessage]);

        } catch (error) {

            console.log(error);

            const aiMessage = {
                sender: "ai",
                text: "Error while calling AI"
            };

            setMessages((prev) => [...prev, aiMessage]);
        }

        setLoading(false);

        setQuestion("");
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to right, #2563eb, #9333ea)",
                padding: "30px"
            }}
        >

            <h1
                style={{
                    color: "white",
                    fontSize: "45px",
                    marginBottom: "20px"
                }}
            >
                AI Chat Assistant 🤖
            </h1>

            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "15px",
                    padding: "20px",
                    height: "500px",
                    overflowY: "auto",
                    marginBottom: "20px"
                }}
            >

                {
                    messages.map((msg, index) => (

                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent:
                                    msg.sender === "user"
                                        ? "flex-end"
                                        : "flex-start",
                                marginBottom: "15px"
                            }}
                        >

                            <div
                                style={{
                                    backgroundColor:
                                        msg.sender === "user"
                                            ? "#2563eb"
                                            : "#e5e7eb",

                                    color:
                                        msg.sender === "user"
                                            ? "white"
                                            : "black",

                                    padding: "15px",

                                    borderRadius: "15px",

                                    maxWidth: "70%",

                                    whiteSpace: "pre-wrap"
                                }}
                            >
                                {msg.text}
                            </div>

                        </div>
                    ))
                }

                {
                    loading && (

                        <div
                            style={{
                                color: "gray",
                                fontStyle: "italic"
                            }}
                        >
                            AI is typing...
                        </div>
                    )
                }

            </div>

            <textarea
                rows="4"
                placeholder="Ask anything..."
                value={question}
                onChange={(e) =>
                    setQuestion(e.target.value)
                }
                style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "10px",
                    border: "none",
                    fontSize: "16px",
                    marginBottom: "15px"
                }}
            />

            <button
                onClick={askGemini}
                style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    border: "none",
                    padding: "15px 30px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
            >
                Send 🚀
            </button>

        </div>
    );
};

export default AIChat;