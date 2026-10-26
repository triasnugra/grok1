import { createFileRoute } from "@tanstack/react-router";
import { AuditDesk } from "@/components/audit-desk";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <AuditDesk />;
}
