import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./pages/RegisterForm.jsx";
import RecordView from "./pages/RecordView.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import "./index.css";
import Layout from "./Layout.jsx";

function ProtectedAdmin({ children }) {
  const token = localStorage.getItem("wdr_admin_token");
  return token ? children : <Navigate to="/admin" replace />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/r/:token" element={<RecordView />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdmin>
                <AdminDashboard />
              </ProtectedAdmin>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
