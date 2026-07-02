import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api.js";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setLoading(true);
    try {
      const data = await adminLogin(username, password);
      localStorage.setItem("wdr_admin_token", data.access_token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Topbar */}
      {/* <div className="topbar">
        <div className="topbar-left">
          <div className="logo-circle">🐲</div>
          <div>
            <div className="org-title-hi">वेस्टेरॉस ड्रैगन रजिस्ट्रेशन प्रणाली</div>
            <div className="org-title-sub">Westeros Dragon Registration System</div>
          </div>
        </div>
        <div className="topbar-center">
          <div className="brand-banner">DRACARYS</div>
          <div className="brand-sub">Office of the Master of Dragons</div>
        </div>
        <div className="topbar-right">
          <div className="seal-circle">🔥</div>
          <div className="ver-tag">Ver:7.16.2.26</div>
        </div>
      </div> */}

      {/* Login card */}
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <div style={{ width: "100%", maxWidth: 400 }}>
          <div className="form-card">
            {/* Card header */}
            <div
              style={{
                background: "linear-gradient(135deg, #1a4f8a, #2566a8)",
                color: "#fff",
                textAlign: "center",
                padding: "24px 16px",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 8 }}>🔐</div>
              <div style={{ fontWeight: "bold", fontSize: 16 }}>
                Admin Portal
              </div>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>
                Westeros Dragon Registration System
              </div>
            </div>

            <div style={{ padding: "24px 24px 8px" }}>
              {error && (
                <div className="error-banner" style={{ marginBottom: 16 }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      marginBottom: 5,
                      fontWeight: "bold",
                      color: "#1a4f8a",
                    }}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    style={{
                      width: "100%",
                      padding: "9px 10px",
                      border: "1px solid #9bb8d4",
                      borderRadius: 3,
                      fontSize: 14,
                    }}
                    autoFocus
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      marginBottom: 5,
                      fontWeight: "bold",
                      color: "#1a4f8a",
                    }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    style={{
                      width: "100%",
                      padding: "9px 10px",
                      border: "1px solid #9bb8d4",
                      borderRadius: 3,
                      fontSize: 14,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: 15,
                    marginBottom: 16,
                  }}
                >
                  {loading ? "Logging in..." : "Login to Admin Panel"}
                </button>
              </form>
            </div>

            <div style={{ textAlign: "center", padding: "0 24px 20px" }}>
              <a href="/" style={{ fontSize: 13, color: "#1a4f8a" }}>
                ← Back to Registration Form
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="footer">
        <div>Westeros Child Registry (WDR) &nbsp;|&nbsp; nic.drg.in</div>
      </div> */}
    </>
  );
}
