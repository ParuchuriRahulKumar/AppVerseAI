import React, { useEffect, useState } from "react";

import axios from "axios";



import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend
} from "recharts";

function Dashboard() {

    const [apps, setApps] = useState([]);

    const [reviews, setReviews] = useState([]);

    const darkMode =
        localStorage.getItem("darkMode") === "true";

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const appResponse =
                await axios.get(
                    "http://localhost:8080/api/apps"
                );

            setApps(appResponse.data);

            const reviewResponse =
                await axios.get(
                    "http://localhost:8080/api/reviews"
                );

            setReviews(reviewResponse.data);

        } catch (error) {

            console.log(error);
        }
    };

    const positiveReviews =
        reviews.filter(
            (review) =>
                review.sentiment === "Positive"
        ).length;

    const negativeReviews =
        reviews.filter(
            (review) =>
                review.sentiment === "Negative"
        ).length;

    const averageRating =
        reviews.length > 0
            ? (
                  reviews.reduce(
                      (acc, review) =>
                          acc + review.rating,
                      0
                  ) / reviews.length
              ).toFixed(1)
            : 0;

    const pieData = [
        {
            name: "Positive",
            value: positiveReviews
        },
        {
            name: "Negative",
            value: negativeReviews
        }
    ];

    const COLORS = [
        "#22c55e",
        "#ef4444"
    ];

    const categoryData = [];

    const categoryMap = {};

    apps.forEach((app) => {

        if (categoryMap[app.category]) {

            categoryMap[app.category] += 1;

        } else {

            categoryMap[app.category] = 1;
        }
    });

    for (let key in categoryMap) {

        categoryData.push({

            category: key,

            apps: categoryMap[key]
        });
    }

    return (

        <>
            

            <div
                style={{
                    padding: "40px",

                    backgroundColor:
                        darkMode
                            ? "#0f172a"
                            : "#e2e8f0",

                    minHeight: "100vh"
                }}
            >

                {/* TITLE */}

                <div
                    style={{
                        marginBottom: "40px"
                    }}
                >

                    <h1
                        style={{
                            color:
                                darkMode
                                    ? "white"
                                    : "#0f172a",

                            fontSize: "45px"
                        }}
                    >
                        Dashboard Analytics 📊
                    </h1>

                    <p
                        style={{
                            color:
                                darkMode
                                    ? "#cbd5e1"
                                    : "#475569",

                            marginTop: "10px"
                        }}
                    >
                        AI Educational Marketplace Insights
                    </p>

                </div>

                {/* STATS */}

                <div
                    style={{
                        display: "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",

                        gap: "25px",

                        marginBottom: "50px"
                    }}
                >

                    {/* TOTAL APPS */}

                    <div
                        style={{
                            background:
                                "linear-gradient(to right, #2563eb, #1d4ed8)",

                            padding: "30px",

                            borderRadius: "20px",

                            color: "white",

                            boxShadow:
                                "0 8px 20px rgba(0,0,0,0.15)"
                        }}
                    >

                        <h2>Total Apps</h2>

                        <h1
                            style={{
                                fontSize: "55px"
                            }}
                        >
                            {apps.length}
                        </h1>

                    </div>

                    {/* TOTAL REVIEWS */}

                    <div
                        style={{
                            background:
                                "linear-gradient(to right, #7c3aed, #6d28d9)",

                            padding: "30px",

                            borderRadius: "20px",

                            color: "white",

                            boxShadow:
                                "0 8px 20px rgba(0,0,0,0.15)"
                        }}
                    >

                        <h2>Total Reviews</h2>

                        <h1
                            style={{
                                fontSize: "55px"
                            }}
                        >
                            {reviews.length}
                        </h1>

                    </div>

                    {/* POSITIVE */}

                    <div
                        style={{
                            background:
                                "linear-gradient(to right, #16a34a, #15803d)",

                            padding: "30px",

                            borderRadius: "20px",

                            color: "white",

                            boxShadow:
                                "0 8px 20px rgba(0,0,0,0.15)"
                        }}
                    >

                        <h2>Positive Reviews</h2>

                        <h1
                            style={{
                                fontSize: "55px"
                            }}
                        >
                            {positiveReviews}
                        </h1>

                    </div>

                    {/* RATING */}

                    <div
                        style={{
                            background:
                                "linear-gradient(to right, #f59e0b, #d97706)",

                            padding: "30px",

                            borderRadius: "20px",

                            color: "white",

                            boxShadow:
                                "0 8px 20px rgba(0,0,0,0.15)"
                        }}
                    >

                        <h2>Average Rating</h2>

                        <h1
                            style={{
                                fontSize: "55px"
                            }}
                        >
                            ⭐ {averageRating}
                        </h1>

                    </div>

                </div>

                {/* CHARTS */}

                <div
                    style={{
                        display: "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(450px, 1fr))",

                        gap: "30px"
                    }}
                >

                    {/* PIE CHART */}

                    <div
                        style={{
                            backgroundColor:
                                darkMode
                                    ? "#1e293b"
                                    : "white",

                            padding: "30px",

                            borderRadius: "20px",

                            boxShadow:
                                "0 8px 20px rgba(0,0,0,0.1)"
                        }}
                    >

                        <h2
                            style={{
                                color:
                                    darkMode
                                        ? "white"
                                        : "#0f172a",

                                marginBottom: "25px"
                            }}
                        >
                            Review Sentiment Analytics
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={350}
                        >

                            <PieChart>

                                <Pie
                                    data={pieData}

                                    dataKey="value"

                                    nameKey="name"

                                    cx="50%"

                                    cy="50%"

                                    outerRadius={120}

                                    label
                                >

                                    {
                                        pieData.map(
                                            (
                                                entry,
                                                index
                                            ) => (

                                                <Cell
                                                    key={index}

                                                    fill={
                                                        COLORS[
                                                            index
                                                        ]
                                                    }
                                                />
                                            )
                                        )
                                    }

                                </Pie>

                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                    {/* BAR CHART */}

                    <div
                        style={{
                            backgroundColor:
                                darkMode
                                    ? "#1e293b"
                                    : "white",

                            padding: "30px",

                            borderRadius: "20px",

                            boxShadow:
                                "0 8px 20px rgba(0,0,0,0.1)"
                        }}
                    >

                        <h2
                            style={{
                                color:
                                    darkMode
                                        ? "white"
                                        : "#0f172a",

                                marginBottom: "25px"
                            }}
                        >
                            App Category Analytics
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={350}
                        >

                            <BarChart
                                data={categoryData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="category"
                                />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey="apps"

                                    fill="#2563eb"

                                    radius={[
                                        10,
                                        10,
                                        0,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;