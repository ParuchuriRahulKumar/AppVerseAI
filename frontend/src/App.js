import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// AUTH

import Login from "./pages/Login";
import Register from "./pages/Register";

// USER PAGES

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AIChat from "./pages/AIChat";
import ChatHistory from "./pages/ChatHistory";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import AppDetails from "./pages/AppDetails";

// ADMIN

import AdminPanel from "./pages/AdminPanel";
import AdminSupport from "./pages/AdminSupport";
import AdminFeedback from "./pages/AdminFeedback";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* USER */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Layout>
                <Favorites />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-chat"
          element={
            <ProtectedRoute>
              <Layout>
                <AIChat />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat-history"
          element={
            <ProtectedRoute>
              <Layout>
                <ChatHistory />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <UserDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <Layout>
                <Support />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/app/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <AppDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Layout>
                <AdminPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-support"
          element={
            <ProtectedRoute adminOnly={true}>
              <Layout>
                <AdminSupport />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/admin-feedback" element={<AdminFeedback />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;