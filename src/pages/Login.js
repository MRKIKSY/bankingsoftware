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
//         body: JSON.stringify({
//           username: username.trim(),
//           password,
//         }),
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
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
//       <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

//         {/* INFO PANEL */}
//         <div className="flex flex-col justify-between bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 md:p-10 rounded-2xl shadow-xl">

//           <div>
//             <h2 className="text-4xl font-bold mb-4">
//               Grow Your Idle Money
//             </h2>
//             <p className="text-sm mb-6 opacity-90">
//               Local Naira Invest helps you earn fixed short-term returns safely and fast.
//             </p>

//             <ul className="space-y-3 text-sm">
//               <li className="flex items-center gap-2">✅ 7 Days → 7% ROI</li>
//               <li className="flex items-center gap-2">✅ 14 Days → 14% ROI</li>
//               <li className="flex items-center gap-2">✅ 21 Days → 21% ROI</li>
//             </ul>
//           </div>

//           {/* SUPPORT BUTTON */}
//           <a
//             href="https://wa.me/447591683924"
//             target="_blank"
//             rel="noreferrer"
//             className="mt-10 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 transition text-white py-3 rounded-xl font-semibold shadow-lg"
//           >
//             💬 Need Help? Contact Support
//           </a>
//         </div>

//         {/* LOGIN FORM */}
//         <form
//           onSubmit={submit}
//           className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md mx-auto animate-fadeIn"
//         >
//           <h1 className="text-3xl font-bold text-center mb-2">
//             Welcome Back
//           </h1>

//           <p className="text-sm text-gray-600 text-center mb-8">
//             Log in to manage your investments securely
//           </p>

//           {error && (
//             <p className="text-red-500 text-center mb-4">{error}</p>
//           )}

//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUser(e.target.value)}
//               className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
//               required
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPass(e.target.value)}
//               className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
//               required
//             />
//           </div>

//           {/* FORGOT */}
//           <div className="text-right mt-3 mb-6">
//             <Link
//               to="/forgot-password"
//               className="text-sm text-blue-600 hover:underline"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition text-white py-3 rounded-xl font-semibold shadow"
//           >
//             Login Securely
//           </button>

//           {/* REGISTER */}
//           <div className="text-center mt-8">
//             <p className="text-sm text-gray-600 mb-3">
//               New to Local Naira Invest?
//             </p>

//             <Link
//               to="/register"
//               className="inline-block w-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition py-3 rounded-xl font-semibold"
//             >
//               Create an Account
//             </Link>
//           </div>
//           <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-xl text-sm">
//   {/* <p className="font-semibold mb-1">📢 Notice (5th March 2026)</p>
//   <p>
//     We are currently experiencing temporary issues with our WhatsApp Local Naira Invest groups.
//     We will be back shortly. In the meantime, please click the link below to contact support on an alternative number.
//   </p> */}
// </div>

//           {/* MOBILE SUPPORT */}
//           <a
//             href="https://wa.me/2347077513836"
//             target="_blank"
//             rel="noreferrer"
//             className="md:hidden mt-6 flex items-center justify-center gap-2 text-green-600 font-semibold"
//           >
//             💬 Contact Support on WhatsApp
//           </a>
//         </form>
//       </div>
//     </div>
//   );
// }





import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

