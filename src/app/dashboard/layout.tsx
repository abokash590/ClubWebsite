"use client";

import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      <Sidebar type="user" />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1 className="dashboard-header__title">User Dashboard</h1>
        </header>
        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
}
