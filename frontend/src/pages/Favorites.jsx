import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

function Favorites() {

    const navigate =
        useNavigate();

    const [favorites,
        setFavorites] =
        useState([]);

    // LOAD FAVORITES

    useEffect(() => {

        const savedFavorites =

            JSON.parse(
                localStorage.getItem(
                    "favorites"
                )
            ) || [];

        setFavorites(
            savedFavorites
        );

    }, []);

    // REMOVE FAVORITE

    const removeFavorite = (id) => {

        const updatedFavorites =

            favorites.filter(

                app => app.id !== id
            );

        setFavorites(
            updatedFavorites
        );

        localStorage.setItem(

            "favorites",

            JSON.stringify(
                updatedFavorites
            )
        );
    };

    return (

        <div
            style={{
                background: "#071028",

                minHeight: "100vh",

                padding: "40px",

                color: "white"
            }}
        >

            {/* TITLE */}

            <h1
                style={{
                    fontSize: "50px",

                    marginBottom: "15px"
                }}
            >
                ❤️ Favorite Apps
            </h1>

            <p
                style={{
                    color: "#cbd5e1",

                    marginBottom: "40px"
                }}
            >
                Your saved AI applications.
            </p>

            {/* NO FAVORITES */}

            {
                favorites.length === 0 && (

                    <div
                        style={{
                            textAlign: "center",

                            marginTop: "100px"
                        }}
                    >

                        <h2>
                            No favorites added yet 😢
                        </h2>

                    </div>
                )
            }

            {/* FAVORITES GRID */}

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(320px,1fr))",

                    gap: "25px"
                }}
            >

                {
                    favorites.map(app => (

                        <div

                            key={app.id}

                            style={{
                                background:
                                    "#16213e",

                                borderRadius:
                                    "22px",

                                padding: "25px"
                            }}
                        >

                            {/* IMAGE */}

                            <img

                                src={
                                    app.imageUrl ||
                                    "https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                                }

                                alt="app"

                                style={{
                                    width: "80px",

                                    marginBottom:
                                        "20px"
                                }}
                            />

                            {/* TITLE */}

                            <h2>
                                {app.appName}
                            </h2>

                            {/* DESCRIPTION */}

                            <p
                                style={{
                                    color:
                                        "#cbd5e1",

                                    marginTop:
                                        "10px",

                                    minHeight:
                                        "60px"
                                }}
                            >
                                {app.description}
                            </p>

                            {/* CATEGORY */}

                            <div
                                style={{
                                    display:
                                        "flex",

                                    justifyContent:
                                        "space-between",

                                    marginTop:
                                        "20px"
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

                                {/* VIEW */}

                                <button

                                    onClick={() =>
                                        navigate(
                                            `/app/${app.id}`
                                        )
                                    }

                                    style={{
                                        background:
                                            "#22c55e",

                                        border:
                                            "none",

                                        padding:
                                            "10px",

                                        borderRadius:
                                            "10px",

                                        color:
                                            "white",

                                        cursor:
                                            "pointer",

                                        flex: 1
                                    }}
                                >
                                    👁 View
                                </button>

                                {/* REMOVE */}

                                <button

                                    onClick={() =>
                                        removeFavorite(
                                            app.id
                                        )
                                    }

                                    style={{
                                        background:
                                            "#ef4444",

                                        border:
                                            "none",

                                        padding:
                                            "10px",

                                        borderRadius:
                                            "10px",

                                        color:
                                            "white",

                                        cursor:
                                            "pointer",

                                        flex: 1
                                    }}
                                >
                                    ❌ Remove
                                </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default Favorites;