/* ─── Inline styles & keyframes injected once ─────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lni-root {
    min-height: 100vh;
    display: flex;
    align-items: stretch;
    font-family: 'DM Sans', sans-serif;
    background: #060a12;
    overflow: hidden;
    position: relative;
  }

  /* ── Animated mesh background ── */
  .lni-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }
  .lni-bg::before {
    content: '';
    position: absolute;
    width: 900px; height: 900px;
    border-radius: 50%;
    background: radial-gradient(circle, #1a4fd640 0%, transparent 70%);
    top: -300px; left: -200px;
    animation: drift1 18s ease-in-out infinite alternate;
  }
  .lni-bg::after {
    content: '';
    position: absolute;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, #06b6d420 0%, transparent 70%);
    bottom: -200px; right: -100px;
    animation: drift2 22s ease-in-out infinite alternate;
  }
  .lni-blob3 {
    position: absolute;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, #7c3aed18 0%, transparent 70%);
    top: 40%; left: 30%;
    animation: drift3 15s ease-in-out infinite alternate;
  }

  @keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(60px, 40px) scale(1.1); } }
  @keyframes drift2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-50px,-30px) scale(1.08); } }
  @keyframes drift3 { from { transform: translate(0,0) scale(1); } to { transform: translate(30px,-50px) scale(0.95); } }

  /* Noise grain overlay */
  .lni-grain {
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  /* ── Layout ── */
  .lni-layout {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 0;
    padding: 32px 24px;
  }
  @media (max-width: 768px) {
    .lni-layout { grid-template-columns: 1fr; padding: 24px 16px; }
    .lni-left { display: none; }
  }

  /* ── LEFT PANEL ── */
  .lni-left {
    padding: 48px 40px 48px 24px;
    animation: fadeUp 0.8s ease both;
  }

  .lni-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 52px;
  }
  .lni-brand-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, #2563eb, #06b6d4);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .lni-brand-name {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: #ffffff;
    letter-spacing: -0.3px;
  }
  .lni-brand-name span { color: #38bdf8; }

  .lni-headline {
    font-family: 'Sora', sans-serif;
    font-size: clamp(34px, 4vw, 48px);
    font-weight: 800;
    line-height: 1.1;
    color: #ffffff;
    letter-spacing: -1.5px;
    margin-bottom: 18px;
  }
  .lni-headline em {
    font-style: normal;
    background: linear-gradient(90deg, #38bdf8, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .lni-sub {
    font-size: 15px;
    color: #94a3b8;
    line-height: 1.65;
    margin-bottom: 44px;
    max-width: 340px;
  }

  /* Tier cards */
  .lni-tiers {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 44px;
  }
  .lni-tier {
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 14px 18px;
    transition: border-color 0.2s, background 0.2s;
    cursor: default;
  }
  .lni-tier:hover {
    background: rgba(255,255,255,0.06);
    border-color: rgba(56,189,248,0.3);
  }
  .lni-tier-badge {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    flex-shrink: 0;
  }
  .badge-7  { background: rgba(56,189,248,0.15); color: #38bdf8; }
  .badge-14 { background: rgba(99,102,241,0.15); color: #818cf8; }
  .badge-21 { background: rgba(52,211,153,0.15); color: #34d399; }

  .lni-tier-info { flex: 1; }
  .lni-tier-label {
    font-size: 13px;
    font-weight: 500;
    color: #cbd5e1;
    margin-bottom: 2px;
  }
  .lni-tier-desc { font-size: 11px; color: #64748b; }

  .lni-tier-roi {
    font-family: 'Sora', sans-serif;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }
  .roi-7  { color: #38bdf8; }
  .roi-14 { color: #818cf8; }
  .roi-21 { color: #34d399; }

  /* Support CTA */
  .lni-support {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(37,211,102,0.1);
    border: 1px solid rgba(37,211,102,0.25);
    color: #4ade80;
    padding: 11px 20px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
  }
  .lni-support:hover {
    background: rgba(37,211,102,0.18);
    border-color: rgba(37,211,102,0.4);
  }
  .lni-support-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #4ade80;
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.7); }
  }

  /* ── RIGHT PANEL (form) ── */
  .lni-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: fadeUp 0.8s 0.1s ease both;
  }

  .lni-card {
    width: 100%;
    max-width: 420px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 24px;
    padding: 40px 36px;
    backdrop-filter: blur(20px);
    box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset;
    position: relative;
    overflow: hidden;
  }
  .lni-card::before {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 60%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent);
  }

  /* Mobile brand (hidden on desktop) */
  .lni-mobile-brand {
    display: none;
    text-align: center;
    margin-bottom: 28px;
  }
  @media (max-width: 768px) {
    .lni-mobile-brand { display: block; }
  }
  .lni-mobile-brand .lni-brand-name {
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .lni-card-title {
    font-family: 'Sora', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #f1f5f9;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }
  .lni-card-sub {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 32px;
    line-height: 1.5;
  }

  /* Error */
  .lni-error {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.25);
    color: #f87171;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 13px;
    margin-bottom: 20px;
    animation: shake 0.3s ease;
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  /* Input group */
  .lni-field {
    margin-bottom: 14px;
  }
  .lni-field label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 7px;
  }
  .lni-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .lni-input-icon {
    position: absolute;
    left: 14px;
    color: #475569;
    font-size: 15px;
    pointer-events: none;
    transition: color 0.2s;
  }
  .lni-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 13px 14px 13px 42px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: #f1f5f9;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .lni-input::placeholder { color: #334155; }
  .lni-input:focus {
    border-color: rgba(56,189,248,0.4);
    background: rgba(255,255,255,0.06);
    box-shadow: 0 0 0 3px rgba(56,189,248,0.08);
  }
  .lni-input:focus + .lni-input-icon,
  .lni-input-wrap:focus-within .lni-input-icon { color: #38bdf8; }

  /* Forgot */
  .lni-forgot {
    display: flex;
    justify-content: flex-end;
    margin: 4px 0 24px;
  }
  .lni-forgot a {
    font-size: 12px;
    color: #38bdf8;
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.15s;
  }
  .lni-forgot a:hover { opacity: 1; }

  /* Submit button */
  .lni-btn {
    width: 100%;
    position: relative;
    background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 14px;
    font-size: 14px;
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    letter-spacing: 0.2px;
    cursor: pointer;
    overflow: hidden;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 24px rgba(37,99,235,0.35);
  }
  .lni-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
    pointer-events: none;
  }
  .lni-btn:hover { opacity: 0.92; transform: translateY(-1px); }
  .lni-btn:active { transform: translateY(0); }
  .lni-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .lni-btn-loading {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .lni-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Divider */
  .lni-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0;
  }
  .lni-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
  .lni-divider span { font-size: 11px; color: #334155; letter-spacing: 0.5px; }

  /* Register link */
  .lni-register {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 13px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    color: #94a3b8;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }
  .lni-register:hover {
    background: rgba(255,255,255,0.06);
    border-color: rgba(56,189,248,0.25);
    color: #e2e8f0;
  }
  .lni-register strong { color: #38bdf8; }

  /* Mobile support */
  .lni-mobile-support {
    display: none;
    margin-top: 20px;
  }
  @media (max-width: 768px) { .lni-mobile-support { display: flex; } }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json();
      if (!data.access_token) throw new Error();
      localStorage.setItem("token", data.access_token);
      onLogin(data.access_token);
      navigate("/");
    } catch {
      setErr("Invalid username or password");
    } finally {
      setLoading(false);
    }
  }

  const tiers = [
    { days: "7",  label: "7-Day plan",  desc: "Short sprint, quick gains",  roi: "7%",  badgeCls: "badge-7",  roiCls: "roi-7"  },
    { days: "14", label: "14-Day plan", desc: "Double the time, double the return", roi: "14%", badgeCls: "badge-14", roiCls: "roi-14" },
    { days: "21", label: "21-Day plan", desc: "Maximum returns, maximum growth",    roi: "21%", badgeCls: "badge-21", roiCls: "roi-21" },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="lni-root">
        {/* Background */}
        <div className="lni-bg"><div className="lni-blob3" /></div>
        <div className="lni-grain" />

        <div className="lni-layout">

          {/* ── LEFT PANEL ── */}
          <div className="lni-left">
            <div className="lni-brand">
              <div className="lni-brand-icon">₦</div>
              <div className="lni-brand-name">Local Naira <span>Invest</span></div>
            </div>

            <h1 className="lni-headline">
              Grow your<br />idle money <em>faster.</em>
            </h1>
            <p className="lni-sub">
              Earn fixed short-term returns with transparent plans and
              zero hidden fees. Your money works while you sleep.
            </p>

            <div className="lni-tiers">
              {tiers.map((t) => (
                <div className="lni-tier" key={t.days}>
                  <div className={`lni-tier-badge ${t.badgeCls}`}>{t.days}D</div>
                  <div className="lni-tier-info">
                    <div className="lni-tier-label">{t.label}</div>
                    <div className="lni-tier-desc">{t.desc}</div>
                  </div>
                  <div className={`lni-tier-roi ${t.roiCls}`}>{t.roi}</div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/447591683924"
              target="_blank"
              rel="noreferrer"
              className="lni-support"
            >
              <span className="lni-support-dot" />
              Live support on WhatsApp
            </a>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="lni-right">
            <div className="lni-card">

              {/* Mobile-only brand */}
              <div className="lni-mobile-brand">
                <div className="lni-brand-name">
                  <span style={{ fontSize: 22 }}>₦</span>
                  Local Naira <span>Invest</span>
                </div>
              </div>

              <div className="lni-card-title">Welcome back</div>
              <div className="lni-card-sub">Sign in to manage your investments</div>

              {error && (
                <div className="lni-error">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#f87171" strokeWidth="1.5"/>
                    <path d="M8 5v3.5M8 11h.01" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={submit}>
                <div className="lni-field">
                  <label>Username</label>
                  <div className="lni-input-wrap">
                    <input
                      className="lni-input"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUser(e.target.value)}
                      required
                      autoComplete="username"
                    />
                    <svg className="lni-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>

                <div className="lni-field">
                  <label>Password</label>
                  <div className="lni-input-wrap">
                    <input
                      className="lni-input"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPass(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <svg className="lni-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                </div>

                <div className="lni-forgot">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>

                <button type="submit" className="lni-btn" disabled={loading}>
                  {loading ? (
                    <span className="lni-btn-loading">
                      <span className="lni-spinner" />
                      Signing in…
                    </span>
                  ) : (
                    "Sign In Securely"
                  )}
                </button>
              </form>

              <div className="lni-divider">
                <div className="lni-divider-line" />
                <span>NEW HERE?</span>
                <div className="lni-divider-line" />
              </div>

              <Link to="/register" className="lni-register">
                Create a free account →&nbsp;<strong>Get started</strong>
              </Link>

              {/* Mobile support */}
              <a
                href="https://wa.me/2347077513836"
                target="_blank"
                rel="noreferrer"
                className="lni-support lni-mobile-support"
                style={{ justifyContent: "center" }}
              >
                <span className="lni-support-dot" />
                Contact Support on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}