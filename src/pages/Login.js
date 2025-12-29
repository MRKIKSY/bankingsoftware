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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Secure Login</h1>

        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUser(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
          Login
        </button>

        {/* REGISTER LINK */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Don’t have an account?
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
  );
}
