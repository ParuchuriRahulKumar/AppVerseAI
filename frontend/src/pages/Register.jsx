import React, { useState } from "react";

import axios from "axios";

import {
    useNavigate
} from "react-router-dom";

import {
    toast
} from "react-toastify";

function Register() {

    const navigate =
        useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    // REGISTER FUNCTION

    const handleRegister = async (e) => {

        e.preventDefault();

        // PASSWORD VALIDATION

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (
            !passwordRegex.test(password)
        ) {

            toast.error(
                "Password must contain:\n" +
                "✔ 8 characters\n" +
                "✔ One capital letter\n" +
                "✔ One number\n" +
                "✔ One special character"
            );

            return;
        }

        try {

            await axios.post(

                "http://localhost:8080/api/auth/register",

                {
                    name,
                    email,
                    password
                }
            );

            toast.success(
                "Registration Successful 🚀"
            );

            navigate("/login");

        } catch (error) {

            toast.error(

                error.response?.data ||

                "Registration Failed"
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

                onSubmit={handleRegister}

                style={{
                    background: "white",

                    padding: "40px",

                    borderRadius: "20px",

                    width: "400px",

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
                    Register 🚀
                </h1>

                {/* NAME */}

                <input

                    type="text"

                    placeholder="Enter Name"

                    value={name}

                    onChange={(e) =>
                        setName(e.target.value)
                    }

                    required

                    style={inputStyle}
                />

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

                {/* PASSWORD RULES */}

                <p
                    style={{
                        fontSize: "13px",

                        color: "#475569",

                        marginBottom: "20px"
                    }}
                >
                    Password must contain:
                    <br />
                    ✔ 8 characters
                    <br />
                    ✔ One capital letter
                    <br />
                    ✔ One number
                    <br />
                    ✔ One special character
                </p>

                {/* BUTTON */}

                <button

                    type="submit"

                    style={buttonStyle}
                >
                    Register
                </button>

                {/* LOGIN LINK */}

                <p
                    style={{
                        marginTop: "20px",

                        textAlign: "center"
                    }}
                >
                    Already have an account?{" "}

                    <a
                        href="/login"

                        style={{
                            color: "#2563eb",

                            fontWeight: "bold",

                            textDecoration: "none"
                        }}
                    >
                        Login Here
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

export default Register;