import React, { useState, useEffect } from "react";
import API from "../api";

export default function MoveBalance({ token, balance, onClose, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [days, setDays] = useState(7);
  const [percent, setPercent] = useState(7);
  const [returnAmount, setReturnAmount] = useState(0);
  const [maturity, setMaturity] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!amount || Number(amount) <= 0) {
      setReturnAmount(0);
      setMaturity(null);
      return;
    }

    const roi = (Number(amount) * percent) / 100;
    setReturnAmount(Number(amount) + roi);

    const mDate = new Date();
    mDate.setDate(mDate.getDate() + days);
    setMaturity(mDate);
  }, [amount, days, percent]);

  async function moveBalance() {
    setMsg("");

    if (!amount || Number(amount) <= 0) {
      return setMsg("Enter a valid amount");
    }

    if (Number(amount) > balance) {
      return setMsg("Amount exceeds available balance");
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/invest`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: Number(amount),
          days,
          percent
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setMsg(data.error || "Investment failed");
      }

      setLoading(false);
      onSuccess();
      onClose();
    } catch (err) {
      setLoading(false);
      setMsg("Network error");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          Create Investment
        </h2>

        <p className="text-sm mb-2">
          Available Balance: ₦{balance.toLocaleString()}
        </p>

        <input
          type="number"
          className="border w-full p-2 mb-3"
          placeholder="Amount to invest"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <select
          className="border w-full p-2 mb-3"
          value={days}
          onChange={e => {
            const d = Number(e.target.value);
            setDays(d);
            setPercent(d);
          }}
        >
          <option value={7}>7 Days — 7%</option>
          <option value={14}>14 Days — 14%</option>
          <option value={21}>21 Days — 21%</option>
        </select>

        {amount && maturity && (
          <div className="text-sm bg-gray-100 p-3 rounded mb-3">
            <p>
              Expected Return: ₦{returnAmount.toLocaleString()}
            </p>
            <p>
              Matures On: {maturity.toLocaleString()}
            </p>
          </div>
        )}

        <button
          onClick={moveBalance}
          disabled={loading}
          className="w-full bg-indigo-700 text-white py-3 rounded disabled:opacity-50"
        >
          {loading ? "Processing..." : "Create Investment"}
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
