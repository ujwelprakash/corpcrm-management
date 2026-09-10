// src/layouts/Sidebar.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
const { t } = useTranslation("sidebar");

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Menu inside component so t() is always fresh on language change
  const menu = [
    { key: "dashboard", path: "/", icon: "⊞" },
    {
      key: "businessDev", icon: "◈",
      children: [
        { key: "clients",   path: "/biz/clients"    },
        { key: "sourcing",  path: "/biz/sourcing"   },
        { key: "candidate", path: "/biz/candidate"  },
      ],
    },
    {
      key: "onBoarding", icon: "◎",
      children: [
        { key: "onboarding",       path: "/onboard/main"         },
        { key: "requirementList",  path: "/onboard/requirements" },
        { key: "inductionReports", path: "/onboard/induction"    },
      ],
    },
    { key: "compliance", path: "/compliances", icon: "◻" },
    {
      key: "clientService", icon: "◇",
      children: [
        { key: "attendanceSalary",  path: "/cs/attendance"  },
        { key: "idVisiting",        path: "/cs/id"          },
        { key: "reimbursement",     path: "/cs/reimbursement"},
        { key: "grievance",         path: "/cs/grievance"   },
        { key: "incentive",         path: "/cs/incentive"   },
        { key: "resignation",       path: "/cs/resignation" },
        { key: "recruitmentTrack",  path: "/cs/recruitment" },
        { key: "designationManage", path: "/cs/designation" },
      ],
    },
    {
      key: "finance", icon: "◑",
      children: [
        { key: "salaryProcess",      path: "/finance/salary"      },
        { key: "ffTracker",          path: "/finance/ff"          },
        { key: "invoice",            path: "/finance/invoice"     },
        { key: "annexure",           path: "/finance/annexure"    },
        { key: "incentiveList",      path: "/finance/incentive"   },
        { key: "reimbursement",      path: "/finance/reimbursement"},
        { key: "bonus",              path: "/finance/bonus"       },
        { key: "idVisitingCard",     path: "/finance/id"          },
        { key: "leaveEncashment",    path: "/finance/leave"       },
        { key: "recruitmentTracker", path: "/finance/recruitment" },
        { key: "wageSheet",          path: "/finance/wage"        },
      ],
    },
    {
      key: "exitManagement", icon: "◐",
      children: [
        { key: "exitManagement", path: "/exit/manage" },
        { key: "ffDetails",      path: "/exit/ff"     },
      ],
    },
    {
      key: "hrm", icon: "◉",
      children: [
        { key: "employees",     path: "/hrm/employees" },
        { key: "hrmsDetails",   path: "/hrm/details"   },
        { key: "companyPolicy", path: "/hrm/policy"    },
        { key: "systemSetup",   path: "/hrm/setup"     },
        { key: "mails",         path: "/hrm/mails"     },
      ],
    },
    {
      key: "reports", icon: "◬",
      children: [
        { key: "manageCandidate",    path: "/reports/candidate"   },
        { key: "leaveEncashment",    path: "/reports/leave"       },
        { key: "annexureReport",     path: "/reports/annexure"    },
        { key: "resignation",        path: "/reports/resignation" },
        { key: "employeeOnBoarding", path: "/reports/onboarding"  },
        { key: "reimbursement",      path: "/reports/reimbursement"},
        { key: "grievanceReport",    path: "/reports/grievance"   },
        { key: "idVisitingDetails",  path: "/reports/id"          },
        { key: "recruitmentPayouts", path: "/reports/recruitment" },
        { key: "ffTrackerReport",    path: "/reports/ff"          },
        { key: "incentiveTracker",   path: "/reports/incentive"   },
        { key: "invoiceList",        path: "/reports/invoice"     },
      ],
    },
    {
      key: "userManagement", icon: "◯",
      children: [
        { key: "user", path: "/users/list"  },
        { key: "role", path: "/users/roles" },
      ],
    },
    { key: "messenger", path: "/messenger", icon: "◫" },
    {
      key: "settings", icon: "◌",
      children: [
        { key: "systemSettings",   path: "/settings/system"       },
        { key: "subscriptionPlan", path: "/settings/subscription" },
        { key: "order",            path: "/settings/order"        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-14 left-0 h-[calc(100vh-56px)] z-40 flex flex-col w-[248px]
          bg-[rgb(var(--color-surface))] border-r border-[rgb(var(--color-border-soft))]
          shadow-[2px_0_20px_rgba(0,0,0,0.08)]
          transition-transform duration-300 ease-in-out
          lg:fixed lg:translate-x-0 lg:z-auto lg:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo Header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-[rgb(var(--color-border-soft))] flex-shrink-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0"
            style={{ background: `rgb(var(--accent))` }}
          >
            C
          </div>
          <div>
            <p className="text-[14px] font-bold leading-none tracking-tight text-[rgb(var(--color-text))]">
              CorpCRM
            </p>
            <p className="text-[10px] leading-none mt-0.5 text-[rgb(var(--color-text-muted))]">
              Management Suite
            </p>
          </div>
          <span
            className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border"
            style={{
              color: `rgb(var(--accent))`,
              background: `rgb(var(--accent-light))`,
              borderColor: `rgb(var(--accent-border))`,
            }}
          >
            Pro
          </span>
          <button
            onClick={onClose}
            className="lg:hidden w-6 h-6 flex items-center justify-center rounded-md transition-colors ml-1 text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text))] hover:bg-[rgb(var(--color-bg-muted))]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 pb-2 sidebar-scroll">
          {menu.map((item) => {
            if (!item.children) {
              return (
                <NavLink
                  key={item.key}
                  to={item.path!}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] font-medium mb-0.5 transition-all duration-150 border
                    ${isActive ? "active-nav-item" : "inactive-nav-item"}`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? { background: `rgb(var(--accent-light))`, color: `rgb(var(--accent))`, borderColor: `rgb(var(--accent-border))` }
                      : { color: `rgb(var(--color-text-soft))`, borderColor: "transparent" }
                  }
                >
                  <span className="text-[12px] text-[rgb(var(--color-text-muted))]">{item.icon}</span>
                  {t(item.key)}
                </NavLink>
              );
            }

            const isExpanded = openMenus[item.key] ?? false;

            return (
              <div key={item.key} className="mb-0.5">
                <button
                  onClick={() => toggleMenu(item.key)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] font-medium transition-all duration-150 text-left"
                  style={{
                    color: isExpanded ? `rgb(var(--color-text))` : `rgb(var(--color-text-soft))`,
                    background: isExpanded ? `rgb(var(--color-bg-soft))` : "transparent",
                  }}
                >
                  <span className="text-[12px] text-[rgb(var(--color-text-muted))]">{item.icon}</span>
                  <span className="flex-1 text-left">{t(item.key)}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-mono"
                    style={{ color: `rgb(var(--color-text-muted))`, background: `rgb(var(--color-bg-muted))` }}
                  >
                    {item.children.length}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ml-0.5 ${isExpanded ? "rotate-90" : ""}`}
                    style={{ color: `rgb(var(--color-text-muted))` }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isExpanded ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div
                    className="ml-[22px] my-1 pl-3 flex flex-col gap-0.5 border-l-2"
                    style={{ borderColor: `rgb(var(--accent-border))` }}
                  >
                    {item.children.map((child, idx) => (
                      <NavLink
                        key={`${child.key}-${idx}`}
                        to={child.path}
                        onClick={onClose}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] transition-all duration-150"
                        style={({ isActive }) =>
                          isActive
                            ? { color: `rgb(var(--accent))`, background: `rgb(var(--accent-light))`, fontWeight: 600 }
                            : { color: `rgb(var(--color-text-muted))` }
                        }
                      >
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: `rgb(var(--color-border))` }} />
                        {t(child.key)}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* User Footer */}
        <div
          className="border-t px-3 py-3 flex-shrink-0"
          style={{ borderColor: `rgb(var(--color-border-soft))`, background: `rgb(var(--color-bg-soft))` }}
        >
          <div className="flex items-center gap-2.5 px-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0 shadow-sm"
              style={{ background: `rgb(var(--accent))` }}
            >
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold truncate leading-none text-[rgb(var(--color-text))]">Admin User</p>
              <p className="text-[10.5px] truncate mt-0.5 text-[rgb(var(--color-text-muted))]">admin@corpcrm.com</p>
            </div>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-all border border-transparent"
              style={{ color: `rgb(var(--color-text-muted))` }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 3px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: rgb(var(--color-border)); border-radius: 4px; }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: rgb(var(--color-border)); opacity: 0.8; }
        .inactive-nav-item:hover { background: rgb(var(--color-bg-soft)); color: rgb(var(--color-text)); }
      `}</style>
    </>
  );
};

export default Sidebar;