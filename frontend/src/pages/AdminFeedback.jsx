import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminFeedback = () => {

  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  // FETCH SOLVED MESSAGES
  const fetchMessages = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/support/solved"
      );

      setMessages(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE MESSAGE
  const deleteMessage = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/support/${id}`
      );

      fetchMessages();

    } catch (error) {

      console.log(error);

    }
  };

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#020b3d",
        color: "white",
      }}
    >

      {/* TOP NAVBAR */}
      <div
        style={{
          background:
            "linear-gradient(90deg,#2563eb,#9333ea)",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        {/* LOGO */}
        <h1
          style={{
            fontSize: "45px",
            fontWeight: "700",
          }}
        >
          AppVerse AI 🚀
        </h1>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >

          <Link to="/admin">
            <button style={buttonStyle}>
              Admin Panel
            </button>
          </Link>

          <Link to="/admin-support">
            <button style={buttonStyle}>
              Student Support
            </button>
          </Link>

          <button
            style={{
              ...buttonStyle,
              background: "#facc15",
              color: "black",
            }}
          >
            ☀ Light
          </button>

          <button
            onClick={handleLogout}
            style={{
              ...buttonStyle,
              background: "#ef4444",
            }}
          >
            Logout
          </button>

        </div>

      </div>

      {/* PAGE CONTENT */}
      <div style={{ padding: "40px" }}>

        {/* HEADER */}
        <div
          style={{
            background:
              "linear-gradient(90deg,#2563eb,#7c3aed)",
            padding: "45px",
            borderRadius: "30px",
            marginBottom: "40px",
          }}
        >

          <h1
            style={{
              fontSize: "55px",
              marginBottom: "15px",
            }}
          >
            📩 Student Support Messages
          </h1>

          <p
            style={{
              fontSize: "18px",
            }}
          >
            Solved student support requests.
          </p>

        </div>

        {/* EMPTY */}
        {messages.length === 0 ? (

          <div
            style={{
              background: "#18244d",
              padding: "25px",
              borderRadius: "20px",
              fontSize: "18px",
            }}
          >
            No messages available.
          </div>

        ) : (

          messages.map((msg) => (

            <div
              key={msg.id}
              style={{
                background: "#18244d",
                padding: "30px",
                borderRadius: "24px",
                marginBottom: "25px",
              }}
            >

              {/* NAME */}
              <h2
                style={{
                  marginBottom: "10px",
                  fontSize: "32px",
                }}
              >
                👤 {msg.name}
              </h2>

              {/* EMAIL */}
              <p
                style={{
                  marginBottom: "20px",
                  color: "#cbd5e1",
                  fontSize: "17px",
                }}
              >
                📧 {msg.email}
              </p>

              {/* SHORT MESSAGE */}
              <div
                style={{
                  background: "#0f172a",
                  padding: "20px",
                  borderRadius: "14px",
                  marginBottom: "20px",
                }}
              >

                <p
                  style={{
                    fontSize: "18px",
                  }}
                >
                  <strong>Subject:</strong>{" "}
                  {msg.message.substring(0, 40)}...
                </p>

              </div>

              {/* STATUS */}
              <div
                style={{
                  display: "inline-block",
                  background: "#16a34a",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                ✓ SOLVED
              </div>

              <br />

              {/* BUTTONS */}
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginTop: "10px",
                }}
              >

                {/* VIEW BUTTON */}
                <button
                  onClick={() => setSelectedMessage(msg)}
                  style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "12px 22px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  👁 View Message
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteMessage(msg.id)}
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "12px 22px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* MESSAGE POPUP */}
      {selectedMessage && (

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <div
            style={{
              background: "#18244d",
              padding: "40px",
              borderRadius: "25px",
              width: "600px",
            }}
          >

            <h2
              style={{
                marginBottom: "20px",
                fontSize: "35px",
              }}
            >
              👤 {selectedMessage.name}
            </h2>

            <p
              style={{
                marginBottom: "20px",
                color: "#cbd5e1",
              }}
            >
              📧 {selectedMessage.email}
            </p>

            <div
              style={{
                background: "#0f172a",
                padding: "20px",
                borderRadius: "14px",
                marginBottom: "20px",
              }}
            >

              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.8",
                }}
              >
                {selectedMessage.message}
              </p>

            </div>

            <button
              onClick={() => setSelectedMessage(null)}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "12px 22px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );
};

// BUTTON STYLE
const buttonStyle = {
  background: "rgba(255,255,255,0.15)",
  color: "white",
  border: "none",
  padding: "12px 22px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "15px",
};

export default AdminFeedback;