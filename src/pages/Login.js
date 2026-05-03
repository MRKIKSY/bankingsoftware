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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* INFO PANEL */}
        <div className="flex flex-col justify-between bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 md:p-10 rounded-2xl shadow-xl">

          <div>
            <h2 className="text-4xl font-bold mb-4">
              Grow Your Idle Money
            </h2>
            <p className="text-sm mb-6 opacity-90">
              Local Naira Invest helps you earn fixed short-term returns safely and fast.
            </p>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">✅ 7 Days → 7% ROI</li>
              <li className="flex items-center gap-2">✅ 14 Days → 14% ROI</li>
              <li className="flex items-center gap-2">✅ 21 Days → 21% ROI</li>
            </ul>
          </div>

          {/* SUPPORT BUTTON */}
          <a
            href="https://wa.me/447591683924"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 transition text-white py-3 rounded-xl font-semibold shadow-lg"
          >
            💬 Need Help? Contact Support
          </a>
        </div>

        {/* LOGIN FORM */}
        <form
          onSubmit={submit}
          className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md mx-auto animate-fadeIn"
        >
          <h1 className="text-3xl font-bold text-center mb-2">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-600 text-center mb-8">
            Log in to manage your investments securely
          </p>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          {/* FORGOT */}
          <div className="text-right mt-3 mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition text-white py-3 rounded-xl font-semibold shadow"
          >
            Login Securely
          </button>

          {/* REGISTER */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-3">
              New to Local Naira Invest?
            </p>

            <Link
              to="/register"
              className="inline-block w-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition py-3 rounded-xl font-semibold"
            >
              Create an Account
            </Link>
          </div>

          {/* MOBILE SUPPORT */}
          <a
            href="https://wa.me/2347077513836"
            target="_blank"
            rel="noreferrer"
            className="md:hidden mt-6 flex items-center justify-center gap-2 text-green-600 font-semibold"
          >
            💬 Contact Support on WhatsApp
          </a>
        </form>
      </div>
    </div>
  );
}
