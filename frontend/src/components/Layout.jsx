import React from "react";

import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

function Layout({ children }) {

  const navigate = useNavigate();

  const location = useLocation();

  // CHECK ADMIN PAGE

  const isAdminPage =
    location.pathname.startsWith("/admin");

  // CHECK AUTH PAGE

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  // DARK MODE

  const darkMode =
    localStorage.getItem("darkMode") === "true";

  // TOGGLE THEME

  const toggleTheme = () => {

    localStorage.setItem(
      "darkMode",
      !darkMode
    );

    window.location.reload();
  };

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (

    <div
      style={{
        minHeight: "100vh",

        backgroundColor:
          darkMode
            ? "#020617"
            : "#f1f5f9",

        color:
          darkMode
            ? "white"
            : "#0f172a"
      }}
    >

      {/* HIDE NAVBAR ON LOGIN/REGISTER */}

      {!isAuthPage && (

        <div
          style={{
            background:
              "linear-gradient(to right,#2563eb,#9333ea)",

            padding: "20px 40px",

            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            flexWrap: "wrap"
          }}
        >

          {/* LOGO */}

          <h1
            style={{
              color: "white",

              fontSize: "38px",

              margin: 0
            }}
          >
            AppVerse AI 🚀
          </h1>

          {/* NAVBAR */}

          <div
            style={{
              display: "flex",

              gap: "15px",

              flexWrap: "wrap",

              alignItems: "center"
            }}
          >

            {/* USER NAVBAR */}

            {!isAdminPage && (
              <>

                <Link
                  to="/"
                  className="nav-btn"
                >
                  Home
                </Link>

                <Link
                  to="/favorites"
                  className="nav-btn"
                >
                  Favorites
                </Link>

                <Link
                  to="/ai-chat"
                  className="nav-btn"
                >
                  AI Chat
                </Link>

                <Link
                  to="/chat-history"
                  className="nav-btn"
                >
                  Chat History
                </Link>

                <Link
                  to="/user-dashboard"
                  className="nav-btn"
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  className="nav-btn"
                >
                  Profile
                </Link>

                <Link
                  to="/support"
                  className="nav-btn"
                >
                  Support
                </Link>

              </>
            )}

            {/* ADMIN NAVBAR */}

            {isAdminPage && (
              <>

                <Link
                  to="/admin"
                  className="nav-btn"
                >
                  Admin Panel
                </Link>

                <Link
                  to="/admin-support"
                  className="nav-btn"
                >
                  Student Support
                </Link>

                <Link
                  to="/admin-feedback"
                  className="nav-btn"
                >
                  Feedback
                </Link>

              </>
            )}

            {/* DARK MODE */}

            <button
              onClick={toggleTheme}
              className="theme-btn"
            >
              {
                darkMode
                  ? "☀ Light"
                  : "🌙 Dark"
              }
            </button>

            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>

          </div>

        </div>
      )}

      {/* PAGE CONTENT */}

      <div
        style={{
          padding: "30px"
        }}
      >
        {children}
      </div>

    </div>
  );
}

export default Layout;