import React, { useState } from "react";
import Branch from "../components/branch/Branch";
import Department from "../components/branch/Department";
import Designation from "../components/branch/Designation";
import AllowanceOption from "../components/branch/AllowanceOption";
import LoanOption from "../components/branch/LoanOption";
import DeductionOption from "../components/branch/DeductionOption";
import DocumentType from "../components/branch/DocumentType";
import PayslipType from "../components/branch/PayslipType";
import LeaveType from "../components/branch/LeaveType";
import AwardType from "../components/branch/AwardType";
import TerminationType from "../components/branch/TerminationType";


const menuItems = [
  { key: "branch",          label: "Branch" },
  { key: "department",      label: "Department" },
  { key: "designation",     label: "Designation" },
  { key: "allowance",       label: "Allowance Option" },
  { key: "loan",            label: "Loan Option" },
  { key: "deduction",       label: "Deduction Option" },
  { key: "documentType",    label: "Document Type" },
  { key: "payslipType",     label: "Payslip Type" },
  { key: "leaveType",       label: "Leave Type" },
  { key: "awardType",       label: "Award Type" },
  { key: "terminationType", label: "Termination Type" },
];

const SystemSetup = () => {
  const [active, setActive] = useState("branch");

  const componentMap: Record<string, React.ReactNode> = {
    branch:          <Branch />,
    department:      <Department />,
    designation:     <Designation />,
    allowance:       <AllowanceOption />,
    loan:            <LoanOption />,
    deduction:       <DeductionOption />,
    documentType:    <DocumentType />,
    payslipType:     <PayslipType />,
    leaveType:       <LeaveType />,
    awardType:       <AwardType />,
    terminationType: <TerminationType />,
  };

  return (
    <div className="p-6 bg-[rgb(var(--color-bg-soft))] min-h-screen">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[rgb(var(--color-text))]">System Setup</h1>
        <p className="text-sm text-[rgb(var(--color-text-muted))] mt-0.5">
          <span className="text-[rgb(var(--accent))] cursor-pointer">Dashboard</span> › System Setup
        </p>
      </div>

      <div className="flex gap-5 items-start">
        {/* Sidebar */}
        <div className="w-64 shrink-0 bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-xl overflow-hidden">
          {menuItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm transition-colors border-b border-[rgb(var(--color-border))] last:border-0"
              style={
                active === item.key
                  ? { background: "rgb(var(--accent))", color: "#fff", fontWeight: 500 }
                  : { color: "rgb(var(--color-text-soft))", background: "transparent" }
              }
            >
              {item.label}
              <span style={{ opacity: active === item.key ? 1 : 0.4 }}>›</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {componentMap[active]}
        </div>
      </div>
    </div>
  );
};

export default SystemSetup;