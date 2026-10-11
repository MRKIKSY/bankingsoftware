// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../api";

// export default function Register() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [signupCode, setSignupCode] = useState("");
//   const [accountDetails, setAccountDetails] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     setMessageType("");

//     try {
//       const res = await axios.post(`${API}/auth/register`, {
//         username,
//         email,
//         phone,
//         password,
//         signup_code: signupCode,
//         address: accountDetails
//       });

//       setMessageType("success");
//       setMessage("Account created successfully. Redirecting to login...");

//       setTimeout(() => navigate("/login"), 1800);
//     } catch (err) {
//       setMessageType("error");
//       setMessage(err.response?.data?.detail || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

//         {/* INFO PANEL */}
//         <div className="flex flex-col justify-between bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 md:p-10 rounded-2xl shadow-xl">
//           <div>
//             <h2 className="text-3xl font-bold mb-3">Start Growing Today</h2>
//             <p className="text-sm mb-4 opacity-90">
//               Create your Local Naira Invest account and earn fixed short-term returns safely.
//             </p>

//             <ul className="space-y-2 text-sm">
//               <li>✅ Secure investment system</li>
//               <li>✅ Fast withdrawals</li>
//               <li>✅ Short-term ROI plans</li>
//             </ul>
//           </div>

//           {/* WhatsApp */}
//           <a
//             href="https://wa.me/447591683924"
//             target="_blank"
//             rel="noreferrer"
//             className="mt-6 inline-flex items-center justify-center bg-white text-blue-700 font-semibold py-2 rounded-lg hover:bg-gray-100 transition"
//           >
//             Need Help? Contact Support
//           </a>
//         </div>

//         {/* REGISTER FORM */}
//         <form
//           onSubmit={handleRegister}
//           className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto"
//         >
//           <h1 className="text-2xl font-bold text-center mb-2">
//             Create Account
//           </h1>

//           <p className="text-sm text-gray-600 text-center mb-6">
//             Open your investment account in minutes
//           </p>

//           {message && (
//             <p
//               className={`text-center mb-4 ${
//                 messageType === "success"
//                   ? "text-green-600"
//                   : "text-red-600"
//               }`}
//             >
//               {message}
//             </p>
//           )}

//           <input
//             className="w-full mb-3 p-2 border rounded"
//             placeholder="Username"
//             value={username}
//             onChange={e => setUsername(e.target.value)}
//             required
//           />

//           <input
//             className="w-full mb-3 p-2 border rounded"
//             placeholder="Email"
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//           />

//           <input
//             className="w-full mb-3 p-2 border rounded"
//             placeholder="Phone Number"
//             value={phone}
//             onChange={e => setPhone(e.target.value)}
//             required
//           />

//           <input
//             className="w-full mb-3 p-2 border rounded"
//             placeholder="Password"
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />

//           <input
//             className="w-full mb-3 p-2 border rounded"
//             placeholder=" Use your full name or Signup Code if you have one"
//             value={signupCode}
//             onChange={e => setSignupCode(e.target.value)}
//           />

//           <input
//             className="w-full mb-4 p-2 border rounded"
//             placeholder="Bank Account Name & Number"
//             value={accountDetails}
//             onChange={e => setAccountDetails(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>

//           <div className="text-center mt-6">
//             <p className="text-sm text-gray-600 mb-2">
//               Already registered?
//             </p>

//             <Link
//               to="/login"
//               className="inline-block w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-600 hover:text-white transition"
//             >
//               Go to Login
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signupCode, setSignupCode] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (username.trim().length < 3) return "Username must be at least 3 characters.";
    if (/\s/.test(username.trim())) return "Username cannot contain spaces.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Please enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 10) return "Please enter a valid phone number.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    if (accountDetails.trim().length < 6) return "Please enter your bank, account name and number.";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;
    setMessage("");
    setMessageType("");

    const problem = validate();
    if (problem) {
      setMessageType("error");
      setMessage(problem);
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/auth/register`, {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password,
        signup_code: signupCode.trim(),
        address: accountDetails.trim()
      });

      setMessageType("success");
      setMessage("Account created successfully. Redirecting to login...");

      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      const detail = err.response?.data?.detail;
      setMessageType("error");
      setMessage(
        typeof detail === "string"
          ? detail
          : Array.isArray(detail) && detail[0]?.msg
            ? detail[0].msg
            : !err.response
              ? "Can't reach the server. Check your internet connection and try again."
              : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
  const labelClass = "block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* INFO PANEL */}
        <div className="flex flex-col justify-between bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 md:p-10 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-3xl font-bold mb-3">Start Growing Today</h2>
            <p className="text-sm mb-6 opacity-90">
              Create your Local Naira Invest account and earn fixed short-term returns safely.
            </p>

            <ul className="space-y-2 text-sm mb-6">
              <li>✅ Secure investment system</li>
              <li>✅ Fast withdrawals</li>
              <li>✅ Simple 21-day plan</li>
            </ul>

            {/* Plan */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-w-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">21-Day plan</p>
                  <p className="text-xs opacity-80">Fixed interest paid at the end of 21 days</p>
                </div>
                <span className="text-2xl font-bold">0.2%</span>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/447591683924"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center bg-white text-blue-700 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-100 transition text-sm"
            >
              Need Help? Contact Support
            </a>
            <a
              href="https://chat.whatsapp.com/FlEbs5oAwAfJOPtgeq0m9l?s=cl&p=i&mlu=0&ilr=4&iam=2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center bg-green-500 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-green-600 transition text-sm"
            >
              Join community of investors on WhatsApp
            </a>
          </div>
        </div>

        {/* REGISTER FORM */}
        <form
          onSubmit={handleRegister}
          noValidate
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
              role={messageType === "error" ? "alert" : "status"}
              className={`text-sm text-center mb-4 p-3 rounded-lg ${
                messageType === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </p>
          )}

          <div className="space-y-3">
            <div>
              <label htmlFor="reg-username" className={labelClass}>Username</label>
              <input
                id="reg-username"
                className={inputClass}
                placeholder="Choose a username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                required
              />
            </div>

            <div>
              <label htmlFor="reg-email" className={labelClass}>Email</label>
              <input
                id="reg-email"
                className={inputClass}
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="reg-phone" className={labelClass}>Phone Number</label>
              <input
                id="reg-phone"
                className={inputClass}
                placeholder="e.g. 0803 123 4567"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                autoComplete="tel"
                required
              />
            </div>

            <div>
              <label htmlFor="reg-password" className={labelClass}>Password</label>
              <div className="relative">
                <input
                  id="reg-password"
                  className={`${inputClass} pr-16`}
                  placeholder="At least 8 characters"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 px-2 py-1 rounded hover:bg-blue-50"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="reg-confirm" className={labelClass}>Confirm Password</label>
              <input
                id="reg-confirm"
                className={inputClass}
                placeholder="Re-enter your password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <div>
              <label htmlFor="reg-code" className={labelClass}>
                Full Name or Signup Code <span className="normal-case font-normal text-gray-400">(optional)</span>
              </label>
              <input
                id="reg-code"
                className={inputClass}
                placeholder="Use your full name or Signup Code if you have one"
                value={signupCode}
                onChange={e => setSignupCode(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="reg-bank" className={labelClass}>Bank Account</label>
              <input
                id="reg-bank"
                className={inputClass}
                placeholder="Bank, Account Name & Number"
                value={accountDetails}
                onChange={e => setAccountDetails(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Withdrawals are paid to this account.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-2">
              Already registered?
            </p>

            <Link
              to="/login"
              className="inline-block w-full border border-blue-600 text-blue-600 py-2.5 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Go to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}