"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../layouts/SideBar";
import { StatCard } from "../dashboard/StatCard";

export function DashboardClient() {
  const router = useRouter();
  
  // Initialize username from localStorage (only runs once on mount)
  const [username] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("taskify_user") || "";
    }
    return "";
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!username) {
      router.push("/login");
    }
  }, [username, router]);

  // Don't render if no username
  if (!username) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Redirecting...</p>
      </div>
    );
  }

  // Example numbers — later replace with real task data
  const totalTasks = 12;
  const completedTasks = 5;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-10">
        <h2 className="text-2xl font-semibold mb-6">
          Welcome, {username}!
        </h2>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Tasks" value={totalTasks} />
          <StatCard title="Completed Tasks" value={completedTasks} />
          <StatCard title="Pending Tasks" value={pendingTasks} />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4">
          <a
            href="/tasks"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            View All Tasks
          </a>

          <a
            href="/tasks/new"
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Create New Task
          </a>
        </div>
      </main>
    </div>
  );
}