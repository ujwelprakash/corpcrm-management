import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[rgb(var(--color-bg))]">

      {/* Navbar */}
      <Navbar onMenuToggle={() => setSidebarOpen(true)} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* ✅ KEY FIX HERE */}
        <main className="flex-1 overflow-y-auto lg:ml-[248px] p-4 sm:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;