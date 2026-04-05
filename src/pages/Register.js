import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [signupCode, setSignupCode] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await axios.post(`${API}/auth/register`, {
        username,
        email,
        phone,
        password,
        signup_code: signupCode,
        address: accountDetails
      });

      setMessageType("success");
      setMessage("Account created successfully. Redirecting to login...");

      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setMessageType("error");
      setMessage(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* INFO PANEL */}
        <div className="flex flex-col justify-between bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 md:p-10 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-3xl font-bold mb-3">Start Growing Today</h2>
            <p className="text-sm mb-4 opacity-90">
              Create your Local Naira Invest account and earn fixed short-term returns safely.
            </p>

            <ul className="space-y-2 text-sm">
              <li>✅ Secure investment system</li>
              <li>✅ Fast withdrawals</li>
              <li>✅ Short-term ROI plans</li>
            </ul>
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/447591683924"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center bg-white text-blue-700 font-semibold py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Need Help? Contact Support
          </a>
        </div>

        {/* REGISTER FORM */}
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto"
        >
          <h1 className="text-2xl font-bold text-center mb-2">
            Create Account
          </h1>

          <p className="text-sm text-gray-600 text-center mb-6">
            Open your investment account in minutes
          </p>

          {message && (
            <p
              className={`text-center mb-4 ${
                messageType === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder=" Use your full name or Signup Code if you have one"
            value={signupCode}
            onChange={e => setSignupCode(e.target.value)}
          />

          <input
            className="w-full mb-4 p-2 border rounded"
            placeholder="Bank Account Name & Number"
            value={accountDetails}
            onChange={e => setAccountDetails(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-2">
              Already registered?
            </p>

            <Link
              to="/login"
              className="inline-block w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-600 hover:text-white transition"
            >
              Go to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
