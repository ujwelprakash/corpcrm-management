import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEmployees } from "../api/useEmployees";

/* ─── tiny helper: initials avatar ─── */
const Initials = ({ name }: { name: string }) => {
  const parts = name.trim().split(" ");
  const letters =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : name.slice(0, 2);
  return (
    <div style={avatarStyle}>
      {letters.toUpperCase()}
    </div>
  );
};

const avatarStyle: React.CSSProperties = {
  width: 72,
  height: 72,
  borderRadius: "50%",
  background: "rgb(var(--accent-light))",
  border: "2px solid rgb(var(--accent-border))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  fontWeight: 600,
  color: "rgb(var(--accent))",
  flexShrink: 0,
  letterSpacing: "0.05em",
};

/* ─── small badge ─── */
const Badge = ({ label }: { label: string }) => (
  <span style={badgeStyle}>{label}</span>
);

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "3px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 500,
  background: "rgb(var(--accent-light))",
  color: "rgb(var(--accent))",
  border: "1px solid rgb(var(--accent-border))",
  letterSpacing: "0.02em",
};

/* ─── detail row ─── */
const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div style={rowStyle}>
    <span style={labelStyle}>{label}</span>
    <span style={valueStyle}>{value ?? "—"}</span>
  </div>
);

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid rgb(var(--color-border))",
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  color: "rgb(var(--color-text-muted))",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const valueStyle: React.CSSProperties = {
  fontSize: 14,
  color: "rgb(var(--color-text))",
  fontWeight: 400,
};

/* ─── back button ─── */
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} style={backBtnStyle}
    onMouseEnter={e =>
      (e.currentTarget.style.background = "rgb(var(--color-bg-muted))")
    }
    onMouseLeave={e =>
      (e.currentTarget.style.background = "transparent")
    }
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    Back to Employees
  </button>
);

const backBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  fontSize: 13,
  fontWeight: 500,
  color: "rgb(var(--color-text-soft))",
  background: "transparent",
  border: "1px solid rgb(var(--color-border))",
  borderRadius: 8,
  padding: "6px 14px",
  cursor: "pointer",
  transition: "background 0.15s ease",
  marginBottom: 24,
};

/* ─── section card ─── */
const Card = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div style={cardStyle}>
    {title && <p style={cardTitleStyle}>{title}</p>}
    {children}
  </div>
);

const cardStyle: React.CSSProperties = {
  background: "rgb(var(--color-surface))",
  border: "1px solid rgb(var(--color-border))",
  borderRadius: 14,
  padding: "20px 24px",
  marginBottom: 16,
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgb(var(--color-text-muted))",
  margin: "0 0 16px",
};

/* ─── accent top-bar strip on the card ─── */
const HeroCard = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    ...cardStyle,
    borderTop: "3px solid rgb(var(--accent))",
    paddingTop: 24,
  }}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════
   Main Component
═══════════════════════════════════════════ */
const EmployeeDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useEmployees();

  const employee =
    state || data?.find((emp: any) => emp.id === Number(id));

  /* ── not found ── */
  if (!employee) {
    return (
      <div style={pageStyle}>
        <div style={{
          ...cardStyle,
          textAlign: "center",
          padding: "48px 24px",
          color: "rgb(var(--color-text-soft))",
        }}>
          <p style={{ fontSize: 15, marginBottom: 16 }}>Employee not found.</p>
          <button
            onClick={() => navigate("/hrm/employees")}
            style={{
              ...backBtnStyle,
              margin: "0 auto",
            }}
          >
            ← Back to Employees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* ── Back ── */}
      <BackButton onClick={() => navigate(-1)} />

      {/* ── Hero card ── */}
      <HeroCard>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Initials name={employee.name} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={nameStyle}>{employee.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
              {employee.role && <Badge label={employee.role} />}
              {employee.status && (
                <span style={{
                  ...badgeStyle,
                  background: employee.status === "Active"
                    ? "rgba(16,185,129,0.1)"
                    : "rgb(var(--color-bg-muted))",
                  color: employee.status === "Active"
                    ? "#10b981"
                    : "rgb(var(--color-text-muted))",
                  border: employee.status === "Active"
                    ? "1px solid rgba(16,185,129,0.25)"
                    : "1px solid rgb(var(--color-border))",
                }}>
                  {employee.status}
                </span>
              )}
            </div>
          </div>
          {employee.employeeId && (
            <span style={{
              fontSize: 12,
              color: "rgb(var(--color-text-muted))",
              fontVariantNumeric: "tabular-nums",
              flexShrink: 0,
            }}>
              #{employee.employeeId}
            </span>
          )}
        </div>
      </HeroCard>

      {/* ── Work info ── */}
      <Card title="Work">
        <DetailRow label="Department" value={employee.department} />
        <DetailRow label="Role" value={employee.role} />
        <DetailRow label="Location" value={employee.location} />
        <DetailRow label="Manager" value={employee.manager} />
        <div style={{ ...rowStyle, borderBottom: "none" }}>
          <span style={labelStyle}>Start Date</span>
          <span style={valueStyle}>{employee.startDate ?? "—"}</span>
        </div>
      </Card>

      {/* ── Contact info ── */}
      <Card title="Contact">
        <DetailRow label="Email" value={employee.email} />
        <div style={{ ...rowStyle, borderBottom: "none" }}>
          <span style={labelStyle}>Phone</span>
          <span style={valueStyle}>{employee.phone ?? "—"}</span>
        </div>
      </Card>
    </div>
  );
};

/* ─── page wrapper ─── */
const pageStyle: React.CSSProperties = {
  padding: "28px 24px",
  maxWidth: 920,
  margin: "0 auto",
  minHeight: "100vh",
  background: "rgb(var(--color-bg-soft))",
};

const nameStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 600,
  color: "rgb(var(--color-text))",
  margin: 0,
  lineHeight: 1.25,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default EmployeeDetails;