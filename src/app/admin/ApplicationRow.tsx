"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { approveRequest, rejectRequest, getApplicationDetails } from "./actions";
import { ProfileCard } from "@/components/ui/ProfileCard";

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
  
  const [showModal, setShowModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [fullDetails, setFullDetails] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
  
  const handleViewDetails = async () => {
    setIsFetching(true);
    try {
      const details = await getApplicationDetails(app.id);
      setFullDetails(details);
      setShowModal(true);
    } catch (e) {
      alert("Failed to load details");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
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
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <Button size="sm" variant="outline" onClick={handleViewDetails} disabled={isFetching}>
              {isFetching ? "..." : "View"}
            </Button>

            {app.status === 'pending' && (
              <>
                <Button size="sm" variant="primary" onClick={handleApprove} disabled={isProcessing}>
                  Approve
                </Button>
                <Button size="sm" variant="ghost" onClick={handleReject} disabled={isProcessing}>
                  Reject
                </Button>
              </>
            )}
            
            {app.status === 'approved' && app.token && (
              <>
                <span style={{ fontSize: "var(--text-xs)", fontFamily: "monospace", background: "var(--bg-elevated)", padding: "4px 8px", borderRadius: "4px" }}>
                  ...{app.token.substring(0, 8)}
                </span>
                <Button size="sm" variant="secondary" onClick={handleCopyLink}>
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </>
            )}
          </div>
        </td>
      </tr>

      {/* Details Modal */}
      {showModal && fullDetails && mounted && createPortal(
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "var(--space-4)"
        }}>
          <div style={{
            background: "var(--surface-elevated)",
            padding: "var(--space-6)",
            borderRadius: "12px",
            width: "100%", maxWidth: "900px",
            maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
              <h2 style={{ fontSize: "var(--text-xl)" }}>Application Form View</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}>
                ✕
              </button>
            </div>
            
            <div style={{ display: "flex", gap: "var(--space-8)", flexWrap: "wrap" }}>
              {/* Left: Form Fields (Read-Only) */}
              <div style={{ flex: "1 1 400px" }}>
                <h3 style={{ marginBottom: "var(--space-4)", color: "var(--text-secondary)", fontSize: "var(--text-sm)", textTransform: "uppercase", letterSpacing: "1px" }}>Submitted Details</h3>
                
                <pre style={{ fontSize: "10px", background: "black", color: "lime", padding: "8px", overflow: "auto" }}>
                  {JSON.stringify(fullDetails, null, 2)}
                </pre>

                <div style={{ display: "grid", gap: "var(--space-4)" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-tertiary)", marginBottom: "4px" }}>Full Name</label>
                    <input readOnly value={fullDetails.name || ""} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", background: "var(--surface-secondary)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-tertiary)", marginBottom: "4px" }}>Student ID</label>
                      <input readOnly value={fullDetails.student_id || ""} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", background: "var(--surface-secondary)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-tertiary)", marginBottom: "4px" }}>Reg No.</label>
                      <input readOnly value={fullDetails.registration_number || ""} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", background: "var(--surface-secondary)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-tertiary)", marginBottom: "4px" }}>Batch</label>
                      <input readOnly value={fullDetails.batch || ""} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", background: "var(--surface-secondary)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-tertiary)", marginBottom: "4px" }}>Email</label>
                      <input readOnly value={fullDetails.email || ""} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", background: "var(--surface-secondary)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-tertiary)", marginBottom: "4px" }}>Reason for Joining</label>
                    <textarea readOnly value={fullDetails.reason || ""} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", background: "var(--surface-secondary)", border: "1px solid var(--border-default)", color: "var(--text-primary)", minHeight: "80px", resize: "none" }} />
                  </div>
                  
                  <h4 style={{ marginTop: "var(--space-2)", borderBottom: "1px solid var(--border-default)", paddingBottom: "4px", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>Social Links</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                    {['linkedin', 'github', 'facebook', 'discord', 'codeforces', 'codechef'].map(net => (
                      <div key={net}>
                        <label style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-tertiary)", marginBottom: "4px", textTransform: "capitalize" }}>{net}</label>
                        <input readOnly value={fullDetails[net] || ""} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", background: "var(--surface-secondary)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Card Preview */}
              <div style={{ flex: "0 0 300px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                 <h3 style={{ marginBottom: "var(--space-4)", color: "var(--text-secondary)", fontSize: "var(--text-sm)", textTransform: "uppercase", letterSpacing: "1px" }}>Card Preview</h3>
                 <div style={{ width: "100%", pointerEvents: "none" }}>
                   <ProfileCard 
                     slug={`app-${fullDetails.id}`}
                     onCardClick={() => {}}
                     name={fullDetails.name}
                     role="MEMBER"
                     sublabel={fullDetails.registration_number ? `REG: ${fullDetails.registration_number}` : "NEW"}
                     batch={fullDetails.batch || "BATCH N/A"}
                     category="member"
                     image={fullDetails.photo_base64 || undefined}
                     socials={{
                       linkedin: fullDetails.linkedin || undefined,
                       github: fullDetails.github || undefined,
                       email: fullDetails.email || undefined,
                       facebook: fullDetails.facebook || undefined,
                       codeforces: fullDetails.codeforces || undefined,
                     }}
                   />
                 </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
