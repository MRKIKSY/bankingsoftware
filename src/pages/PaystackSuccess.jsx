import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../api";

export default function PaystackSuccess({ token }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const reference = params.get("reference");
    if (!reference) {
      navigate("/dashboard");
      return;
    }

    async function verify() {
      try {
        await fetch(`${API}/pay/verify/${reference}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (err) {
        console.error("Verification failed", err);
      } finally {
        // ALWAYS return user to dashboard
        navigate("/dashboard");
      }
    }

    verify();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">
        Verifying payment, please wait…
      </p>
    </div>
  );
}
