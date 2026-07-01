import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./pages/RegisterForm.jsx";
import RecordView from "./pages/RecordView.jsx";
import "./index.css";
import Layout from "./Layout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/r/:token" element={<RecordView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
