import React, { useState } from "react";

function Support() {

    const darkMode =
        localStorage.getItem("darkMode") === "true";

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [subject, setSubject] =
        useState("");

    const [message, setMessage] =
        useState("");

    const handleSubmit = async () => {

        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            alert(
                "Please fill all fields"
            );

            return;
        }

        const supportMessage = {

            name,

            email,

            message:
                `Subject: ${subject}\n\n${message}`
        };

        try {

            await fetch(
                "http://localhost:8080/api/support",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(
                        supportMessage
                    )
                }
            );

            alert(
                "Support request sent successfully ✅"
            );

            setName("");

            setEmail("");

            setSubject("");

            setMessage("");

        } catch (error) {

            console.log(error);

            alert(
                "Failed to send support request"
            );
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",

                backgroundColor:
                    darkMode
                        ? "#020617"
                        : "#f1f5f9",

                padding: "40px"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    background:
                        "linear-gradient(to right,#2563eb,#9333ea)",

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
                    🛟 Support Center
                </h1>

                <p
                    style={{
                        marginTop: "15px",

                        fontSize: "20px"
                    }}
                >
                    Contact admin for issues,
                    bugs, feedback or support.
                </p>

            </div>

            {/* FORM */}

            <div
                style={{
                    backgroundColor:
                        darkMode
                            ? "#172554"
                            : "white",

                    padding: "40px",

                    borderRadius: "25px",

                    maxWidth: "800px",

                    margin: "auto"
                }}
            >

                {/* NAME */}

                <input

                    type="text"

                    placeholder="Your Name"

                    value={name}

                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }

                    style={inputStyle}
                />

                {/* EMAIL */}

                <input

                    type="email"

                    placeholder="Your Email"

                    value={email}

                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }

                    style={inputStyle}
                />

                {/* SUBJECT */}

                <input

                    type="text"

                    placeholder="Subject"

                    value={subject}

                    onChange={(e) =>
                        setSubject(
                            e.target.value
                        )
                    }

                    style={inputStyle}
                />

                {/* MESSAGE */}

                <textarea

                    placeholder="Write your message..."

                    rows="6"

                    value={message}

                    onChange={(e) =>
                        setMessage(
                            e.target.value
                        )
                    }

                    style={{
                        ...inputStyle,

                        resize: "none"
                    }}
                />

                {/* BUTTON */}

                <button

                    onClick={handleSubmit}

                    style={{
                        background:
                            "linear-gradient(to right,#2563eb,#9333ea)",

                        color: "white",

                        border: "none",

                        padding: "15px 35px",

                        borderRadius: "12px",

                        fontWeight: "bold",

                        cursor: "pointer",

                        fontSize: "16px"
                    }}
                >
                    🚀 Send Support Request
                </button>

            </div>

        </div>
    );
}

// INPUT STYLE

const inputStyle = {

    width: "100%",

    padding: "15px",

    marginBottom: "20px",

    borderRadius: "12px",

    border: "none",

    fontSize: "16px"
};

export default Support;