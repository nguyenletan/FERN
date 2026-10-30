import teamImage from "../../assets/fern-team-transparent.png";
import guideImage from "../../assets/fern-guide-transparent.png";
import fernMark from "../../assets/home-fern.png";
import {Buildings, ShieldCheck, ChartBar} from "@phosphor-icons/react";
import "./demo-sign-in.css";
import { DEMO_EMAIL } from "./demoCredentials.ts";
import { DEMO_PASSWORD } from "./demoCredentials.ts";
import React from "react";
import { useState } from "react";

// Keep the demo session for this browser tab so a refresh does not sign the viewer out.
const SESSION_KEY = "fern-demo-session";
function readSession() {
  try { return sessionStorage.getItem(SESSION_KEY) === "signed-in"; } catch { return false; }
}
function writeSession(signedIn: boolean) {
  try {
    if (signedIn) sessionStorage.setItem(SESSION_KEY, "signed-in");
    else sessionStorage.removeItem(SESSION_KEY);
  } catch { /* Storage blocked: the session lasts until the page is refreshed. */ }
}

export default function DemoSignIn({renderApp}:{renderApp:(onSignOut:()=>void)=>React.ReactNode}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(readSession);

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        setLoggedIn(true);
        writeSession(true);
      } else {
        setError("Use demo for both the username and password to enter this preview.");
      }
      setLoading(false);
    }, 900);
  }

  if (loggedIn) {
    return renderApp(() => {writeSession(false);setLoggedIn(false);setEmail("");setPassword("");});
  }

  return (
    <div
      className="fern-signin"
      style={{
        fontFamily: "var(--fern-font)",
      }}
    >
      <section className="fern-signin-story" aria-label="About FERN">
        <div className="fern-signin-brand"><strong>FERN</strong><img src={fernMark} alt="" /></div>
        <h2>Digital FM Ecosystem</h2>
        <p className="fern-signin-tagline">Trusted insights. Smarter decisions.<br />Better facilities.</p>
        <img className="fern-signin-team" src={teamImage} alt="Four FERN colleagues: an engineer, the FERN guide, a facilities colleague and a professional adviser." />
        <h3>One platform. Complete visibility.</h3>
        <div className="fern-signin-benefits">
          <div><Buildings size={26} aria-hidden="true"/><h4>Smart facilities</h4><p>Connected data across every site.</p></div>
          <div><ShieldCheck size={26} aria-hidden="true"/><h4>Trusted intelligence</h4><p>Guidance with governance and control.</p></div>
          <div><ChartBar size={26} aria-hidden="true"/><h4>Better outcomes</h4><p>Optimise cost, risk and performance.</p></div>
        </div>
        <p className="fern-signin-platform">FERN is an Amazon internal platform</p>
      </section>
      <header className="fern-signin-mobile-brand">
        <div><div className="fern-signin-brand"><strong>FERN</strong><img src={fernMark} alt="" /></div><p>Digital FM Ecosystem</p></div>
        <img className="fern-signin-mobile-guide" src={guideImage} alt="" />
      </header>

      <div className="fern-signin-form-panel">
        <div className="fern-signin-language flex justify-end"><span lang="en-US">English (US)</span></div>

        <div className="fern-signin-form-wrap">
          <div className="fern-signin-form-content">
            <h1
              className="font-extrabold mb-1.5"
              style={{
                fontSize: 32,
                color: "#0d2464",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Welcome to FERN
            </h1>
            <p className="fern-signin-intro text-sm" style={{ color: "#6b7280" }}>
              Preview access · Use username demo and password demo.
            </p>

            <form onSubmit={handleSignIn} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fern-signin-email" className="text-sm font-semibold" style={{ color: "#111827" }}>
                  Demo username
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <rect
                        x="1.5"
                        y="3.5"
                        width="14"
                        height="10"
                        rx="1.5"
                        stroke="#9ca3af"
                        strokeWidth="1.3"
                      />
                      <path
                        d="M1.5 5.5L8.5 9.5L15.5 5.5"
                        stroke="#9ca3af"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <input
                    id="fern-signin-email"
                    autoComplete="username"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter demo"
                    className="w-full text-sm rounded-lg border outline-none transition-all"
                    style={{
                      paddingLeft: 40,
                      paddingRight: 14,
                      paddingTop: 12,
                      paddingBottom: 12,
                      borderColor: error ? "#dc2626" : "#d1d5db",
                      color: "#111827",
                      background: "#fff",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#1a56db";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = error ? "#dc2626" : "#d1d5db";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="fern-signin-password" className="text-sm font-semibold" style={{ color: "#111827" }}>
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <rect
                        x="2.5"
                        y="7.5"
                        width="12"
                        height="8"
                        rx="1.5"
                        stroke="#9ca3af"
                        strokeWidth="1.3"
                      />
                      <path
                        d="M5.5 7.5V5C5.5 3.07 7.07 1.5 9 1.5C10.93 1.5 12.5 3.07 12.5 5V7.5"
                        stroke="#9ca3af"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                      <circle cx="8.5" cy="11.5" r="1.2" fill="#9ca3af" />
                    </svg>
                  </span>
                  <input
                    id="fern-signin-password"
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    className="w-full text-sm rounded-lg border outline-none transition-all"
                    style={{
                      paddingLeft: 40,
                      paddingRight: 44,
                      paddingTop: 12,
                      paddingBottom: 12,
                      borderColor: error ? "#dc2626" : "#d1d5db",
                      color: "#111827",
                      background: "#fff",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#1a56db";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = error ? "#dc2626" : "#d1d5db";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 hover:opacity-60 transition-opacity"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path
                          d="M1.5 9.5C1.5 9.5 4.5 3.5 9.5 3.5C14.5 3.5 17.5 9.5 17.5 9.5C17.5 9.5 14.5 15.5 9.5 15.5C4.5 15.5 1.5 9.5 1.5 9.5Z"
                          stroke="#6b7280"
                          strokeWidth="1.4"
                        />
                        <circle cx="9.5" cy="9.5" r="2.5" stroke="#6b7280" strokeWidth="1.4" />
                      </svg>
                    ) : (
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path
                          d="M1.5 9.5C1.5 9.5 4 4 9.5 4C15 4 17.5 9.5 17.5 9.5"
                          stroke="#6b7280"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                        <circle cx="9.5" cy="9.5" r="2.5" stroke="#6b7280" strokeWidth="1.4" />
                        <path
                          d="M3 16L16 3"
                          stroke="#6b7280"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm"
                  style={{
                    background: "rgba(220,38,38,0.07)",
                    color: "#dc2626",
                    border: "1px solid rgba(220,38,38,0.2)",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0">
                    <circle cx="7.5" cy="7.5" r="6.5" stroke="#dc2626" strokeWidth="1.3" />
                    <path
                      d="M7.5 4.5v3.5"
                      stroke="#dc2626"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <circle cx="7.5" cy="10.5" r="0.8" fill="#dc2626" />
                  </svg>
                  {error}
                </div>
              )}

              <p className="fern-signin-preview-note">This is a demonstration, not an Amazon account sign-in. You stay signed in on this tab until you sign out or close it.</p>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
                style={{
                  background: "#0051e8",
                  paddingTop: 14,
                  paddingBottom: 14,
                  fontSize: 15,
                }}
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>

              <p className="fern-signin-preview-note">Amazon sign-in and password recovery are not connected in this preview.</p>
            </form>
          </div>
        </div>

        {info && <section className="fern-signin-info" aria-label={info} role="region" aria-live="polite">
          <h2>{info}</h2>
          <p>{info==='Privacy information'?'Use only the published demo credentials. Do not enter your Amazon password or personal or operational information. This preview does not connect to Amazon identity services. An approved production privacy notice is not supplied here.':info==='Preview terms'?'This copy is for demonstration and review. It is not production approved and does not grant access to Amazon systems. Production terms and approvals must be provided before operational use.':'Enter demo as both the username and password, then select Sign in. Page links reopen the requested destination after sign-in. For feedback, contact the colleague who supplied this preview; no support ticket is submitted here.'}</p>
          <button type="button" onClick={()=>setInfo(null)}>Close information</button>
        </section>}
        <div className="fern-signin-legal flex items-center justify-center text-xs">
          <button onClick={()=>setInfo("Privacy information")} className="hover:underline px-1" style={{ color: "#1a56db" }}>
            Privacy information
          </button>
          <span style={{ color: "#d1d5db" }}>|</span>
          <button onClick={()=>setInfo("Preview terms")} className="hover:underline px-1" style={{ color: "#1a56db" }}>
            Preview terms
          </button>
          <span style={{ color: "#d1d5db" }}>|</span>
          <button onClick={()=>setInfo("Preview help")} className="hover:underline px-1" style={{ color: "#1a56db" }}>
            Preview help
          </button>
        </div>
      </div>
    </div>
  );
}
