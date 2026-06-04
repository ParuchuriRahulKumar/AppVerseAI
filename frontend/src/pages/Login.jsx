import React, { useState } from "react";

import axios from "axios";

import {
    useNavigate
} from "react-router-dom";

import {
    toast
} from "react-toastify";

function Login() {

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    // LOGIN FUNCTION

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response =
                await axios.post(

                    "http://localhost:8080/api/auth/login",

                    {
                        email,
                        password
                    }
                );

            // SAVE TOKEN

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "userEmail",
                response.data.email
            );

            localStorage.setItem(
                "userRole",
                response.data.role
            );

            localStorage.setItem(
                "userName",
                response.data.name
            );

            toast.success(
                "Login Successful 🚀"
            );

            // ADMIN REDIRECT

            if (
                response.data.role ===
                "ROLE_ADMIN"
            ) {

                navigate("/admin");
            }

            // USER REDIRECT

            else {

                navigate("/");
            }

        } catch (error) {

            toast.error(

                error.response?.data ||

                "Login Failed"
            );
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",

                background:
                    "linear-gradient(to right, #2563eb, #9333ea)",

                display: "flex",

                justifyContent: "center",

                alignItems: "center"
            }}
        >

            <form

                onSubmit={handleLogin}

                style={{
                    background: "white",

                    padding: "40px",

                    borderRadius: "20px",

                    width: "380px",

                    boxShadow:
                        "0 8px 20px rgba(0,0,0,0.2)"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",

                        marginBottom: "30px"
                    }}
                >
                    Login 🚀
                </h1>

                {/* EMAIL */}

                <input

                    type="email"

                    placeholder="Enter Email"

                    value={email}

                    onChange={(e) =>
                        setEmail(e.target.value)
                    }

                    required

                    style={inputStyle}
                />

                {/* PASSWORD */}

                <input

                    type="password"

                    placeholder="Enter Password"

                    value={password}

                    onChange={(e) =>
                        setPassword(e.target.value)
                    }

                    required

                    style={inputStyle}
                />

                {/* BUTTON */}

                <button

                    type="submit"

                    style={buttonStyle}
                >
                    Login
                </button>

                {/* REGISTER LINK */}

                <p
                    style={{
                        marginTop: "20px",

                        textAlign: "center"
                    }}
                >
                    New User?{" "}

                    <a
                        href="/register"

                        style={{
                            color: "#2563eb",

                            fontWeight: "bold",

                            textDecoration: "none"
                        }}
                    >
                        Register Here
                    </a>
                </p>

            </form>

        </div>
    );
}

// STYLES

const inputStyle = {

    width: "100%",

    padding: "14px",

    marginBottom: "20px",

    borderRadius: "10px",

    border: "1px solid #cbd5e1",

    fontSize: "15px"
};

const buttonStyle = {

    width: "100%",

    padding: "14px",

    background:
        "linear-gradient(to right, #2563eb, #9333ea)",

    color: "white",

    border: "none",

    borderRadius: "10px",

    cursor: "pointer",

    fontSize: "16px",

    fontWeight: "bold"
};

export default Login;