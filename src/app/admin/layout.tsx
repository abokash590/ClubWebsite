"use client";

import { Sidebar } from "@/components/layout/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      <Sidebar type="admin" />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1 className="dashboard-header__title">Admin Command Center</h1>
        </header>
        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
}
