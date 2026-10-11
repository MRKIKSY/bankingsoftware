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

  .nx-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .nx-field small { font-weight: 400; color: var(--ink-soft); }
  .nx-hint { font-size: 12px; color: var(--ink-soft); margin-top: 6px; }
  .nx-hint.err { color: var(--danger); }
  .nx-input input[aria-invalid="true"] { border-color: var(--danger); }
  .nx-ok {
    display: flex; gap: 10px; align-items: center;
    padding: 12px 14px; border-radius: 12px; font-size: 13px;
    background: #EAF7EF; color: var(--green-deep); border: 1px solid #C6E9D3; margin-bottom: 20px;
  }
  .nx-card.wide { max-width: 460px; }
  @media (max-width: 520px) { .nx-grid2 { grid-template-columns: 1fr; gap: 0; } }

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

function validate(f) {
  const e = {};
  if (f.username.trim().length < 3) e.username = "At least 3 characters.";
  else if (/\s/.test(f.username.trim())) e.username = "No spaces allowed.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid phone number.";
  if (f.password.length < 8) e.password = "Use at least 8 characters.";
  if (f.confirm !== f.password) e.confirm = "Passwords don't match.";
  if (f.accountDetails.trim().length < 6) e.accountDetails = "Enter your bank, account name and number.";
  return e;
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "", email: "", phone: "", password: "", confirm: "", signupCode: "", accountDetails: "",
  });
  const [touched, setTouched] = useState({});
  const [tried, setTried] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const errors = validate(form);
  const errOf = (k) => ((tried || touched[k]) && errors[k]) || "";

  const bind = (k) => ({
    id: `reg-${k}`,
    value: form[k],
    onChange: (e) => setForm((f) => ({ ...f, [k]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    "aria-invalid": errOf(k) ? "true" : undefined,
  });

  const Field = ({ k, label, hint, children }) => (
    <div className="nx-field">
      <label htmlFor={`reg-${k}`}>{label}</label>
      <div className="nx-input">{children}</div>
      {(errOf(k) || hint) && <div className={`nx-hint${errOf(k) ? " err" : ""}`}>{errOf(k) || hint}</div>}
    </div>
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;
    setTried(true);
    setMessage("");
    setMessageType("");
    if (Object.keys(errors).length) return;

    setLoading(true);
    try {
      await axios.post(`${API}/auth/register`, {
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        password: form.password,
        signup_code: form.signupCode.trim(),
        address: form.accountDetails.trim(),
      });
      setMessageType("success");
      setMessage("Account created successfully. Taking you to sign in…");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      const d = err.response?.data?.detail;
      setMessageType("error");
      setMessage(
        typeof d === "string" ? d
          : Array.isArray(d) && d[0]?.msg ? d[0].msg
          : !err.response ? "Can't reach the server. Check your internet connection and try again."
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
            <div className="nx-eyebrow"><i />Open an account in minutes</div>
            <h1 className="nx-title">Start growing your naira <em>today.</em></h1>
            <p className="nx-lead">Secure accounts, fast withdrawals to your bank, and one simple 21-day plan.</p>
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
          <div className="nx-card wide">
            <h2>Create account</h2>
            <p>Open your investment account in minutes.</p>

            {message && messageType === "error" && (
              <div className="nx-alert" role="alert">{message}</div>
            )}
            {message && messageType === "success" && (
              <div className="nx-ok" role="status">{message}</div>
            )}

            <form onSubmit={handleRegister} noValidate>
              {Field({ k: "username", label: "Username", children:
                <input type="text" placeholder="Choose a username" autoComplete="username"
                  autoCapitalize="none" spellCheck={false} {...bind("username")} /> })}

              <div className="nx-grid2">
                {Field({ k: "email", label: "Email", children:
                  <input type="email" placeholder="you@example.com" autoComplete="email" {...bind("email")} /> })}
                {Field({ k: "phone", label: "Phone number", children:
                  <input type="tel" inputMode="tel" placeholder="0803 123 4567" autoComplete="tel" {...bind("phone")} /> })}
              </div>

              <div className="nx-grid2">
                {Field({ k: "password", label: "Password", children: (<>
                  <input className="pad" type={showPass ? "text" : "password"} placeholder="8+ characters"
                    autoComplete="new-password" {...bind("password")} />
                  <button type="button" className="nx-eye" onClick={() => setShowPass((s) => !s)}
                    aria-label={showPass ? "Hide password" : "Show password"}>{showPass ? "Hide" : "Show"}</button>
                </>) })}
                {Field({ k: "confirm", label: "Confirm password", children:
                  <input type={showPass ? "text" : "password"} placeholder="Repeat password"
                    autoComplete="new-password" {...bind("confirm")} /> })}
              </div>

              <div className="nx-field">
                <label htmlFor="reg-signupCode">Full name or signup code <small>(optional)</small></label>
                <div className="nx-input">
                  <input id="reg-signupCode" type="text" placeholder="Your full name, or a signup code"
                    value={form.signupCode} onChange={(e) => setForm((f) => ({ ...f, signupCode: e.target.value }))} />
                </div>
              </div>

              {Field({ k: "accountDetails", label: "Bank account", hint: "Withdrawals are paid to this account.", children:
                <input type="text" placeholder="Bank, account name & number" {...bind("accountDetails")} /> })}

              <div style={{ height: 8 }} />

              <button type="submit" className="nx-btn" disabled={loading}>
                {loading ? (<><span className="nx-spin" />Creating account…</>) : "Create account"}
              </button>
            </form>

            <div className="nx-alt">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}