import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuditDesk } from "@/components/audit-desk";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuditDesk />
  </StrictMode>,
);
