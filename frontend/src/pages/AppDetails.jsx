import React, { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

function AppDetails() {

    const { id } = useParams();

    const [app, setApp] =
        useState(null);

    const [reviews, setReviews] =
        useState([]);

    const [reviewName, setReviewName] =
        useState(
            localStorage.getItem("userName")
            || "Guest User"
        );

    const [reviewText, setReviewText] =
        useState("");

    const [rating, setRating] =
        useState(5);

    const darkMode =
        localStorage.getItem("darkMode") === "true";

    useEffect(() => {

        fetchApp();

        fetchReviews();

    }, []);

    // FETCH APP

    const fetchApp = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/api/apps/${id}`
                );

            setApp(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // FETCH REVIEWS

    const fetchReviews = () => {

        const allReviews =
            JSON.parse(
                localStorage.getItem("reviews")
            ) || [];

        const appReviews =
            allReviews.filter(
                (review) =>
                    review.appId == id
            );

        setReviews(appReviews);
    };

    // SUBMIT REVIEW

    const submitReview = () => {

        if (!reviewText) {

            alert("Please enter review");

            return;
        }

        const newReview = {

            appId: id,

            name: reviewName,

            review: reviewText,

            rating: rating
        };

        const oldReviews =
            JSON.parse(
                localStorage.getItem("reviews")
            ) || [];

        oldReviews.push(newReview);

        localStorage.setItem(
            "reviews",
            JSON.stringify(oldReviews)
        );

        setReviews(oldReviews.filter(
            (review) =>
                review.appId == id
        ));

        setReviewText("");

        setRating(5);

        alert("Review Added Successfully ⭐");
    };

    if (!app) {

        return <h1>Loading...</h1>;
    }

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

            {/* APP CARD */}

            <div
                style={{
                    backgroundColor:
                        darkMode
                            ? "#172554"
                            : "white",

                    borderRadius: "25px",

                    padding: "40px",

                    display: "flex",

                    gap: "40px",

                    alignItems: "center",

                    marginBottom: "40px"
                }}
            >

                <img
                    src={app.imageUrl}
                    alt={app.name}
                    style={{
                        width: "220px",

                        height: "220px",

                        objectFit: "contain"
                    }}
                />

                <div>

                    <h1
                        style={{
                            color:
                                darkMode
                                    ? "white"
                                    : "#0f172a",

                            fontSize: "60px"
                        }}
                    >
                        {app.name}
                    </h1>

                    <p
                        style={{
                            color:
                                darkMode
                                    ? "#cbd5e1"
                                    : "#475569",

                            marginTop: "20px",

                            fontSize: "24px"
                        }}
                    >
                        {app.description}
                    </p>

                    <div
                        style={{
                            display: "flex",

                            gap: "20px",

                            marginTop: "20px",

                            alignItems: "center"
                        }}
                    >

                        <span
                            style={{
                                backgroundColor: "#7c3aed",

                                color: "white",

                                padding: "10px 20px",

                                borderRadius: "10px"
                            }}
                        >
                            {app.category}
                        </span>

                        <h2
                            style={{
                                color: "#facc15"
                            }}
                        >
                            ⭐ {app.rating}
                        </h2>

                    </div>

                    <div
                        style={{
                            display: "flex",

                            gap: "15px",

                            marginTop: "30px"
                        }}
                    >

                        <a
                            href={app.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                backgroundColor: "#22c55e",

                                color: "white",

                                padding: "14px 24px",

                                borderRadius: "12px",

                                textDecoration: "none",

                                fontWeight: "bold"
                            }}
                        >
                            🌐 Visit Website
                        </a>

                        <a
                            href={app.downloadUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                backgroundColor: "#2563eb",

                                color: "white",

                                padding: "14px 24px",

                                borderRadius: "12px",

                                textDecoration: "none",

                                fontWeight: "bold"
                            }}
                        >
                            ⬇ Download
                        </a>

                    </div>

                </div>

            </div>

            {/* REVIEW SECTION */}

            <div
                style={{
                    backgroundColor:
                        darkMode
                            ? "#172554"
                            : "white",

                    padding: "40px",

                    borderRadius: "25px"
                }}
            >

                <h1
                    style={{
                        color:
                            darkMode
                                ? "white"
                                : "#0f172a",

                        marginBottom: "30px"
                    }}
                >
                    ⭐ Reviews & Ratings
                </h1>

                <input
                    type="text"

                    value={reviewName}

                    onChange={(e) =>
                        setReviewName(e.target.value)
                    }

                    placeholder="Your Name"

                    style={{
                        width: "100%",

                        padding: "15px",

                        borderRadius: "10px",

                        marginBottom: "20px"
                    }}
                />

                <textarea
                    value={reviewText}

                    onChange={(e) =>
                        setReviewText(e.target.value)
                    }

                    placeholder="Write your review..."

                    rows="5"

                    style={{
                        width: "100%",

                        padding: "15px",

                        borderRadius: "10px",

                        marginBottom: "20px"
                    }}
                />

                <select
                    value={rating}

                    onChange={(e) =>
                        setRating(e.target.value)
                    }

                    style={{
                        width: "100%",

                        padding: "15px",

                        borderRadius: "10px",

                        marginBottom: "20px"
                    }}
                >

                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>

                </select>

                <button
                    onClick={submitReview}

                    style={{
                        background:
                            "linear-gradient(to right,#2563eb,#9333ea)",

                        color: "white",

                        border: "none",

                        padding: "14px 30px",

                        borderRadius: "12px",

                        fontWeight: "bold",

                        cursor: "pointer"
                    }}
                >
                    Submit Review
                </button>

                {/* REVIEW LIST */}

                <div
                    style={{
                        marginTop: "40px"
                    }}
                >

                    {
                        reviews.length === 0
                        ? (
                            <p
                                style={{
                                    color:
                                        darkMode
                                            ? "#cbd5e1"
                                            : "#475569"
                                }}
                            >
                                No reviews yet.
                            </p>
                        )
                        : (
                            reviews.map((review, index) => (

                                <div
                                    key={index}

                                    style={{
                                        backgroundColor:
                                            darkMode
                                                ? "#1e293b"
                                                : "#f8fafc",

                                        padding: "20px",

                                        borderRadius: "15px",

                                        marginBottom: "20px"
                                    }}
                                >

                                    <h3
                                        style={{
                                            color:
                                                darkMode
                                                    ? "white"
                                                    : "#0f172a"
                                        }}
                                    >
                                        {review.name}
                                    </h3>

                                    <p
                                        style={{
                                            color: "#facc15",

                                            marginTop: "10px"
                                        }}
                                    >
                                        {"⭐".repeat(review.rating)}
                                    </p>

                                    <p
                                        style={{
                                            color:
                                                darkMode
                                                    ? "#cbd5e1"
                                                    : "#475569",

                                            marginTop: "10px"
                                        }}
                                    >
                                        {review.review}
                                    </p>

                                </div>
                            ))
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default AppDetails;