import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { adminListChilds } from "../api.js";

function fmtDate(str) {
  if (!str) return "—";
  try {
    const d = new Date(str);
    return d.toLocaleDateString("en-GB");
  } catch {
    return str;
  }
}

export default function AdminDashboard() {
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  // const [downloading, setDownloading] = useState(null);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("wdr_admin_token");
  const LIMIT = 50;

  const logout = () => {
    localStorage.removeItem("wdr_admin_token");
    navigate("/admin");
  };

  const load = useCallback(
    async (pg = 1) => {
      if (!jwt) {
        navigate("/admin");
        return;
      }
      setLoading(true);
      setError("");
      try {
        const data = await adminListChilds(jwt, pg, LIMIT);
        setRecords(data.records);
        setTotal(data.total);
        setPage(pg);
      } catch (err) {
        if (err.message === "SESSION_EXPIRED") {
          localStorage.removeItem("wdr_admin_token");
          navigate("/admin");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [jwt, navigate],
  );

  useEffect(() => {
    load(1);
  }, [load]);

  const filtered = records.filter(
    (r) =>
      !search || r.created_at?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <>
      <div style={{ clear: "both" }} />
      <div className="page-title">
        Child Registry — Admin Panel
        <small>View all registered childs and download certificates</small>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          margin: "12px 10px",
        }}
      >
        <div
          className="btn"
          style={{ background: "red", borderRadius: 4 }}
          onClick={() => navigate("/")}
        >
          ↩ Back
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1100 }}>
        {/* Stats + search bar */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 16,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Stat cards */}
          {[
            { label: "Total Records", value: total, icon: "📜" },
            { label: "Today's Records", value: records.length, icon: "📝" },
            // { label: "Today's Page", value: page, icon: "📄" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff",
                border: "1px solid #a9c4de",
                borderRadius: 6,
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div>
                <div
                  style={{ fontSize: 20, fontWeight: "bold", color: "#1a4f8a" }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: "#555" }}>{s.label}</div>
              </div>
            </div>
          ))}

          {/* Search */}
          <div style={{ flex: 1, minWidth: 220 }}>
            <input
              type="text"
              placeholder="🔍 Search by child name, token..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "1px solid #9bb8d4",
                borderRadius: 4,
                fontSize: 13.5,
                background: "#fff",
              }}
            />
          </div>

          <button
            className="btn"
            onClick={() => load(page)}
            style={{ whiteSpace: "nowrap" }}
          >
            🔄 Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="error-banner" style={{ marginBottom: 12 }}>
            {error}
          </div>
        )}

        {/* Table */}
        <div className="form-card" style={{ overflowX: "auto" }}>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: 48,
                color: "#555",
                fontSize: 15,
              }}
            >
              Loading records...
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: 48,
                color: "#777",
                fontSize: 14,
              }}
            >
              {search ? "No records match your search." : "No records found."}
            </div>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr style={{ background: "#2566a8", color: "#fff" }}>
                  {[
                    "#",
                    "Reg. No.",
                    "Child Name",
                    "Gender",
                    "Place of Birth",
                    "Date of Birth",
                    "Signer Name",
                    "Registered On",
                    "#",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 10px",
                        textAlign: "left",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr
                    key={r.token}
                    style={{
                      background: i % 2 === 0 ? "#d9e8f7" : "#cfe2f4",
                      borderBottom: "1px solid #a9c4de",
                    }}
                  >
                    <td style={{ padding: "9px 10px", color: "#666" }}>
                      {(page - 1) * LIMIT + i + 1}
                    </td>
                    <td style={{ padding: "9px 10px" }}>
                      <a
                        href={`/r/${r.token}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#1a4f8a",
                          fontWeight: "bold",
                          fontFamily: "monospace",
                          fontSize: 13,
                        }}
                      >
                        {r.registration_number}
                      </a>
                    </td>
                    <td style={{ padding: "9px 10px", fontWeight: "bold" }}>
                      {r.child_name}
                    </td>
                    <td style={{ padding: "9px 10px" }}>
                      <span
                        style={{
                          background:
                            r.gender === "Male"
                              ? "#222"
                              : r.gender === "Female"
                                ? "#2a7a3a"
                                : "#c8960a",
                          color: "#fff",
                          padding: "2px 8px",
                          borderRadius: 10,
                          fontSize: 11,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.gender}
                      </span>
                    </td>
                    <td style={{ padding: "9px 10px" }}>{r.place_of_birth}</td>
                    <td style={{ padding: "9px 10px", whiteSpace: "nowrap" }}>
                      {fmtDate(r.dob)}
                    </td>
                    <td style={{ padding: "9px 10px" }}>{r.signer_name}</td>
                    <td style={{ padding: "9px 10px", whiteSpace: "nowrap" }}>
                      {fmtDate(r.created_at)}
                    </td>
                    <td style={{ padding: "9px 10px" }}>
                      {/* <button
                        className="btn"
                        style={{
                          fontSize: 12,
                          padding: "5px 12px",
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => handleDownload(r.token)}
                        disabled={downloading === r.token}
                      >
                        {downloading === r.token ? "⏳ ..." : "⬇ PDF"}
                      </button> */}
                      <button
                        className="btn"
                        style={{
                          fontSize: 12,
                          padding: "5px 12px",
                          whiteSpace: "nowrap",
                        }}
                        onClick={() =>
                          navigate(`/certificate/${r.token}`, "_blank")
                        }
                      >
                        ⬇ CERTIFICATE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginTop: 16,
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn secondary"
              onClick={() => load(page - 1)}
              disabled={page === 1}
              style={{ padding: "7px 16px", fontSize: 13 }}
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => load(p)}
                style={{
                  padding: "7px 12px",
                  fontSize: 13,
                  border: "none",
                  borderRadius: 3,
                  cursor: "pointer",
                  background: p === page ? "#1a4f8a" : "#c9dcef",
                  color: p === page ? "#fff" : "#1a4f8a",
                  fontWeight: p === page ? "bold" : "normal",
                }}
              >
                {p}
              </button>
            ))}
            <button
              className="btn secondary"
              onClick={() => load(page + 1)}
              disabled={page === totalPages}
              style={{ padding: "7px 16px", fontSize: 13 }}
            >
              Next →
            </button>
          </div>
        )}

        <div style={{ height: 32 }} />
      </div>

      {/* <div className="footer">
        <div>
          Westeros Child Registry (WDR) — Admin Panel &nbsp;|&nbsp;
          nic.drg.in
        </div>
        <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>
          Session expires after 10 hours. Logout when done.
        </div>
      </div> */}
    </>
  );
}
