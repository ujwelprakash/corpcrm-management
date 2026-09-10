import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

// ── Auth Pages ─────────────────────────────
import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";

// ── Dashboard ──────────────────────────────
import Dashboard from "../modules/Dashboard/Pages/Dashboard";

// ── HRM Layout ─────────────────────────────
import HRMLayout from "../modules/hrm/Layout/HRMLayout";

// ── HRM Pages ──────────────────────────────
import Employees from "../modules/hrm/pages/Employees";
import AddEmployee from "../modules/hrm/pages/AddEmployee";
import HrmsDetails from "../modules/hrm/pages/HrmsDetails";
import CompanyPolicy from "../modules/hrm/pages/CompanyPolicy";
import SystemSetup from "../modules/hrm/pages/SystemSetup";
import Mailmanage from "../modules/hrm/pages/Mailmanage";

// ── HRM Components / Detail Pages ──────────
import EmployeeDetails from "../modules/hrm/components/EmployeeDetails";
import ClientList from "../modules/hrm/components/ClientList";

export const router = createBrowserRouter([

// ── Public Auth Routes ───────────────────
{
path: "/auth/login",
element: <Login />,
},

{
path: "/auth/register",
element: <Register />,
},

// ── Protected App Routes ─────────────────
{
path: "/",


element: (
  <ProtectedRoute>
    <MainLayout />
  </ProtectedRoute>
),

children: [

  // Dashboard
  {
    index: true,
    element: <Dashboard />,
  },

  // HRM Module
  {
    path: "hrm",
    element: <HRMLayout />,

    children: [
      {
        path: "clients/:clientId/list",
        element: <ClientList />,
      },

      {
        path: "employees",
        element: <Employees />,
      },

      {
        path: "employees/new",
        element: <AddEmployee />,
      },

      {
        path: "employees/:id",
        element: <EmployeeDetails />,
      },

      {
        path: "details",
        element: <HrmsDetails />,
      },

      {
        path: "policy",
        element: <CompanyPolicy />,
      },

      {
        path: "setup",
        element: <SystemSetup />,
      },

      {
        path: "mails",
        element: <Mailmanage />,
      },
    ],
  },
],

},
]);
