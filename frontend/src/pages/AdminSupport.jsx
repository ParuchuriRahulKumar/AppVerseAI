import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminSupport = () => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  // FETCH UNSOLVED SUPPORT REQUESTS
  const fetchMessages = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/support"
      );

      setMessages(response.data);

    } catch (error) {

      console.log("Error fetching support messages:", error);

    }
  };

  // MARK AS SOLVED
  const markAsSolved = async (id) => {

    try {

      await axios.put(
        `http://localhost:8080/api/support/solve/${id}`
      );

      fetchMessages();

    } catch (error) {

      console.log("Error updating support message:", error);

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

      console.log("Error deleting support message:", error);

    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#020b3d",
        padding: "40px",
        color: "white",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          background:
            "linear-gradient(90deg,#ef4444,#7c3aed)",
          padding: "45px",
          borderRadius: "30px",
          marginBottom: "40px",
        }}
      >

        <h1
          style={{
            fontSize: "52px",
            marginBottom: "15px",
            fontWeight: "700",
          }}
        >
          🛠 Admin Support Panel
        </h1>

        <p
          style={{
            fontSize: "18px",
            opacity: 0.9,
          }}
        >
          Manage user support requests and issues.
        </p>

      </div>

      {/* EMPTY MESSAGE */}
      {messages.length === 0 ? (

        <div
          style={{
            background: "#18244d",
            padding: "25px",
            borderRadius: "20px",
            fontSize: "18px",
          }}
        >
          No Support Requests
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
                fontSize: "30px",
              }}
            >
              👤 {msg.name}
            </h2>

            {/* EMAIL */}
            <p
              style={{
                marginBottom: "10px",
                color: "#cbd5e1",
                fontSize: "17px",
              }}
            >
              📧 {msg.email}
            </p>

            {/* MESSAGE */}
            <div
              style={{
                background: "#0f172a",
                padding: "18px",
                borderRadius: "14px",
                marginTop: "15px",
                marginBottom: "20px",
              }}
            >

              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.6",
                }}
              >
                <strong>Subject:</strong> {msg.message}
              </p>

            </div>

            {/* STATUS */}
            <div
              style={{
                display: "inline-block",
                background: "#dc2626",
                color: "white",
                padding: "10px 18px",
                borderRadius: "999px",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              ⏳ UNSOLVED
            </div>

            <br />

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "15px",
              }}
            >

              {/* SOLVE BUTTON */}
              <button
                onClick={() => markAsSolved(msg.id)}
                style={{
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "15px",
                }}
              >
                ✓ Mark Solved
              </button>

              {/* DELETE BUTTON */}
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
                  fontSize: "15px",
                }}
              >
                🗑 Delete
              </button>

            </div>

          </div>

        ))

      )}

    </div>

  );
};

export default AdminSupport;