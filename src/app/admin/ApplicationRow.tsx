"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { approveRequest, rejectRequest } from "./actions";

type JoinRequestWithToken = {
  id: number;
  name: string;
  email: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  token: string | null;
};

export default function ApplicationRow({ app }: { app: JoinRequestWithToken }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    const result = await approveRequest(app.id);
    if (!result.success) {
      alert("Error approving request: " + result.error);
    }
    setIsProcessing(false);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    await rejectRequest(app.id);
    setIsProcessing(false);
  };

  const handleCopyLink = () => {
    if (app.token) {
      const inviteLink = `${window.location.origin}/signup?token=${app.token}`;
      navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <tr>
      <td data-label="Applicant Name">{app.name}</td>
      <td data-label="Email">{app.email}</td>
      <td data-label="Reason" style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={app.reason}>
        {app.reason}
      </td>
      <td data-label="Status">
        {app.status === 'pending' && <span className="dash-badge dash-badge--warning">Pending</span>}
        {app.status === 'approved' && <span className="dash-badge dash-badge--success">Approved</span>}
        {app.status === 'rejected' && <span className="dash-badge" style={{ background: "rgba(255,0,0,0.1)", color: "red" }}>Rejected</span>}
      </td>
      <td data-label="Actions">
        {app.status === 'pending' && (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button size="sm" variant="primary" onClick={handleApprove} disabled={isProcessing}>
              {isProcessing ? "..." : "Approve"}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleReject} disabled={isProcessing}>
              Reject
            </Button>
          </div>
        )}
        
        {app.status === 'approved' && app.token && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "var(--text-xs)", fontFamily: "monospace", background: "var(--bg-elevated)", padding: "4px 8px", borderRadius: "4px" }}>
              ...{app.token.substring(0, 8)}
            </span>
            <Button size="sm" variant="secondary" onClick={handleCopyLink}>
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        )}
        
        {app.status === 'rejected' && (
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>Processed</span>
        )}
      </td>
    </tr>
  );
}
