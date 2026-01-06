import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import API from "./api";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasswordOTP from "./pages/ResetPasswordOTP";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import PaystackSuccess from "./pages/PaystackSuccess";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  // ======================
  // FETCH CURRENT USER
  // ======================
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then((user) => {
        setMe(user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        setMe(null);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <Routes>
      {/* ===================== */}
      {/* PUBLIC ROUTES (ALWAYS AVAILABLE) */}
      {/* ===================== */}
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <Login onLogin={setToken} />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/" replace /> : <Register />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password-otp" element={<ResetPasswordOTP />} />

      {/* ===================== */}
      {/* PROTECTED ROUTES */}
      {/* ===================== */}
      <Route
        path="/"
        element={
          token && me ? (
            <>
              <header className="text-center mt-6 text-sm text-gray-500">
                Logged in as <b>{me.username}</b> ({me.is_admin ? "Admin" : "User"})
                <button
                  className="ml-3 text-blue-600 underline"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken(null);
                    setMe(null);
                  }}
                >
                  Logout
                </button>
              </header>

              <Dashboard token={token} user={me} />
              {me.is_admin && <AdminPage token={token} />}
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/paystack-success"
        element={token ? <PaystackSuccess token={token} /> : <Navigate to="/login" />}
      />

      {/* ===================== */}
      {/* FALLBACK */}
      {/* ===================== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
