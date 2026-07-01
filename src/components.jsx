import {
  FaHome,
  FaDownload,
  FaBook,
  FaClipboard,
  FaShieldAlt,
  FaCaretDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
export function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar-logo">
        <img
          src="/Emblem_of_India.png"
          alt="Indian Emblem"
          className="indian-emblem"
        />
      </div>
      <div className="topbar-left">
        <div className="org-title">
          <div className="org-title-hi">राजस्थान सिविल रजिस्ट्रेशन प्रणाली</div>
          <div className="org-title-sub1">राजस्थान सरकार</div>
          <div className="org-title-sub2">आर्थिक एवं सांख्यिकी निदेशालय </div>
        </div>
      </div>
      <div className="topbar-center">
        <div className="brand-banner">
          <img
            src="/pehchan-logo.png"
            alt="Pehchan Logo"
            className="pehchan-logo"
          />
        </div>
      </div>
      <div className="topbar-right">
        <div className="org-title">
          <div className="org-title-hi">
            Rajasthan Civil Registration System
          </div>
          <div className="org-title-sub1">Government of Rajasthan</div>
          <div className="org-title-sub2">
            Directorate of Economics and Statistics
          </div>
        </div>
      </div>
      <div className="topbar-version">
        <img
          src="/VersionLogo.png"
          alt="Version Logo"
          className="version-logo"
        />
        <div className="ver-tag">Ver:7.16.2.26</div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="navbar-container">
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`navbar ${isOpen ? "active" : ""}`}>
        <span>
          <FaHome /> मुख्य पृष्ठ
        </span>
        <span>
          <FaDownload /> डाउनलोड <FaCaretDown />
        </span>
        <span>
          <FaBook /> प्रकाशन <FaCaretDown />
        </span>
        <span>
          <FaClipboard /> परिपत्र <FaCaretDown />
        </span>
        <span>
          <FaShieldAlt /> नियम व अधिनियम <FaCaretDown />
        </span>
        <div className="login-btn">👤 लॉगिन</div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="footer">
      <div className="footer-logos">
        <div className="footer-logo-block">
          <a
            href="https://raj.nic.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="nic-logo" src="/nic-logo.png"></img>
          </a>
        </div>
        <div className="footer-logo-block">
          <a
            href="https://rajasthan.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="sw-logo" src="/rajgov-logo.png"></img>
          </a>
        </div>
        <div className="footer-logo-block" style={{ textAlign: "center" }}>
          <div>
            <b>
              Designed, Developed and Hosted by National Informatics Centre,
              Rajasthan
            </b>
          </div>
          <div>
            <b>
              Content owned, updated and maintained by the Chief Registrar
              (Birth-Death), Rajasthan.
            </b>
          </div>
          <div>
            <b>
              Nodal Officer: Joint Director(Vital), Directorate of Economics and
              Statistics, Rajasthan.{" "}
            </b>
          </div>
          <div className="helpline" style={{ color: "red" }}>
            <b>
              Helpline (Toll Free) : 18001806785 (Office Hours){" "}
              <i style={{ color: "#000", padding: "0 5px" }}>✉</i>
              pehchan.raj@gov.in
            </b>
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="#disclaimer" style={{ color: "#fff" }}>
              Disclaimer
            </a>
          </div>
        </div>
        <div className="footer-logo-block">
          <a
            href="https://www.digitalindia.gov.in//"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="digital-india-logo"
              src="/digitalindia-logo.png"
            ></img>
          </a>
        </div>
        <div className="footer-logo-block">
          <a
            href="https://india.gov.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="rajasthan-logo" src="/indiagov-logo.png"></img>
          </a>
        </div>
      </div>
    </div>
  );
}
