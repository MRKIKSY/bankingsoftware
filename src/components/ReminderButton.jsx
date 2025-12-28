// src/components/ReminderButton.jsx
import React, { useState } from "react";
import API from "../api"; // your base API URL

export default function ReminderButton({ token }) {
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReminder = async () => {
    setLoading(true);
    setStatusMsg("");

    try {
      // Call the backend notify-admin route
      const res = await fetch(`${API}/notify-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setStatusMsg(data.message || "Admin notified successfully!");
    } catch (err) {
      console.error(err);
      setStatusMsg("Failed to notify admin. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={handleReminder}
        disabled={loading}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg"
      >
        {loading ? "Sending..." : "I HAVE PAID – Remind Admin"}
      </button>
      {statusMsg && <p className="mt-2 text-sm text-gray-700">{statusMsg}</p>}
    </div>
  );
}
