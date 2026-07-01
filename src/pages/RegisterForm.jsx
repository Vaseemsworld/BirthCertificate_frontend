import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChild } from "../api.js";
import { FaEdit } from "react-icons/fa";

const initialState = {
  child_name: "",
  dob: "",
  gender: "Male",
  father_name: "",
  mother_name: "",
  place_of_birth: "",
  signer_name: "",
};

export default function RegisterForm() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (new Date(form.dob) > new Date()) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    if (
      !form.child_name ||
      !form.dob ||
      !form.gender ||
      !form.father_name ||
      !form.mother_name ||
      !form.place_of_birth ||
      !form.signer_name
    ) {
      setError("Please fill in all required (*) fields.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createChild(form);
      navigate(`/r/${result.token}`);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="main-container">
        <div className="content-container">
          <div className="form-container">
            <div className="page-title">
              <FaEdit />
              <small style={{ display: "inline", padding: "0 6px" }}>
                जन्म रिपोर्ट
              </small>
              <small>(प्रपत्र संख्या -1)</small>
            </div>

            <form className="container" onSubmit={handleSubmit}>
              <div className="form-card">
                <div className="form-cardcard">
                  <div className="form-card-title">(प्रपत्र संख्या -1)</div>
                  <div className="form-cardcard-header">
                    <div className="form-mode-row">
                      <label>
                        <input type="radio" name="mode" defaultChecked /> नए
                        आवेदन हेतु (New application)
                      </label>
                      <label>
                        <input type="radio" name="mode" disabled /> संशोधन हेतु
                        (For amendment){" "}
                        <small>(अभी उपलब्ध नहीं / Not available yet)</small>
                      </label>
                    </div>

                    {error && <div className="error-banner">{error}</div>}

                    <div className="field-row">
                      <div className="field-num">*1.</div>
                      <div className="field-label">
                        जन्म दिनांक (Date of Birth)
                      </div>
                      <div className="field-input">
                        <input
                          type="date"
                          value={form.dob}
                          max={new Date().toISOString().split("T")[0]}
                          onChange={(e) => update("dob", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field-num">*2.</div>
                      <div className="field-label">लिंग</div>
                      <div className="field-input">
                        <div className="radio-group">
                          {["Male", "Female", "Transgender"].map((c) => (
                            <label key={c}>
                              <input
                                type="radio"
                                name="gender"
                                value={c}
                                checked={form.gender === c}
                                onChange={(e) =>
                                  update("gender", e.target.value)
                                }
                              />
                              {c}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field-num">*3.</div>
                      <div className="field-label">
                        शिशु का नाम (Child name)
                      </div>
                      <div className="field-input">
                        <input
                          type="text"
                          value={form.child_name}
                          onChange={(e) => update("child_name", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field-num">*4.</div>
                      <div className="field-label">
                        पिता का नाम (Father's name)
                      </div>
                      <div className="field-input">
                        <input
                          type="text"
                          value={form.father_name}
                          onChange={(e) =>
                            update("father_name", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field-num">*5.</div>
                      <div className="field-label">
                        माता का नाम (Mother's name)
                      </div>
                      <div className="field-input">
                        <input
                          type="text"
                          value={form.mother_name}
                          onChange={(e) =>
                            update("mother_name", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field-num">*6.</div>
                      <div className="field-label">
                        जन्म स्थान (Place of birth)
                      </div>
                      <div className="field-input">
                        <input
                          type="text"
                          value={form.place_of_birth}
                          onChange={(e) =>
                            update("place_of_birth", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field-num">*7.</div>
                      <div className="field-label">
                        Signer's Name / Designation
                      </div>
                      <div className="field-input">
                        <input
                          type="text"
                          value={form.signer_name}
                          onChange={(e) =>
                            update("signer_name", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="declaration">
                      उपरोक्त सभी विवरण शुद्ध एवं सत्य है। (I declare the above
                      details to be true and correct.)
                    </div>

                    <div className="submit-row">
                      <button
                        type="submit"
                        className="btn"
                        disabled={submitting}
                      >
                        {submitting
                          ? "पंजीकरण हो रहा है... (Registering...)"
                          : "पंजीकरण करे (Register)"}
                      </button>
                      <button
                        type="button"
                        className="btn secondary"
                        onClick={() => {
                          setForm(initialState);
                          setError("");
                        }}
                      >
                        वापस जाये (Reset)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
