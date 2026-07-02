import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChild } from "../api.js";
import { Topbar, Navbar, Footer } from "../components.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function RecordView() {
  const { token } = useParams();
  const [record, setRecord] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getChild(token);
        if (!cancelled) setRecord(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    // QR image is served directly from the backend at creation time normally;
    // for a direct page load/share, we re-request the create endpoint's QR
    // is not re-generated here to avoid duplicate inserts -- instead the
    // backend exposes the same record_url which we can re-render as a QR
    // using a lightweight client-side fallback if desired. For now we just
    // build the canonical record URL.
    setQrUrl(`${window.location.origin}/r/${token}`);

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-wrapper">
          <div className="spinner">
            {[...Array(12)].map((_, i) => (
              <span key={i} style={{ "--i": i + 1 }} />
            ))}
          </div>

          <div className="loading-text">LOADING</div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="center-message">
        {error}
        <br />
        <br />
        <a href="/" style={{ color: "#1a4f8a" }}>
          ← Back to registration form
        </a>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div className="cert-wrap">
        <div className="cert-banner">
          <p>Birth Certificate </p>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 150 320 220"
            height="1em"
            width="1em"
            fontSize="5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
          </svg>
        </div>
        <div className="cert-body">
          <div className="cert-row">
            <b>Registration No. :</b>{" "}
            <span className="val">{record.registration_number}</span>
          </div>
          <div className="cert-row">
            <b>Registration Date :</b>{" "}
            <span className="val">
              {new Date(record.created_at).toLocaleDateString("en-GB")}
            </span>
          </div>
          <div className="cert-row">
            <b>Date of Birth :</b> <span className="val">{record.dob}</span>
          </div>
          <div className="cert-row">
            <b>Child Name :</b> <span className="val">{record.child_name}</span>
          </div>
          <div className="cert-row">
            <b>Gender :</b> <span className="val">{record.gender}</span>
          </div>
          <div className="cert-row">
            <b>Father's Name :</b>{" "}
            <span className="val">{record.father_name}</span>
          </div>
          <div className="cert-row">
            <b>Mother's Name :</b>{" "}
            <span className="val">{record.mother_name}</span>
          </div>
          <div className="cert-row">
            <b>Place of Birth :</b>{" "}
            <span className="val">{record.place_of_birth}</span>
          </div>
          <div className="cert-row">
            <b>Signer's Name/Designation :</b>{" "}
            <span className="val">{record.signer_name}</span>
          </div>

          {/* <div className="qr-box">
            <img
              src={`${API_URL}api/childs/${token}/qr`}
              alt="QR code for this record"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
