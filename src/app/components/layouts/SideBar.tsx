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
    
    <aside className="w-64 bg-muted h-screen p-6 border-r flex flex-col">
    <div className="flex items-center gap-3 mb-6">
      <ListChecks className="w-10 h-10 stroke-white" />
      <Subheading1 className="text-3xl font-bold text-white">Taskify</Subheading1>
      </div>

      <nav className="flex flex-col gap-4">
       <Link
    href="/dashboard"
    className="flex items-center gap-2 px-4 py-2 rounded-l-full
               hover:bg-[#645fc6] transition font-medium text-white"
  >
    <LayoutDashboard />
    <span>Dashboard</span>
  </Link>
        <Link href="/tasks" className="flex items-center gap-2 px-4 py-2 rounded-l-full
               hover:bg-[#645fc6] transition font-medium text-white">
          <Logs/> View All Tasks
        </Link>

        <Link href="/tasks/new" className="flex items-center gap-2 px-4 py-2 rounded-l-full
               hover:bg-[#645fc6] transition font-medium text-white">
          <ClipboardList/> Create New Task
        </Link>
      </nav>
     <div className="mt-auto">
       <button
  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
  className="
    mt-8 relative w-20 h-8 flex items-center
    bg-gray-300 dark:bg-gray-700
    rounded-full px-1 transition-colors
  "
>
  {/* Sun icon (Left) */}
  <Sun className="absolute left-2 h-4 w-4 text-yellow-500" />

  {/* Moon icon (Right) */}
  <SunMoon className="absolute right-2 h-4 w-4 text-blue-400" />

  {/* Sliding circle */}
  <span
    className={`
      absolute h-6 w-6 bg-white rounded-full shadow-md transform transition-transform
      ${theme === "light" ? "translate-x-0" : "translate-x-12"}
    `}
  />
</button>
<Link
  href="/"
  onClick={() => localStorage.removeItem("taskify_user")}
  className="text-red-400 underline text-sm hover:text-red-300"
>
  Logout
</Link>

</div>

    </aside>
  );
}
