import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");


    try {
      const response = await axios.post("https://bankingsoftwarebackend.onrender.com", {
        username,
        email,
        password,
        address: accountDetails,
      });

      if (response.status === 200 || response.status === 201) {
        setMessageType("success");
        setMessage("Account created successfully. You can now log in.");

        setUsername("");
        setEmail("");
        setPassword("");
        setAccountDetails("");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setMessageType("error");
      setMessage(
        error.response?.data?.detail || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Register
        </h2>

        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              messageType === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Bank Account Name & Number"
            value={accountDetails}
            onChange={(e) => setAccountDetails(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* 🔹 LOGIN BUTTON (THIS WILL SHOW) */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Already have an account?
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-600 hover:text-white transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
