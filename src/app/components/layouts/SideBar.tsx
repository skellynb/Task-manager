"use client";

import Link from "next/link";

import { ListChecks, LayoutDashboard, Logs, ClipboardList,
  Sun, SunMoon
 } from "../../design-system/components/icons";
import { Subheading1 } from "../typography";
import { useTheme } from "next-themes";




export function Sidebar() {
  const { theme, setTheme } = useTheme();
   return (
  <aside className="w-full md:w-64 bg-muted h-auto md:min-h-screen p-4 sm:p-6 border-r flex flex-col">
    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
      <ListChecks className="w-8 h-8 sm:w-10 sm:h-10 stroke-white" />
      <Subheading1 className="text-2xl sm:text-3xl font-bold text-white">
        Taskify
      </Subheading1>
    </div>

    <nav className="flex flex-col gap-3 sm:gap-4">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-l-full
                   hover:bg-[#645fc6] transition font-medium text-white text-sm sm:text-base"
      >
        <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6" />
        <span>Dashboard</span>
      </Link>

      <Link
        href="/tasks"
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-l-full
                   hover:bg-[#645fc6] transition font-medium text-white text-sm sm:text-base"
      >
        <Logs className="w-5 h-5 sm:w-6 sm:h-6" />
        <span>View All Tasks</span>
      </Link>

      <Link
        href="/tasks/new"
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-l-full
                   hover:bg-[#645fc6] transition font-medium text-white text-sm sm:text-base"
      >
        <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />
        <span>Create New Task</span>
      </Link>
    </nav>

    <div className="mt-4 md:mt-auto space-y-3 sm:space-y-4">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="
          relative w-16 sm:w-20 h-7 sm:h-8 flex items-center
          bg-gray-300 dark:bg-gray-700
          rounded-full px-1 transition-colors
        "
      >
        {/* Sun icon (Left) */}
        <Sun className="absolute left-1.5 sm:left-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500" />

        {/* Moon icon (Right) */}
        <SunMoon className="absolute right-1.5 sm:right-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />

        {/* Sliding circle */}
        <span
          className={`
            absolute h-5 w-5 sm:h-6 sm:w-6 bg-white rounded-full shadow-md transform transition-transform
            ${theme === "light" ? "translate-x-0" : "translate-x-9 sm:translate-x-12"}
          `}
        />
      </button>

      <Link
        href="/"
        onClick={() => localStorage.removeItem("taskify_user")}
        className="block text-red-400 underline text-xs sm:text-sm hover:text-red-300"
      >
        Logout
      </Link>
    </div>
  </aside>
);
}