import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import API from "./api";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import PaystackSuccess from "./pages/PaystackSuccess";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then(user => {
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

  if (loading || (token && !me)) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/login" element={<Login onLogin={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          {/* ✅ DASHBOARD */}
          <Route
            path="/"
            element={
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
            }
          />

          {/* ✅ PAYSTACK CALLBACK ROUTE */}
          <Route
            path="/paystack-success"
            element={<PaystackSuccess token={token} />}
          />

          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

        </>
        
      )}
    </Routes>
  );
}
