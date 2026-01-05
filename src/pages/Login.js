import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await res.json();
      if (!data.access_token) throw new Error();

      localStorage.setItem("token", data.access_token);
      onLogin(data.access_token);
      navigate("/");
    } catch {
      setErr("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* INFO PANEL */}
        <div className="flex flex-col justify-center bg-blue-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold mb-3">
            Put Your Idle Money to Work
          </h2>
          <p className="text-sm mb-4 opacity-90">
            Local Naira Invest helps grow unused funds with fixed short-term returns.
          </p>
          <ul className="space-y-2 text-sm">
            <li>✅ 7 Days → 7%</li>
            <li>✅ 14 Days → 14%</li>
            <li>✅ 21 Days → 21%</li>
          </ul>
        </div>

        {/* LOGIN FORM */}
        <form
          onSubmit={submit}
          className="bg-white p-8 rounded-xl shadow w-full max-w-md mx-auto"
        >
          <h1 className="text-2xl font-bold text-center mb-2">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-600 text-center mb-6">
            Log in to manage your investments
          </p>

          {error && (
            <p className="text-red-500 text-center mb-3">{error}</p>
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            required
          />

          {/* 👇 FORGOT PASSWORD LINK */}
          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
          >
            Login Securely
          </button>

          {/* REGISTER */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-2">
              New to Local Naira Invest?
            </p>
            <Link
              to="/register"
              className="inline-block w-full border border-blue-600 text-blue-600 py-2 rounded"
            >
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
