import React from "react";

function Footer() {

    const darkMode =
        localStorage.getItem("darkMode") === "true";

    return (

        <footer
            style={{
                background:
                    "linear-gradient(to right, #2563eb, #7c3aed)",

                color: "white",

                padding: "30px",

                marginTop: "50px",

                textAlign: "center"
            }}
        >

            <h2
                style={{
                    marginBottom: "15px"
                }}
            >
                AppVerse AI 🚀
            </h2>

            <p
                style={{
                    marginBottom: "10px",

                    color:
                        darkMode
                            ? "#e2e8f0"
                            : "#f8fafc"
                }}
            >
                AI Marketplace & Learning Platform
            </p>

            <p
                style={{
                    fontSize: "14px",

                    opacity: "0.9"
                }}
            >
                © 2026 AppVerse AI. All Rights Reserved.
            </p>

        </footer>
    );
}

export default Footer;