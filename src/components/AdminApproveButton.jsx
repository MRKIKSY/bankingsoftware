import React, { useState } from "react";

export default function AdminApproveButton({ onApprove, label = "Approve" }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await onApprove(); // must return a Promise
      alert("Approved successfully. Email notification sent.");
    } catch (err) {
      console.error(err);
      alert("Approval failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
