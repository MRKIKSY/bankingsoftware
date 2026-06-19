



import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

/* ─── Inline styles & keyframes injected once ─────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lni-root {
    --bg: #F6F9F7;
    --surface: #FFFFFF;
    --surface-muted: #F1F6F4;
    --border: #E2E9E5;
    --border-strong: #C9D8D1;
    --ink: #111E1A;
    --ink-soft: #57685F;
    --ink-faint: #8FA39B;
    --teal-900: #0B4A42;
    --teal-700: #0E6B5F;
    --teal-600: #128270;
    --mint-500: #28B894;
    --mint-200: #D6EFE6;
    --mint-100: #ECF8F2;
    --danger: #B5453A;
    --danger-bg: #FBEAE7;
    --danger-border: #F1CCC5;
    --font-display: 'Space Grotesk', sans-serif;
    --font-body: 'Inter', sans-serif;
    --font-mono: 'IBM Plex Mono', monospace;

    min-height: 100vh;
    display: flex;
    align-items: stretch;
    font-family: var(--font-body);
    background: var(--bg);
    overflow: hidden;
    position: relative;
  }

  /* ── Ambient background — one calm halo, no drift, no grain ── */
  .lni-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }
  .lni-bg::before {
    content: '';
    position: absolute;
    width: 760px; height: 760px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--mint-100) 0%, transparent 70%);
    top: -280px; right: -220px;
    opacity: 0.9;
  }
  .lni-bg::after {
    content: '';
    position: absolute;
    width: 520px; height: 520px;
    border-radius: 50%;
    background: radial-gradient(circle, #E8F3EE 0%, transparent 72%);
    bottom: -200px; left: -160px;
  }
  .lni-blob3 { display: none; }

  /* Faint dot grid instead of grain — quiet, technical texture */
  .lni-grain {
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.5;
    background-image: radial-gradient(circle, #C9D8D1 1px, transparent 1px);
    background-size: 28px 28px;
    -webkit-mask-image: radial-gradient(circle at 50% 35%, #000 0%, transparent 65%);
            mask-image: radial-gradient(circle at 50% 35%, #000 0%, transparent 65%);
  }

  /* ── Layout ── */
  .lni-layout {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;
    gap: 0;
    padding: 32px 24px;
  }
  @media (max-width: 768px) {
    .lni-layout { grid-template-columns: 1fr; padding: 24px 16px; gap: 4px; }
    .lni-left { padding: 4px 0 0; text-align: center; }
    .lni-left .lni-brand { justify-content: center; margin-bottom: 28px; }
    .lni-headline { font-size: clamp(28px, 8vw, 36px); max-width: 380px; margin: 0 auto 14px; }
    .lni-sub { margin: 0 auto 28px; }
    .lni-tiers {
      flex-wrap: nowrap;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      margin: 0 -16px 28px;
      padding: 0 16px 6px;
    }
    .lni-tier { flex: 0 0 152px; scroll-snap-align: start; }
    .lni-support { width: 100%; justify-content: center; }
  }

  /* ── LEFT PANEL ── */
  .lni-left {
    padding: 48px 48px 48px 24px;
    animation: fadeUp 0.6s ease both;
  }

  .lni-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 56px;
  }
  .lni-brand-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--teal-900), var(--teal-700));
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .lni-brand-name {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 15px;
    color: var(--ink);
    letter-spacing: -0.2px;
  }
  .lni-brand-name span { color: var(--mint-500); }

  .lni-headline {
    font-family: var(--font-display);
    font-size: clamp(32px, 4vw, 46px);
    font-weight: 600;
    line-height: 1.14;
    color: var(--ink);
    letter-spacing: -1px;
    margin-bottom: 18px;
  }
  .lni-headline em {
    font-style: normal;
    position: relative;
    display: inline-block;
    background: var(--mint-200);
    padding: 1px 8px 3px;
    border-radius: 6px;
    transform: rotate(-1deg);
  }

  .lni-sub {
    font-size: 15px;
    color: var(--ink-soft);
    line-height: 1.65;
    margin-bottom: 36px;
    max-width: 380px;
  }

  /* Tier cards — boarding-pass style stubs, laid out in a row */
  .lni-tiers {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 40px;
  }
  .lni-tier {
    flex: 1 1 140px;
    display: flex;
    flex-direction: column;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px 14px;
    position: relative;
    overflow: visible;
    transition: border-color 0.2s, transform 0.2s;
  }
  .lni-tier:hover {
    border-color: var(--teal-600);
    transform: translateY(-2px);
  }
  .lni-tier-badge {
    width: 30px; height: 30px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 12px;
    flex-shrink: 0;
  }
  .badge-7  { background: var(--mint-100); color: var(--teal-700); }
  .badge-14 { background: #DCF1E7; color: #0E5A50; }
  .badge-21 { background: var(--mint-200); color: var(--teal-900); }

  .lni-tier-info {
    position: relative;
    padding-bottom: 14px;
    margin-bottom: 12px;
    border-bottom: 1.5px dashed var(--border-strong);
  }
  /* perforation notches where the stub "tears" */
  .lni-tier-info::before,
  .lni-tier-info::after {
    content: '';
    position: absolute;
    bottom: -7px;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--bg);
    border: 1px solid var(--border);
  }
  .lni-tier-info::before { left: -21px; }
  .lni-tier-info::after  { right: -21px; }

  .lni-tier-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--ink);
    margin-bottom: 3px;
  }
  .lni-tier-desc { font-size: 11px; color: var(--ink-faint); }

  .lni-tier-roi {
    font-family: var(--font-mono);
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
  .roi-7  { color: var(--teal-600); }
  .roi-14 { color: #0E5A50; }
  .roi-21 { color: var(--teal-900); }

  /* Support CTA */
  .lni-support {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--mint-100);
    border: 1px solid var(--mint-200);
    color: var(--teal-700);
    padding: 11px 20px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
  }
  .lni-support:hover {
    background: var(--mint-200);
    border-color: var(--border-strong);
  }
  .lni-support-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--mint-500);
    animation: pulse 2.2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.45; transform: scale(0.7); }
  }

  /* ── RIGHT PANEL (form) ── */
  .lni-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: fadeUp 0.6s 0.08s ease both;
  }

  .lni-card {
    width: 100%;
    max-width: 420px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 40px 36px;
    box-shadow: 0 16px 40px -16px rgba(11,74,66,0.16);
    position: relative;
    overflow: hidden;
  }
  .lni-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 3px;
    background: linear-gradient(90deg, var(--teal-700), var(--mint-500));
  }

  /* Mobile brand — now redundant since .lni-left shows on mobile too; kept in markup-safe state */
  .lni-mobile-brand {
    display: none;
    text-align: center;
    margin-bottom: 28px;
  }
  .lni-mobile-brand .lni-brand-name {
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .lni-card-title {
    font-family: var(--font-display);
    font-size: 23px;
    font-weight: 600;
    color: var(--ink);
    letter-spacing: -0.4px;
    margin-bottom: 6px;
  }
  .lni-card-sub {
    font-size: 13px;
    color: var(--ink-faint);
    margin-bottom: 32px;
    line-height: 1.5;
  }

  /* Error */
  .lni-error {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--danger-bg);
    border: 1px solid var(--danger-border);
    color: var(--danger);
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
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    color: var(--ink-faint);
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
    color: var(--ink-faint);
    font-size: 15px;
    pointer-events: none;
    transition: color 0.2s;
  }
  .lni-input {
    width: 100%;
    background: var(--surface-muted);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 13px 14px 13px 42px;
    font-size: 14px;
    font-family: var(--font-body);
    color: var(--ink);
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .lni-input::placeholder { color: #A9BAB3; }
  .lni-input:focus {
    border-color: var(--teal-600);
    background: var(--surface);
    box-shadow: 0 0 0 3px var(--mint-100);
  }
  .lni-input:focus + .lni-input-icon,
  .lni-input-wrap:focus-within .lni-input-icon { color: var(--teal-700); }

  /* Forgot */
  .lni-forgot {
    display: flex;
    justify-content: flex-end;
    margin: 4px 0 24px;
  }
  .lni-forgot a {
    font-size: 12px;
    color: var(--teal-700);
    text-decoration: none;
    opacity: 0.85;
    transition: opacity 0.15s;
  }
  .lni-forgot a:hover { opacity: 1; text-decoration: underline; }

  /* Submit button */
  .lni-btn {
    width: 100%;
    position: relative;
    background: var(--teal-700);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 14px;
    font-size: 14px;
    font-family: var(--font-display);
    font-weight: 600;
    letter-spacing: 0.2px;
    cursor: pointer;
    overflow: hidden;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 10px 24px -10px rgba(14,107,95,0.55);
  }
  .lni-btn:hover { background: var(--teal-600); transform: translateY(-1px); }
  .lni-btn:active { transform: translateY(0); }
  .lni-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

  .lni-btn-loading {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .lni-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.35);
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
  .lni-divider-line { flex: 1; height: 1px; background: var(--border); }
  .lni-divider span {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--ink-faint);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  /* Register link */
  .lni-register {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--surface-muted);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 13px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-soft);
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }
  .lni-register:hover {
    background: var(--mint-100);
    border-color: var(--border-strong);
    color: var(--ink);
  }
  .lni-register strong { color: var(--teal-700); }

  /* Mobile support — now redundant since .lni-left shows on mobile too; kept in markup-safe state */
  .lni-mobile-support {
    display: none;
    margin-top: 20px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
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