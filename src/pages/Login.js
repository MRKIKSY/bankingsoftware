



// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../api";

// /* ─── Inline styles & keyframes injected once ─────────────────────── */
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   .lni-root {
//     --bg: #F6F9F7;
//     --surface: #FFFFFF;
//     --surface-muted: #F1F6F4;
//     --border: #E2E9E5;
//     --border-strong: #C9D8D1;
//     --ink: #111E1A;
//     --ink-soft: #57685F;
//     --ink-faint: #8FA39B;
//     --teal-900: #0B4A42;
//     --teal-700: #0E6B5F;
//     --teal-600: #128270;
//     --mint-500: #28B894;
//     --mint-200: #D6EFE6;
//     --mint-100: #ECF8F2;
//     --danger: #B5453A;
//     --danger-bg: #FBEAE7;
//     --danger-border: #F1CCC5;
//     --font-display: 'Space Grotesk', sans-serif;
//     --font-body: 'Inter', sans-serif;
//     --font-mono: 'IBM Plex Mono', monospace;

//     min-height: 100vh;
//     display: flex;
//     align-items: stretch;
//     font-family: var(--font-body);
//     background: var(--bg);
//     overflow: hidden;
//     position: relative;
//   }

//   /* ── Ambient background — one calm halo, no drift, no grain ── */
//   .lni-bg {
//     position: fixed;
//     inset: 0;
//     z-index: 0;
//     overflow: hidden;
//   }
//   .lni-bg::before {
//     content: '';
//     position: absolute;
//     width: 760px; height: 760px;
//     border-radius: 50%;
//     background: radial-gradient(circle, var(--mint-100) 0%, transparent 70%);
//     top: -280px; right: -220px;
//     opacity: 0.9;
//   }
//   .lni-bg::after {
//     content: '';
//     position: absolute;
//     width: 520px; height: 520px;
//     border-radius: 50%;
//     background: radial-gradient(circle, #E8F3EE 0%, transparent 72%);
//     bottom: -200px; left: -160px;
//   }
//   .lni-blob3 { display: none; }

//   /* Faint dot grid instead of grain — quiet, technical texture */
//   .lni-grain {
//     position: fixed;
//     inset: 0;
//     z-index: 1;
//     pointer-events: none;
//     opacity: 0.5;
//     background-image: radial-gradient(circle, #C9D8D1 1px, transparent 1px);
//     background-size: 28px 28px;
//     -webkit-mask-image: radial-gradient(circle at 50% 35%, #000 0%, transparent 65%);
//             mask-image: radial-gradient(circle at 50% 35%, #000 0%, transparent 65%);
//   }

//   /* ── Layout ── */
//   .lni-layout {
//     position: relative;
//     z-index: 2;
//     width: 100%;
//     max-width: 1120px;
//     margin: 0 auto;
//     display: grid;
//     grid-template-columns: 1.05fr 0.95fr;
//     align-items: center;
//     gap: 0;
//     padding: 32px 24px;
//   }
//   @media (max-width: 768px) {
//     .lni-layout { grid-template-columns: 1fr; padding: 24px 16px; gap: 4px; }
//     .lni-left { padding: 4px 0 0; text-align: center; }
//     .lni-left .lni-brand { justify-content: center; margin-bottom: 28px; }
//     .lni-headline { font-size: clamp(28px, 8vw, 36px); max-width: 380px; margin: 0 auto 14px; }
//     .lni-sub { margin: 0 auto 28px; }
//     .lni-tiers {
//       flex-wrap: nowrap;
//       overflow-x: auto;
//       scroll-snap-type: x mandatory;
//       -webkit-overflow-scrolling: touch;
//       margin: 0 -16px 28px;
//       padding: 0 16px 6px;
//     }
//     .lni-tier { flex: 0 0 152px; scroll-snap-align: start; }
//     .lni-support { width: 100%; justify-content: center; }
//   }

//   /* ── LEFT PANEL ── */
//   .lni-left {
//     padding: 48px 48px 48px 24px;
//     animation: fadeUp 0.6s ease both;
//   }

//   .lni-brand {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-bottom: 56px;
//   }
//   .lni-brand-icon {
//     width: 36px; height: 36px;
//     border-radius: 10px;
//     background: linear-gradient(135deg, var(--teal-900), var(--teal-700));
//     display: flex; align-items: center; justify-content: center;
//     font-size: 16px;
//   }
//   .lni-brand-name {
//     font-family: var(--font-display);
//     font-weight: 600;
//     font-size: 15px;
//     color: var(--ink);
//     letter-spacing: -0.2px;
//   }
//   .lni-brand-name span { color: var(--mint-500); }

//   .lni-headline {
//     font-family: var(--font-display);
//     font-size: clamp(32px, 4vw, 46px);
//     font-weight: 600;
//     line-height: 1.14;
//     color: var(--ink);
//     letter-spacing: -1px;
//     margin-bottom: 18px;
//   }
//   .lni-headline em {
//     font-style: normal;
//     position: relative;
//     display: inline-block;
//     background: var(--mint-200);
//     padding: 1px 8px 3px;
//     border-radius: 6px;
//     transform: rotate(-1deg);
//   }

//   .lni-sub {
//     font-size: 15px;
//     color: var(--ink-soft);
//     line-height: 1.65;
//     margin-bottom: 36px;
//     max-width: 380px;
//   }

//   /* Tier cards — boarding-pass style stubs, laid out in a row */
//   .lni-tiers {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 12px;
//     margin-bottom: 40px;
//   }
//   .lni-tier {
//     flex: 1 1 140px;
//     display: flex;
//     flex-direction: column;
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: 14px;
//     padding: 16px 14px;
//     position: relative;
//     overflow: visible;
//     transition: border-color 0.2s, transform 0.2s;
//   }
//   .lni-tier:hover {
//     border-color: var(--teal-600);
//     transform: translateY(-2px);
//   }
//   .lni-tier-badge {
//     width: 30px; height: 30px;
//     border-radius: 8px;
//     display: flex; align-items: center; justify-content: center;
//     font-family: var(--font-mono);
//     font-size: 11px;
//     font-weight: 600;
//     margin-bottom: 12px;
//     flex-shrink: 0;
//   }
//   .badge-7  { background: var(--mint-100); color: var(--teal-700); }
//   .badge-14 { background: #DCF1E7; color: #0E5A50; }
//   .badge-21 { background: var(--mint-200); color: var(--teal-900); }

//   .lni-tier-info {
//     position: relative;
//     padding-bottom: 14px;
//     margin-bottom: 12px;
//     border-bottom: 1.5px dashed var(--border-strong);
//   }
//   /* perforation notches where the stub "tears" */
//   .lni-tier-info::before,
//   .lni-tier-info::after {
//     content: '';
//     position: absolute;
//     bottom: -7px;
//     width: 14px; height: 14px;
//     border-radius: 50%;
//     background: var(--bg);
//     border: 1px solid var(--border);
//   }
//   .lni-tier-info::before { left: -21px; }
//   .lni-tier-info::after  { right: -21px; }

//   .lni-tier-label {
//     font-size: 13px;
//     font-weight: 500;
//     color: var(--ink);
//     margin-bottom: 3px;
//   }
//   .lni-tier-desc { font-size: 11px; color: var(--ink-faint); }

//   .lni-tier-roi {
//     font-family: var(--font-mono);
//     font-size: 22px;
//     font-weight: 600;
//     letter-spacing: -0.5px;
//   }
//   .roi-7  { color: var(--teal-600); }
//   .roi-14 { color: #0E5A50; }
//   .roi-21 { color: var(--teal-900); }

//   /* Support CTA */
//   .lni-support {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     background: var(--mint-100);
//     border: 1px solid var(--mint-200);
//     color: var(--teal-700);
//     padding: 11px 20px;
//     border-radius: 12px;
//     font-size: 13px;
//     font-weight: 500;
//     text-decoration: none;
//     transition: background 0.2s, border-color 0.2s;
//   }
//   .lni-support:hover {
//     background: var(--mint-200);
//     border-color: var(--border-strong);
//   }
//   .lni-support-dot {
//     width: 7px; height: 7px;
//     border-radius: 50%;
//     background: var(--mint-500);
//     animation: pulse 2.2s ease-in-out infinite;
//   }
//   @keyframes pulse {
//     0%, 100% { opacity: 1; transform: scale(1); }
//     50% { opacity: 0.45; transform: scale(0.7); }
//   }

//   /* ── RIGHT PANEL (form) ── */
//   .lni-right {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 24px;
//     animation: fadeUp 0.6s 0.08s ease both;
//   }

//   .lni-card {
//     width: 100%;
//     max-width: 420px;
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: 22px;
//     padding: 40px 36px;
//     box-shadow: 0 16px 40px -16px rgba(11,74,66,0.16);
//     position: relative;
//     overflow: hidden;
//   }
//   .lni-card::before {
//     content: '';
//     position: absolute;
//     top: 0; left: 0;
//     width: 100%; height: 3px;
//     background: linear-gradient(90deg, var(--teal-700), var(--mint-500));
//   }

//   /* Mobile brand — now redundant since .lni-left shows on mobile too; kept in markup-safe state */
//   .lni-mobile-brand {
//     display: none;
//     text-align: center;
//     margin-bottom: 28px;
//   }
//   .lni-mobile-brand .lni-brand-name {
//     font-size: 18px;
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//   }

//   .lni-card-title {
//     font-family: var(--font-display);
//     font-size: 23px;
//     font-weight: 600;
//     color: var(--ink);
//     letter-spacing: -0.4px;
//     margin-bottom: 6px;
//   }
//   .lni-card-sub {
//     font-size: 13px;
//     color: var(--ink-faint);
//     margin-bottom: 32px;
//     line-height: 1.5;
//   }

//   /* Error */
//   .lni-error {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     background: var(--danger-bg);
//     border: 1px solid var(--danger-border);
//     color: var(--danger);
//     padding: 10px 14px;
//     border-radius: 10px;
//     font-size: 13px;
//     margin-bottom: 20px;
//     animation: shake 0.3s ease;
//   }
//   @keyframes shake {
//     0%, 100% { transform: translateX(0); }
//     25% { transform: translateX(-6px); }
//     75% { transform: translateX(6px); }
//   }

//   /* Input group */
//   .lni-field {
//     margin-bottom: 14px;
//   }
//   .lni-field label {
//     display: block;
//     font-family: var(--font-mono);
//     font-size: 11px;
//     font-weight: 500;
//     color: var(--ink-faint);
//     letter-spacing: 0.5px;
//     text-transform: uppercase;
//     margin-bottom: 7px;
//   }
//   .lni-input-wrap {
//     position: relative;
//     display: flex;
//     align-items: center;
//   }
//   .lni-input-icon {
//     position: absolute;
//     left: 14px;
//     color: var(--ink-faint);
//     font-size: 15px;
//     pointer-events: none;
//     transition: color 0.2s;
//   }
//   .lni-input {
//     width: 100%;
//     background: var(--surface-muted);
//     border: 1px solid var(--border);
//     border-radius: 12px;
//     padding: 13px 14px 13px 42px;
//     font-size: 14px;
//     font-family: var(--font-body);
//     color: var(--ink);
//     outline: none;
//     transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
//   }
//   .lni-input::placeholder { color: #A9BAB3; }
//   .lni-input:focus {
//     border-color: var(--teal-600);
//     background: var(--surface);
//     box-shadow: 0 0 0 3px var(--mint-100);
//   }
//   .lni-input:focus + .lni-input-icon,
//   .lni-input-wrap:focus-within .lni-input-icon { color: var(--teal-700); }

//   /* Forgot */
//   .lni-forgot {
//     display: flex;
//     justify-content: flex-end;
//     margin: 4px 0 24px;
//   }
//   .lni-forgot a {
//     font-size: 12px;
//     color: var(--teal-700);
//     text-decoration: none;
//     opacity: 0.85;
//     transition: opacity 0.15s;
//   }
//   .lni-forgot a:hover { opacity: 1; text-decoration: underline; }

//   /* Submit button */
//   .lni-btn {
//     width: 100%;
//     position: relative;
//     background: var(--teal-700);
//     color: #fff;
//     border: none;
//     border-radius: 12px;
//     padding: 14px;
//     font-size: 14px;
//     font-family: var(--font-display);
//     font-weight: 600;
//     letter-spacing: 0.2px;
//     cursor: pointer;
//     overflow: hidden;
//     transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
//     box-shadow: 0 10px 24px -10px rgba(14,107,95,0.55);
//   }
//   .lni-btn:hover { background: var(--teal-600); transform: translateY(-1px); }
//   .lni-btn:active { transform: translateY(0); }
//   .lni-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

//   .lni-btn-loading {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//   }
//   .lni-spinner {
//     width: 14px; height: 14px;
//     border: 2px solid rgba(255,255,255,0.35);
//     border-top-color: #fff;
//     border-radius: 50%;
//     animation: spin 0.6s linear infinite;
//   }
//   @keyframes spin { to { transform: rotate(360deg); } }

//   /* Divider */
//   .lni-divider {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     margin: 24px 0;
//   }
//   .lni-divider-line { flex: 1; height: 1px; background: var(--border); }
//   .lni-divider span {
//     font-family: var(--font-mono);
//     font-size: 10px;
//     color: var(--ink-faint);
//     letter-spacing: 0.5px;
//     text-transform: uppercase;
//   }

//   /* Register link */
//   .lni-register {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;
//     background: var(--surface-muted);
//     border: 1px solid var(--border);
//     border-radius: 12px;
//     padding: 13px;
//     text-decoration: none;
//     font-size: 13px;
//     font-weight: 500;
//     color: var(--ink-soft);
//     transition: background 0.2s, border-color 0.2s, color 0.2s;
//   }
//   .lni-register:hover {
//     background: var(--mint-100);
//     border-color: var(--border-strong);
//     color: var(--ink);
//   }
//   .lni-register strong { color: var(--teal-700); }

//   /* Mobile support — now redundant since .lni-left shows on mobile too; kept in markup-safe state */
//   .lni-mobile-support {
//     display: none;
//     margin-top: 20px;
//   }

//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(16px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }
// `;

// export default function Login({ onLogin }) {
//   const navigate = useNavigate();
//   const [username, setUser] = useState("");
//   const [password, setPass] = useState("");
//   const [error, setErr] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function submit(e) {
//     e.preventDefault();
//     setErr("");
//     setLoading(true);
//     try {
//       const res = await fetch(`${API}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username: username.trim(), password }),
//       });
//       const data = await res.json();
//       if (!data.access_token) throw new Error();
//       localStorage.setItem("token", data.access_token);
//       onLogin(data.access_token);
//       navigate("/");
//     } catch {
//       setErr("Invalid username or password");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const tiers = [
//     { days: "7",  label: "7-Day plan",  desc: "Short sprint, quick gains",  roi: "7%",  badgeCls: "badge-7",  roiCls: "roi-7"  },
//     { days: "14", label: "14-Day plan", desc: "Double the time, double the return", roi: "14%", badgeCls: "badge-14", roiCls: "roi-14" },
//     { days: "21", label: "21-Day plan", desc: "Maximum returns, maximum growth",    roi: "21%", badgeCls: "badge-21", roiCls: "roi-21" },
//   ];

//   return (
//     <>
//       <style>{css}</style>
//       <div className="lni-root">
//         {/* Background */}
//         <div className="lni-bg"><div className="lni-blob3" /></div>
//         <div className="lni-grain" />

//         <div className="lni-layout">

//           {/* ── LEFT PANEL ── */}
//           <div className="lni-left">
//             <div className="lni-brand">
//               <div className="lni-brand-icon">₦</div>
//               <div className="lni-brand-name">Local Naira <span>Invest</span></div>
//             </div>

//             <h1 className="lni-headline">
//               Grow your<br />idle money <em>faster.</em>
//             </h1>
//             <p className="lni-sub">
//               Earn fixed short-term returns with transparent plans and
//               zero hidden fees. Your money works while you sleep.
//             </p>

//             <div className="lni-tiers">
//               {tiers.map((t) => (
//                 <div className="lni-tier" key={t.days}>
//                   <div className={`lni-tier-badge ${t.badgeCls}`}>{t.days}D</div>
//                   <div className="lni-tier-info">
//                     <div className="lni-tier-label">{t.label}</div>
//                     <div className="lni-tier-desc">{t.desc}</div>
//                   </div>
//                   <div className={`lni-tier-roi ${t.roiCls}`}>{t.roi}</div>
//                 </div>
//               ))}
//             </div>

//             <a
//               href="https://wa.me/447591683924"
//               target="_blank"
//               rel="noreferrer"
//               className="lni-support"
//             >
//               <span className="lni-support-dot" />
//               Live support on WhatsApp
//             </a>
//           </div>

//           {/* ── RIGHT PANEL ── */}
//           <div className="lni-right">
//             <div className="lni-card">

//               {/* Mobile-only brand */}
//               <div className="lni-mobile-brand">
//                 <div className="lni-brand-name">
//                   <span style={{ fontSize: 22 }}>₦</span>
//                   Local Naira <span>Invest</span>
//                 </div>
//               </div>

//               <div className="lni-card-title">Welcome back</div>
//               <div className="lni-card-sub">Sign in to manage your investments</div>

//               {error && (
//                 <div className="lni-error">
//                   <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
//                     <circle cx="8" cy="8" r="7" stroke="#f87171" strokeWidth="1.5"/>
//                     <path d="M8 5v3.5M8 11h.01" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
//                   </svg>
//                   {error}
//                 </div>
//               )}

//               <form onSubmit={submit}>
//                 <div className="lni-field">
//                   <label>Username</label>
//                   <div className="lni-input-wrap">
//                     <input
//                       className="lni-input"
//                       type="text"
//                       placeholder="Enter your username"
//                       value={username}
//                       onChange={(e) => setUser(e.target.value)}
//                       required
//                       autoComplete="username"
//                     />
//                     <svg className="lni-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
//                       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//                       <circle cx="12" cy="7" r="4"/>
//                     </svg>
//                   </div>
//                 </div>

//                 <div className="lni-field">
//                   <label>Password</label>
//                   <div className="lni-input-wrap">
//                     <input
//                       className="lni-input"
//                       type="password"
//                       placeholder="Enter your password"
//                       value={password}
//                       onChange={(e) => setPass(e.target.value)}
//                       required
//                       autoComplete="current-password"
//                     />
//                     <svg className="lni-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
//                       <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                       <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                     </svg>
//                   </div>
//                 </div>

//                 <div className="lni-forgot">
//                   <Link to="/forgot-password">Forgot password?</Link>
//                 </div>

//                 <button type="submit" className="lni-btn" disabled={loading}>
//                   {loading ? (
//                     <span className="lni-btn-loading">
//                       <span className="lni-spinner" />
//                       Signing in…
//                     </span>
//                   ) : (
//                     "Sign In Securely"
//                   )}
//                 </button>
//               </form>

//               <div className="lni-divider">
//                 <div className="lni-divider-line" />
//                 <span>NEW HERE?</span>
//                 <div className="lni-divider-line" />
//               </div>

//               <Link to="/register" className="lni-register">
//                 Create a free account →&nbsp;<strong>Get started</strong>
//               </Link>

//               {/* Mobile support */}
//               <a
//                 href="https://wa.me/2347077513836"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="lni-support lni-mobile-support"
//                 style={{ justifyContent: "center" }}
//               >
//                 <span className="lni-support-dot" />
//                 Contact Support on WhatsApp
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const SUPPORT_LINK = "https://wa.me/447591683924";
const COMMUNITY_LINK =
  "https://chat.whatsapp.com/FlEbs5oAwAfJOPtgeq0m9l?s=cl&p=i&mlu=0&ilr=4&iam=2";

/* ─── Styles ──────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');

  .nx, .nx *, .nx *::before, .nx *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .nx {
    --bg: #07110D;
    --panel: #0D1A15;
    --card: #F7F5EF;
    --line: rgba(255,255,255,0.08);
    --text: #EAF2EE;
    --muted: #8DA39A;
    --gold: #E9C46A;
    --gold-soft: rgba(233,196,106,0.12);
    --green: #22C55E;
    --green-deep: #0F5132;
    --ink: #0E1A15;
    --ink-soft: #5B6B64;
    --field: #FFFFFF;
    --field-line: #DCD8CC;
    --danger: #B42318;
    --danger-bg: #FEF0EE;
    --wa: #25D366;

    min-height: 100vh;
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    align-content: start;
    background:
      radial-gradient(900px 500px at -10% -10%, rgba(34,197,94,0.18), transparent 60%),
      radial-gradient(700px 600px at 100% 100%, rgba(233,196,106,0.08), transparent 60%),
      var(--bg);
  }

  /* ── Left: brand + plan ── */
  .nx-side {
    position: relative;
    overflow: hidden;
    padding: 48px 56px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    min-height: 100vh;
  }
  .nx-side::after {
    content: '';
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 56px 56px;
    -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0.6), transparent 70%);
            mask-image: linear-gradient(180deg, rgba(0,0,0,0.6), transparent 70%);
    pointer-events: none;
  }
  .nx-side > * { position: relative; z-index: 1; }

  .nx-brand { display: flex; align-items: center; gap: 12px; }
  .nx-logo {
    width: 40px; height: 40px; border-radius: 12px;
    background: linear-gradient(140deg, var(--gold), #C9962E);
    color: var(--ink); font-weight: 700; font-size: 19px;
    display: grid; place-items: center;
    box-shadow: 0 8px 24px -8px rgba(233,196,106,0.6);
  }
  .nx-brand-name { font-weight: 600; font-size: 16px; letter-spacing: -0.2px; }
  .nx-brand-name span { color: var(--gold); }

  .nx-hero { margin-top: auto; }
  .nx-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 500; color: var(--green);
    background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25);
    padding: 6px 12px; border-radius: 999px; margin-bottom: 22px;
  }
  .nx-eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: nxPulse 2s infinite; }
  .nx-title {
    font-family: 'Fraunces', Georgia, serif;
    font-weight: 500;
    font-size: clamp(36px, 4.4vw, 58px);
    line-height: 1.04;
    letter-spacing: -1.5px;
    margin-bottom: 18px;
  }
  .nx-title em { font-style: italic; color: var(--gold); }
  .nx-lead { color: var(--muted); font-size: 16px; line-height: 1.6; max-width: 440px; }

  /* Plan ticket */
  .nx-plan {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 20px;
    max-width: 460px;
    padding: 22px 24px;
    border-radius: 20px;
    background: linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
    border: 1px solid var(--line);
    backdrop-filter: blur(6px);
  }
  .nx-plan-tag {
    font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 1px;
    color: var(--muted); text-transform: uppercase; margin-bottom: 8px;
  }
  .nx-plan-name { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
  .nx-plan-desc { font-size: 13px; color: var(--muted); }
  .nx-plan-rate {
    text-align: right;
    padding-left: 20px;
    border-left: 1px dashed rgba(255,255,255,0.18);
  }
  .nx-plan-rate b {
    display: block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 40px; font-weight: 600; color: var(--gold); letter-spacing: -1.5px; line-height: 1;
  }
  .nx-plan-rate small { font-size: 11px; color: var(--muted); }

  /* WhatsApp buttons */
  .nx-wa { display: flex; flex-wrap: wrap; gap: 12px; }
  .nx-wa a {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    padding: 13px 18px; border-radius: 14px;
    font-size: 14px; font-weight: 600; text-decoration: none;
    transition: transform .15s, background .2s, border-color .2s, box-shadow .2s;
  }
  .nx-wa a:hover { transform: translateY(-2px); }
  .nx-wa-support { color: var(--text); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.14); }
  .nx-wa-support:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.08); }
  .nx-wa-support i { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 0 4px rgba(34,197,94,0.18); }
  .nx-wa-community { color: #062B14; background: var(--wa); border: 1px solid var(--wa); box-shadow: 0 10px 28px -10px rgba(37,211,102,0.7); }
  .nx-wa-community:hover { background: #2EE074; }

  /* ── Right: form ── */
  .nx-main {
    display: flex; align-items: center; justify-content: center;
    padding: 40px 32px;
    min-height: 100vh;
    background: rgba(255,255,255,0.015);
    border-left: 1px solid var(--line);
  }
  .nx-card {
    width: 100%; max-width: 420px;
    background: var(--card);
    color: var(--ink);
    border-radius: 28px;
    padding: 44px 40px;
    box-shadow: 0 40px 80px -30px rgba(0,0,0,0.7);
    animation: nxRise .5s ease both;
  }
  .nx-card h2 {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 30px; font-weight: 600; letter-spacing: -0.8px; margin-bottom: 6px;
  }
  .nx-card > p { color: var(--ink-soft); font-size: 14px; margin-bottom: 28px; }

  .nx-alert {
    display: flex; gap: 10px; align-items: flex-start;
    padding: 12px 14px; border-radius: 12px; font-size: 13px; line-height: 1.45;
    background: var(--danger-bg); color: var(--danger); border: 1px solid #F9D3CE;
    margin-bottom: 20px; animation: nxShake .3s;
  }

  .nx-field { margin-bottom: 16px; }
  .nx-field label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 7px; color: var(--ink); }
  .nx-input { position: relative; }
  .nx-input input {
    width: 100%;
    height: 50px;
    padding: 0 16px;
    font: inherit; font-size: 15px; color: var(--ink);
    background: var(--field);
    border: 1.5px solid var(--field-line);
    border-radius: 14px;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .nx-input input::placeholder { color: #A7A497; }
  .nx-input input:focus { border-color: var(--green-deep); box-shadow: 0 0 0 4px rgba(15,81,50,0.12); }
  .nx-input .pad { padding-right: 70px; }
  .nx-eye {
    position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
    border: 0; background: transparent; cursor: pointer;
    font: 600 12px 'Inter', sans-serif; color: var(--green-deep);
    padding: 8px 10px; border-radius: 10px;
  }
  .nx-eye:hover { background: rgba(15,81,50,0.08); }

  .nx-row { display: flex; justify-content: flex-end; margin: -4px 0 24px; }
  .nx-link { font-size: 13px; font-weight: 500; color: var(--green-deep); text-decoration: none; }
  .nx-link:hover { text-decoration: underline; }

  .nx-btn {
    width: 100%; height: 52px;
    border: 0; border-radius: 14px; cursor: pointer;
    font: 600 15px 'Inter', sans-serif; color: #fff;
    background: linear-gradient(180deg, #13663F, var(--green-deep));
    box-shadow: 0 12px 24px -12px rgba(15,81,50,0.8), inset 0 1px 0 rgba(255,255,255,0.15);
    transition: transform .15s, filter .2s;
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  }
  .nx-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.08); }
  .nx-btn:disabled { opacity: .6; cursor: not-allowed; }
  .nx-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; animation: nxSpin .6s linear infinite; }

  .nx-alt { margin-top: 24px; text-align: center; font-size: 14px; color: var(--ink-soft); }
  .nx-alt a { color: var(--green-deep); font-weight: 600; text-decoration: none; }
  .nx-alt a:hover { text-decoration: underline; }

  /* ── Mobile ── */
  @media (max-width: 900px) {
    .nx { grid-template-columns: 1fr; }
    .nx-side { padding: 28px 20px 8px; gap: 24px; min-height: 0; }
    .nx-hero { margin-top: 8px; }
    .nx-title { font-size: 34px; }
    .nx-lead { font-size: 15px; }
    .nx-plan { max-width: none; padding: 18px; }
    .nx-plan-rate b { font-size: 32px; }
    .nx-wa { flex-direction: column; }
    .nx-wa a { width: 100%; }
    .nx-main { min-height: 0; background: none; border-left: 0; padding: 24px 16px 40px; align-items: flex-start; }
    .nx-card { padding: 32px 22px; border-radius: 24px; }
  }

  @media (prefers-reduced-motion: reduce) { .nx * { animation: none !important; transition: none !important; } }

  @keyframes nxPulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
  @keyframes nxRise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
  @keyframes nxShake { 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
  @keyframes nxSpin { to { transform: rotate(360deg); } }
`;

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.03c-.25.69-1.44 1.32-2 1.4-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.62-2.97-1.28-4.91-4.27-5.06-4.47-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37h.57c.18 0 .43-.07.67.51.25.59.84 2.05.91 2.2.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.27 1.65 2.06 1.13 1.01 2.09 1.32 2.39 1.47.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.39-.25.67-.15.27.1 1.73.82 2.03.97.3.15.49.22.57.35.07.12.07.71-.18 1.4z"/>
  </svg>
);

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.access_token) {
        setError(
          res.status >= 500
            ? "Our server is having trouble. Please try again shortly."
            : typeof data.detail === "string"
              ? data.detail
              : "Invalid username or password."
        );
        return;
      }
      localStorage.setItem("token", data.access_token);
      onLogin?.(data.access_token);
      navigate("/");
    } catch {
      setError("Can't reach the server. Check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{css}</style>
      <div className="nx">
        {/* ── Left ── */}
        <aside className="nx-side">
          <div className="nx-brand">
            <div className="nx-logo" aria-hidden="true">₦</div>
            <div className="nx-brand-name">Local Naira <span>Invest</span></div>
          </div>

          <div className="nx-hero">
            <div className="nx-eyebrow"><i />Fixed returns, no hidden fees</div>
            <h1 className="nx-title">Let your naira <em>work</em> while you rest.</h1>
            <p className="nx-lead">One simple plan. Invest, wait 21 days, and get your money back with fixed interest.</p>
          </div>

          <div className="nx-plan">
            <div>
              <div className="nx-plan-tag">Our plan</div>
              <div className="nx-plan-name">21-Day plan</div>
              <div className="nx-plan-desc">Fixed interest paid at the end of 21 days</div>
            </div>
            <div className="nx-plan-rate">
              <b>0.2%</b>
              <small>interest</small>
            </div>
          </div>

          <div className="nx-wa">
            <a href={SUPPORT_LINK} target="_blank" rel="noopener noreferrer" className="nx-wa-support">
              <i aria-hidden="true" />
              Live support on WhatsApp
            </a>
            <a href={COMMUNITY_LINK} target="_blank" rel="noopener noreferrer" className="nx-wa-community">
              <WhatsAppIcon />
              Join community of investors on WhatsApp
            </a>
          </div>
        </aside>

        {/* ── Right ── */}
        <main className="nx-main">
          <div className="nx-card">
            <h2>Welcome back</h2>
            <p>Sign in to manage your investments.</p>

            {error && (
              <div className="nx-alert" role="alert">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={submit}>
              <div className="nx-field">
                <label htmlFor="login-username">Username</label>
                <div className="nx-input">
                  <input
                    id="login-username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    required
                  />
                </div>
              </div>

              <div className="nx-field">
                <label htmlFor="login-password">Password</label>
                <div className="nx-input">
                  <input
                    id="login-password"
                    className="pad"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="nx-eye"
                    onClick={() => setShowPass((s) => !s)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="nx-row">
                <Link to="/forgot-password" className="nx-link">Forgot password?</Link>
              </div>

              <button type="submit" className="nx-btn" disabled={loading}>
                {loading ? (<><span className="nx-spin" />Signing in…</>) : "Sign in"}
              </button>
            </form>

            <div className="nx-alt">
              New to Local Naira Invest? <Link to="/register">Create an account</Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

