import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [apps, setApps] = useState([]);

  const [stats, setStats] = useState({
    students: 0,
    apps: 0,
    reviews: 0,
  });

  const [newApp, setNewApp] = useState({
    name: "",
    description: "",
    category: "",
    rating: "",
    imageUrl: "",
    websiteUrl: "",
    downloadUrl: "",
  });

  useEffect(() => {
    fetchApps();
    fetchStats();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/apps");
      setApps(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/stats"
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNewApp({
      ...newApp,
      [e.target.name]: e.target.value,
    });
  };

  const addApp = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/apps",
        newApp
      );

      setNewApp({
        name: "",
        description: "",
        category: "",
        rating: "",
        imageUrl: "",
        websiteUrl: "",
        downloadUrl: "",
      });

      fetchApps();
      fetchStats();

      alert("App Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteApp = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/apps/${id}`);

      fetchApps();
      fetchStats();

      alert("App Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        background: "#020c3b",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* NAVBAR */}

      
      

      {/* HERO SECTION */}

      <div
        style={{
          margin: "40px",
          padding: "50px",
          borderRadius: "30px",
          background: "linear-gradient(90deg,#ef4444,#9333ea)",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "10px",
          }}
        >
          🛠️ Admin Dashboard
        </h1>

        <p
          style={{
            fontSize: "20px",
          }}
        >
          Manage apps, students, reviews and support.
        </p>
      </div>

      {/* STATS */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          margin: "40px",
        }}
      >
        <div style={cardStyle}>
          <h1>👨‍🎓</h1>
          <h2>{stats.students}</h2>
          <p>Total Students</p>
        </div>

        <div style={cardStyle}>
          <h1>🤖</h1>
          <h2>{stats.apps}</h2>
          <p>Total Apps</p>
        </div>

        <div style={cardStyle}>
          <h1>⭐</h1>
          <h2>{stats.reviews}</h2>
          <p>Total Reviews</p>
        </div>
      </div>

      {/* ADD APP */}

      <div
        style={{
          margin: "40px",
          background: "#162447",
          padding: "30px",
          borderRadius: "25px",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
          }}
        >
          ➕ Add New App
        </h2>

        <form onSubmit={addApp}>
          <input
            type="text"
            name="name"
            placeholder="App Name"
            value={newApp.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={newApp.description}
            onChange={handleChange}
            required
            style={{
              ...inputStyle,
              height: "120px",
            }}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newApp.category}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={newApp.rating}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={newApp.imageUrl}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="websiteUrl"
            placeholder="Website URL"
            value={newApp.websiteUrl}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="downloadUrl"
            placeholder="Download URL"
            value={newApp.downloadUrl}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button style={addBtn}>
            Add App
          </button>
        </form>
      </div>

      {/* APP LIST */}

      <div
        style={{
          margin: "40px",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
          }}
        >
          📱 All Apps
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
          }}
        >
          {apps.map((app) => (
            <div
              key={app.id}
              style={{
                background: "#162447",
                padding: "20px",
                borderRadius: "20px",
              }}
            >
              <img
                src={app.imageUrl}
                alt={app.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />

              <h2
                style={{
                  marginTop: "15px",
                }}
              >
                {app.name}
              </h2>

              <p>{app.description}</p>

              <div
                style={{
                  marginTop: "10px",
                }}
              >
                ⭐ {app.rating}
              </div>

              <button
                onClick={() => deleteApp(app.id)}
                style={{
                  marginTop: "20px",
                  background: "#ef4444",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Delete App
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const navBtn = {
  textDecoration: "none",
  background: "rgba(255,255,255,0.15)",
  color: "white",
  padding: "12px 20px",
  borderRadius: "12px",
  fontWeight: "bold",
};

const logoutBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
};

const cardStyle = {
  flex: 1,
  minWidth: "220px",
  background: "#162447",
  padding: "30px",
  borderRadius: "20px",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
};

const addBtn = {
  background: "linear-gradient(90deg,#2563eb,#9333ea)",
  color: "white",
  border: "none",
  padding: "15px 30px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

export default AdminPanel;