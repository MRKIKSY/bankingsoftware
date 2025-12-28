import React, { useState } from "react";
import API from "../api";

export default function Pay({ token, amount, days, percent, onClose }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function startPayment() {
    try {
      setLoading(true);
      setMsg("");

      const res = await fetch(`${API}/pay/init`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: Number(amount),
          days: Number(days),
          percent: Number(percent)
        })
      });

      const data = await res.json();

      if (!data.authorization_url) {
        setMsg("Payment initialization failed");
        setLoading(false);
        return;
      }

      window.open(data.authorization_url, "_blank", "noopener,noreferrer");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMsg("Payment error");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow max-w-sm w-full">
        <h2 className="text-lg font-bold mb-3">Confirm Investment</h2>

        <p>Amount: ₦{Number(amount).toLocaleString()}</p>
        <p>Duration: {days} days</p>
        <p>Return: {percent}%</p>

        <button
          disabled={loading}
          onClick={startPayment}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold mt-4"
        >
          {loading ? "Processing..." : "Pay with Paystack"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-600"
        >
          Cancel
        </button>

        {msg && <p className="text-red-600 mt-3">{msg}</p>}
      </div>
    </div>
  );
}
