import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";


import {
    useNavigate
} from "react-router-dom";

function Home() {

    const navigate =
        useNavigate();

    const [apps, setApps] =
        useState([]);

    const [selectedCategory,
        setSelectedCategory] =
        useState("All");

    const [favorites,
        setFavorites] =
        useState(

            JSON.parse(
                localStorage.getItem(
                    "favorites"
                )
            ) || []
        );

    // FETCH APPS

    useEffect(() => {

        fetchApps();

    }, []);

    const fetchApps = async () => {

        try {

            const response =
                await axios.get(

                    "http://localhost:8080/api/apps"
                );

            setApps(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // FAVORITES

    const addToFavorites = (app) => {

        const exists =
            favorites.find(
                fav => fav.id === app.id
            );

        if (!exists) {

            const updatedFavorites =

                [...favorites, app];

            setFavorites(
                updatedFavorites
            );

            localStorage.setItem(

                "favorites",

                JSON.stringify(
                    updatedFavorites
                )
            );
        }
    };

    // FILTER

    const filteredApps =

        selectedCategory === "All"

            ? apps

            : apps.filter(

                app =>

                    app.category ===
                    selectedCategory
            );

    return (
        

        
        <div className="page-container">
           

            {/* HERO */}

            <div
                style={{
                    background:
                        "linear-gradient(to right,#2563eb,#9333ea)",

                    padding: "50px",

                    borderRadius: "30px",

                    marginBottom: "40px"
                }}
            >

                <h1
                    style={{
                        fontSize: "60px"
                    }}
                >
                    Discover AI Learning Apps 🚀
                </h1>

                <p
                    style={{
                        marginTop: "15px",

                        fontSize: "22px"
                    }}
                >
                    Explore next generation AI tools.
                </p>

                <div
                    style={{
                        marginTop: "20px",

                        background:
                            "rgba(255,255,255,0.2)",

                        display: "inline-block",

                        padding: "10px 18px",

                        borderRadius: "12px"
                    }}
                >
                    ❤️ Favorites:
                    {" "}
                    {favorites.length}
                </div>

            </div>

            {/* CATEGORY */}

            <div
                style={{
                    display: "flex",

                    gap: "15px",

                    flexWrap: "wrap",

                    marginBottom: "40px"
                }}
            >

                {
                    [
                        "All",
                        "AI",
                        "Coding",
                        "Design",
                        "Education",
                        "Programming",
                        "Productivity"
                    ].map(category => (

                        <button

                            key={category}

                            onClick={() =>
                                setSelectedCategory(
                                    category
                                )
                            }

                            style={{
                                padding:
                                    "12px 20px",

                                border: "none",

                                borderRadius:
                                    "12px",

                                cursor:
                                    "pointer",

                                background:

                                    selectedCategory === category

                                        ? "#7c3aed"

                                        : "#1e293b",

                                color: "white",

                                fontWeight:
                                    "bold"
                            }}
                        >
                            {category}
                        </button>
                    ))
                }

            </div>

            {/* APPS */}

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(320px,1fr))",

                    gap: "25px"
                }}
            >

                {
                    filteredApps.map(app => (

                        <div

                            key={app.id}

                            style={{
                                background:
                                    "#16213e",

                                padding: "25px",

                                borderRadius:
                                    "22px"
                            }}
                        >

                            {/* IMAGE */}

                            <img

                                src={
                                    app.imageUrl
                                }

                                alt="app"

                                style={{
                                    width: "80px",

                                    marginBottom:
                                        "20px"
                                }}
                            />

                            {/* TITLE */}

                            <h2
                                style={{
                                    marginBottom:
                                        "15px"
                                }}
                            >
                                {app.appName}
                            </h2>

                            {/* DESCRIPTION */}

                            <p
                                style={{
                                    color:
                                        "#cbd5e1",

                                    minHeight:
                                        "60px"
                                }}
                            >
                                {app.description}
                            </p>

                            {/* CATEGORY */}

                            <div
                                style={{
                                    marginTop:
                                        "20px",

                                    display:
                                        "flex",

                                    justifyContent:
                                        "space-between"
                                }}
                            >

                                <span
                                    style={{
                                        background:
                                            "#7c3aed",

                                        padding:
                                            "8px 14px",

                                        borderRadius:
                                            "10px"
                                    }}
                                >
                                    {app.category}
                                </span>

                                <span>
                                    ⭐ {app.rating}
                                </span>

                            </div>

                            {/* BUTTONS */}

                            <div
                                style={{
                                    display:
                                        "flex",

                                    gap: "10px",

                                    marginTop:
                                        "25px"
                                }}
                            >

                                <button

                                    onClick={() =>
                                        addToFavorites(
                                            app
                                        )
                                    }

                                    style={favBtn}
                                >
                                    ❤️ Fav
                                </button>

                                <button

                                    onClick={() =>
                                        navigate(
                                            `/app/${app.id}`
                                        )
                                    }

                                    style={viewBtn}
                                >
                                    👁 View
                                </button>

                                <button

                                    onClick={() =>
                                        window.open(
                                            app.downloadUrl,
                                            "_blank"
                                        )
                                    }

                                    style={downloadBtn}
                                >
                                    ⬇ Download
                                </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

// BUTTON STYLES

const favBtn = {

    background: "#ec4899",

    border: "none",

    padding: "10px",

    borderRadius: "10px",

    color: "white",

    cursor: "pointer",

    flex: 1
};

const viewBtn = {

    background: "#22c55e",

    border: "none",

    padding: "10px",

    borderRadius: "10px",

    color: "white",

    cursor: "pointer",

    flex: 1
};

const downloadBtn = {

    background: "#2563eb",

    border: "none",

    padding: "10px",

    borderRadius: "10px",

    color: "white",

    cursor: "pointer",

    flex: 1
};

export default Home;