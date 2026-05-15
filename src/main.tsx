import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Admin from "./pages/Admin";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento #root nao encontrado.");
}

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={baseUrl || undefined}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
