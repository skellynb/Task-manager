"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../layouts/SideBar";
import { StatCard } from "../dashboard/StatCard";
import { Task } from "@/src/types/task";
import { getTasksFromLocalStorage } from "@/src/lib/localStorage";
import { Headline } from "../typography";
import Link from "next/link";
import { Button } from "@/src/components/ui/buttons";

export function DashboardClient() {
  const router = useRouter();

  // Get username from localStorage
  const [username] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("taskify_user") || "";
    }
    return "";
  });

  // Load tasks for the current user
  const [tasks] = useState<Task[]>(() => {
    if (typeof window === "undefined" || !username) return [];
    return getTasksFromLocalStorage(username);
  });

  // Redirect if not logged in
  if (typeof window !== "undefined" && !username) {
    router.push("/login");
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Redirecting...</p>
      </div>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
  <div className="flex flex-col md:flex-row min-h-screen">
    <Sidebar />

    <main className="flex-1 p-4 sm:p-6 md:p-10">
      <Headline className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">
        Welcome, {username}!
      </Headline>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard title="Total Tasks" value={totalTasks} />
        <StatCard title="Completed Tasks" value={completedTasks} />
        <StatCard title="Pending Tasks" value={pendingTasks} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link href="/tasks" passHref>
          <Button className="flex justify-center items-center w-full sm:w-auto px-4 py-2 text-sm sm:text-base">
            View All Tasks
          </Button>
        </Link>

        <Link href="/tasks/new" passHref>
          <Button className="flex justify-center items-center w-full sm:w-auto px-4 py-2 text-sm sm:text-base">
            Create New Task
          </Button>
        </Link>
      </div>
    </main>
  </div>
);
}