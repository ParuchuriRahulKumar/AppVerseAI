import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

function Profile() {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [bio, setBio] =
        useState("");

    const darkMode =
        localStorage.getItem("darkMode") === "true";

    useEffect(() => {

        const savedName =
            localStorage.getItem("userName") ||
            "Rahul Kumar";

        const savedEmail =
            localStorage.getItem("userEmail") ||
            "user@gmail.com";

        const savedBio =
            localStorage.getItem("userBio") ||
            "AI enthusiast and full stack developer.";

        setName(savedName);

        setEmail(savedEmail);

        setBio(savedBio);

    }, []);

    // SAVE PROFILE

    const saveProfile = () => {

        localStorage.setItem(
            "userName",
            name
        );

        localStorage.setItem(
            "userEmail",
            email
        );

        localStorage.setItem(
            "userBio",
            bio
        );

        toast.success(
            "Profile updated successfully ✅"
        );
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

                    marginBottom: "40px",

                    textAlign: "center"
                }}
            >

                <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

                    alt="profile"

                    style={{
                        width: "120px",

                        borderRadius: "50%",

                        marginBottom: "20px"
                    }}
                />

                <h1
                    style={{
                        fontSize: "45px"
                    }}
                >
                    👤 User Profile
                </h1>

                <p
                    style={{
                        marginTop: "15px",

                        fontSize: "18px"
                    }}
                >
                    Manage your account details.
                </p>

            </div>

            {/* PROFILE FORM */}

            <div
                style={{
                    backgroundColor:
                        darkMode
                            ? "#1e293b"
                            : "white",

                    padding: "40px",

                    borderRadius: "20px",

                    maxWidth: "700px",

                    margin: "0 auto",

                    boxShadow:
                        "0 8px 20px rgba(0,0,0,0.1)"
                }}
            >

                {/* NAME */}

                <div
                    style={{
                        marginBottom: "25px"
                    }}
                >

                    <label
                        style={{
                            display: "block",

                            marginBottom: "10px",

                            color:
                                darkMode
                                    ? "white"
                                    : "#0f172a",

                            fontWeight: "bold"
                        }}
                    >
                        Full Name
                    </label>

                    <input

                        type="text"

                        value={name}

                        onChange={(e) =>
                            setName(e.target.value)
                        }

                        style={{
                            width: "100%",

                            padding: "15px",

                            borderRadius: "12px",

                            border: "1px solid #cbd5e1",

                            fontSize: "16px"
                        }}
                    />

                </div>

                {/* EMAIL */}

                <div
                    style={{
                        marginBottom: "25px"
                    }}
                >

                    <label
                        style={{
                            display: "block",

                            marginBottom: "10px",

                            color:
                                darkMode
                                    ? "white"
                                    : "#0f172a",

                            fontWeight: "bold"
                        }}
                    >
                        Email Address
                    </label>

                    <input

                        type="email"

                        value={email}

                        onChange={(e) =>
                            setEmail(e.target.value)
                        }

                        style={{
                            width: "100%",

                            padding: "15px",

                            borderRadius: "12px",

                            border: "1px solid #cbd5e1",

                            fontSize: "16px"
                        }}
                    />

                </div>

                {/* BIO */}

                <div
                    style={{
                        marginBottom: "30px"
                    }}
                >

                    <label
                        style={{
                            display: "block",

                            marginBottom: "10px",

                            color:
                                darkMode
                                    ? "white"
                                    : "#0f172a",

                            fontWeight: "bold"
                        }}
                    >
                        Bio
                    </label>

                    <textarea

                        rows="5"

                        value={bio}

                        onChange={(e) =>
                            setBio(e.target.value)
                        }

                        style={{
                            width: "100%",

                            padding: "15px",

                            borderRadius: "12px",

                            border: "1px solid #cbd5e1",

                            fontSize: "16px"
                        }}
                    />

                </div>

                {/* BUTTON */}

                <button

                    onClick={saveProfile}

                    style={{
                        background:
                            "linear-gradient(to right, #16a34a, #15803d)",

                        color: "white",

                        border: "none",

                        padding: "15px 25px",

                        borderRadius: "12px",

                        cursor: "pointer",

                        fontSize: "16px",

                        fontWeight: "bold"
                    }}
                >
                    Save Profile 🚀
                </button>

            </div>

        </div>
    );
}

export default Profile;