import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../api";

export default function PaystackSuccess({ token }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Verifying payment...");

  useEffect(() => {
    const reference = params.get("reference");
    if (!reference) {
      setMsg("Invalid payment reference");
      return;
    }

    async function verifyPayment() {
      try {
        const res = await fetch(`${API}/pay/verify/${reference}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setMsg("Payment successful! Updating balance...");
          setTimeout(() => navigate("/dashboard"), 2000);
        } else {
          setMsg(data.error || "Payment verification failed");
        }
      } catch {
        setMsg("Verification error");
      }
    }

    verifyPayment();
  }, [params, navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h2 className="text-xl font-bold mb-4">Paystack Payment</h2>
        <p>{msg}</p>
      </div>
    </div>
  );
}
