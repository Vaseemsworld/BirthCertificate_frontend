import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChild } from "../api.js";
import "../index.css";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function fmtDate(str) {
  if (!str) return "—";
  try {
    const d = str.slice(0, 10).split("-");
    return `${d[2]}/${d[1]}/${d[0]}`;
  } catch {
    return str;
  }
}

export default function Certificate() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // protect — admin only
    if (!localStorage.getItem("wdr_admin_token")) {
      navigate("/admin");
      return;
    }
    getChild(token)
      .then(setRecord)
      .catch((err) => setError(err.message));
  }, [token, navigate]);

  if (error)
    return (
      <div style={{ textAlign: "center", padding: 60, fontFamily: "Arial" }}>
        <p>{error}</p>
        <a href="/admin/dashboard" style={{ color: "#1a4f8a" }}>
          ← Back to dashboard
        </a>
      </div>
    );

  if (!record)
    return (
      <div style={{ textAlign: "center", padding: 60, fontFamily: "Arial" }}>
        Loading certificate...
      </div>
    );

  return (
    <>
      {/* ── Print button — hidden when printing ── */}
      <div
        className="no-print"
        style={{
          background: "linear-gradient(90deg,#1a4f8a,#2566a8)",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontFamily: "Arial",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          🐲 WDR Certificate — {record.child_name}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button
            onClick={() => window.print()}
            style={{
              background: "#fff",
              color: "#1a4f8a",
              border: "none",
              padding: "8px 20px",
              borderRadius: 4,
              fontWeight: "bold",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            🖨 Download / Print Certificate
          </button>
          <button
            onClick={() => navigate("/admin/dashboard")}
            style={{
              background: "transparent",
              color: "#fff",
              border: "1px solid #fff",
              padding: "8px 16px",
              borderRadius: 4,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            ✕ Close
          </button>
        </div>
      </div>
      {/* ── Certificate ── */}
      <div className="cert-page">
        <div className="cert-outer">
          <div className="cert-inner">
            {/* HEADER */}
            <div className="c-header">
              <img
                src="/emblem_black.jpg"
                alt="Emblem"
                className="emblem-img"
              />
              <img src="/bdslogo.jpg" alt="Bds Logo" className="bds-logo" />
            </div>
            <table className="cert-header-tbl">
              <tbody>
                <tr>
                  {/* QR code */}
                  <td className="ch-qr">
                    <img
                      src={`${API_URL}api/childs/${token}/qr`}
                      alt="QR Code"
                      className="qr-img"
                    />
                  </td>

                  {/* Center */}
                  <td className="ch-mid">
                    <div className="c-formno">
                      <p className="c-formno-hi"> प्रारूप संख्या 5</p>
                      <p className="c-formno-en"> FORM NO. 5</p>
                    </div>
                    <div className="c-org-hi">राजस्थान सरकार</div>
                    <div className="c-org-en">Government of Rajasthan</div>

                    <div className="c-dept-hi">
                      आर्थिक एवं सांख्यिकी निदेशालय
                    </div>
                    <div className="c-org-en">
                      Directorate of Economics & Statistics
                    </div>
                    <div className="c-registrar">
                      रजिस्ट्रार - बेलाका, उमरैन, अलवर
                      <br />
                      Registrar - BELAKA, UMRAIN, ALWAR
                    </div>
                    <div className="c-title-hi">जन्म प्रमाण पत्र</div>
                    <div className="c-title-en">BIRTH CERTIFICATE</div>
                    <div className="c-legal">
                      (जन्म और मृत्यु रजिस्ट्रीकरण अधिनियम, 1969 की धारा 12/17
                      और राजस्थान जन्म और मृत्यु रजिस्ट्रीकरण नियम, 2000 के नियम
                      8/13 के तहत जारी किया गया)
                      <br />
                      (Issued under Section 12/17 of the Registration of Births
                      and Deaths Act,1969 and Rule 8/13 of the Rajasthan
                      Registration of Births and Deaths Rules, 2000)
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="c-hr-bold" />

            {/* CERTIFYING PARAGRAPH */}
            <p className="c-para-hi">
              यह प्रमाणित किया जाता है कि निम्नलिखित जानकारी जन्म के मूल अभिलेख
              से ली गई है, जो कि (स्थानीय क्षेत्र/स्थानीय निकाय){" "}
              <strong>बेलाका</strong> तहसील/खण्ड <strong>उमरैन</strong> ज़िला{" "}
              <strong>अलवर</strong> राज्य/संघ राज्य{" "}
              <strong>राजस्थान, भारत</strong> का रजिस्टर है।
            </p>
            <p className="c-para-en">
              This is to certify that the following information has been taken
              from the original record of birth which is the register for (Local
              area / Local body) BELAKA of Tehsil / Block UMRAIN of District
              ALWAR of State / Union Territory Rajasthan, India.
            </p>

            {/* FIELDS */}
            <table className="c-fields">
              <tbody>
                <tr>
                  <td>
                    <div className="fl">
                      नाम/Name: <b>{record.child_name}</b>
                    </div>
                    {/* <div className="fv">{record.child_name}</div> */}
                  </td>
                  <td>
                    <div className="fl">
                      लिंग/Gender: <b> {record.gender} </b>
                    </div>
                    {/* <div className="fv">{record.gender}</div> */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="fl">
                      जन्म दिनांक/Date of Birth: <b>{fmtDate(record.dob)}</b>
                    </div>
                    {/* <div className="fv">{fmtDate(record.dob)}</div> */}
                  </td>
                  <td>
                    <div className="fl">
                      जन्म स्थान/Place of Birth: <b>{record.place_of_birth}</b>
                    </div>
                    {/* <div className="fv"></div> */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="fl">
                      माता का नाम/Name of Mother: <b>{record.mother_name}</b>
                    </div>
                    {/* <div className="fv"></div> */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="fl">
                      माता का आधार नंबर/Mother Aadhar No:{" "}
                      <b>{"********9087"}</b>
                    </div>
                    {/* <div className="fv"></div> */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="fl">
                      पिता का नाम/Father Name: <b>{record.father_name}</b>
                    </div>
                    <div className="fv"></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="fl">
                      पिता का आधार नंबर/Father Aadhar No:{" "}
                      <b>{"********5787"}</b>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="f1" style={{ fontSize: "12px" }}>
                      बच्चे के जन्म के समय माता-पिता का पता:{" "}
                    </div>
                  </td>
                  <td>
                    <div className="f1" style={{ fontSize: "12px" }}>
                      माता-पिता का स्थायी पता:{" "}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="f1" style={{ fontSize: "12px" }}>
                      Address of parents at the time of birth of the child :
                    </div>
                  </td>
                  <td>
                    <div className="f1" style={{ fontSize: "12px" }}>
                      Permanent Address of the parents :
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="fv">{"मन्नाका, तुलेरा, उमरेन, अलवर"}</div>
                    <div className="fv">
                      {"Mannaka, Toolera, Umrain, Alwar"}
                    </div>
                  </td>
                  <td>
                    <div className="fv">{"मन्नाका, तुलेरा, उमरेन, अलवर"}</div>
                    <div className="fv">
                      {"Mannaka, Toolera, Umrain, Alwar"}
                    </div>
                  </td>
                </tr>

                {/* <tr>
                  <td>
                    <div className="fl">स्वभाव / Temperament</div>
                    <div className="fv">{record.temperament || "—"}</div>
                  </td>
                  <td>
                    <div className="fl">सत्यापित / Verified by</div>
                    <div className="fv">Maester Aldric, Records Keeper</div>
                  </td>
                </tr> */}
              </tbody>
            </table>

            {/* <div className="c-hr-bold" /> */}

            {/* REGISTRATION NUMBER */}
            <table className="c-reg">
              <tbody>
                <tr>
                  <td>
                    <div className="rl">
                      रजिस्ट्रीकरण संख्या/Registration No :
                    </div>
                    <div className="rd">{record.registration_number}</div>
                  </td>
                  <td>
                    <div className="rl">
                      रजिस्ट्रीकरण की तारीख/Date of Registration :
                    </div>
                    <div className="rd">{fmtDate(record.created_at)}</div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="c-remarks">टिप्पणी / Remarks If Any :</div>

            {/* DATE + SIGNATURE */}
            <table className="c-bottom">
              <tbody>
                <tr>
                  <td>
                    <div className="sig-block">
                      Signed by: Vinay Kumar Sharma
                      <br />
                      Location: ALWAR, RJ, IN
                      <br />
                      Date: {fmtDate(record.created_at)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="date-issue">
                      जारी करने की तारीख / Date of Issue : &nbsp;
                      <strong>{fmtDate(record.created_at)}</strong>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="sig-line">
              जारी करने वाले प्राधिकारी के हस्ताक्षर / Signature of issuing
              authority
            </div>

            {/* FOOTER */}
            <div className="c-footer-notes">
              नोट: "बच्चे के जन्म के समय माता-पिता का वर्तमान पता" और "माता-पिता
              का स्थायी पता" कॉलम से संबंधित जानकारी 01/01/2007 से पहले लागू
              नहीं थी।
              <br />
              Note: Information in respect of the columns "Present address of
              parents at the time of birth of the child" and "Permanent address
              of parents" were not applicable before 01/01/2007
              <br />
              राजस्थान सरकार के अर्थ एवं सांख्यिकी विभाग द्वारा सर्कुलर नंबर
              F13/1/39/VS/DES/2013/22519 (दिनांक 02.06.2015) के तहत जन्म और
              मृत्यु प्रमाण पत्र जारी करने के लिए डिजिटल हस्ताक्षर के उपयोग को
              मान्यता दी गई है।
              <br />
              Use of digital records for dragon registration is recognized by
              the Office of the Master of Dragons vide circular WDR/7AC/2026.
            </div>
            <table className="c-footer-bottom">
              <tbody>
                <tr>
                  <td>
                    Software Courtesy National Informatics Centre (NIC),
                    Rajasthan
                  </td>
                  <td style={{ textAlign: "right" }}>
                    Certificate can be tracked on https://pehchan.raj.nic.in
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
