// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../api";

// export default function Login({ onLogin }) {
//   const navigate = useNavigate();
//   const [username, setUser] = useState("");
//   const [password, setPass] = useState("");
//   const [error, setErr] = useState("");

//   async function submit(e) {
//     e.preventDefault();
//     setErr("");

//     try {
//       const res = await fetch(`${API}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password })
//       });

//       const data = await res.json();
//       if (!data.access_token) throw new Error();

//       localStorage.setItem("token", data.access_token);
//       onLogin(data.access_token);
//       navigate("/");
//     } catch {
//       setErr("Invalid username or password");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={submit}
//         className="bg-white p-8 rounded-xl shadow w-full max-w-md"
//       >
//         <h1 className="text-2xl font-bold mb-4 text-center">Secure Login</h1>

//         {error && (
//           <p className="text-red-500 text-center mb-3">{error}</p>
//         )}

//         <input
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUser(e.target.value)}
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPass(e.target.value)}
//           className="w-full mb-4 p-2 border rounded"
//           required
//         />

//         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
//           Login
//         </button>

//         {/* REGISTER LINK */}
//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-600 mb-2">
//             Don’t have an account?
//           </p>
//           <Link
//             to="/register"
//             className="inline-block w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded font-semibold transition"
//           >
//             Create an Account
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }

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
        headers: {
          "Content-Type": "application/json",
        },
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
    } catch (err) {
      setErr("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* INVESTOR INFO */}
        <div className="flex flex-col justify-center bg-blue-600 text-white p-6 md:p-8 rounded-xl shadow">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Put Your Idle Money to Work
          </h2>

          <p className="text-sm mb-4 opacity-90">
            Local Naira Invest is a short-term investment platform designed
            to help you grow unused funds with clear, fixed returns.
            No long lock-ins. No complex processes.
          </p>

          <ul className="space-y-2 text-sm">
            <li>✅ 7 Days → 7% Return</li>
            <li>✅ 14 Days → 14% Return</li>
            <li>✅ 21 Days → 21% Return</li>
          </ul>

          <p className="mt-4 text-xs opacity-80">
            Simple. Secure. Transparent.
          </p>
        </div>

        {/* LOGIN FORM */}
        <form
          onSubmit={submit}
          className="bg-white p-8 rounded-xl shadow w-full max-w-md mx-auto"
        >
          <h1 className="text-2xl font-bold mb-2 text-center">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-600 text-center mb-6">
            Log in to manage your investments and track your returns
          </p>

          {error && (
            <p className="text-red-500 text-center mb-3">{error}</p>
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            inputMode="text"
            className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
          >
            Login Securely
          </button>
          <div className="text-right mb-4">
  <Link
    to="/forgot-password"
    className="text-sm text-blue-600 hover:underline"
  >
    Forgot password?
  </Link>
</div>


          {/* REGISTER LINK */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-2">
              New to Local Naira Invest?
            </p>
            <Link
              to="/register"
              className="inline-block w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded font-semibold transition"
            >
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
