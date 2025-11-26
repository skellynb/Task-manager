"use client";

import Link from "next/link";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  category: "Work" | "Personal" | "Study";
};

type UserTasks = {
  [username: string]: Task[];
};

export default function AllTasks() {
  const currentUser = typeof window !== "undefined" ? localStorage.getItem("taskify_user") || "guest" : "guest";

  // Load current user's tasks only
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tasks");
      const allTasks: UserTasks = stored ? JSON.parse(stored) : {};
      return allTasks[currentUser] || [];
    }
    return [];
  });

  // Filters & search
  const [statusFilter, setStatusFilter] = useState<"All" | "Completed" | "Pending">("All");
  const [priorityFilter, setPriorityFilter] = useState<"All" | "Low" | "Medium" | "High">("All");
  const [categoryFilter, setCategoryFilter] = useState<"All" | "Work" | "Personal" | "Study">("All");
  const [search, setSearch] = useState("");

  // Save tasks for current user
  function saveTasks(updatedTasks: Task[]) {
    const stored = localStorage.getItem("tasks");
    const allTasks: UserTasks = stored ? JSON.parse(stored) : {};
    allTasks[currentUser] = updatedTasks;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    setTasks(updatedTasks);
  }

  function handleDelete(id: string) {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  }

  function toggleCompleted(id: string) {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTasks(updated);
  }

  // Apply filters & search
  const filteredTasks = tasks.filter((t) => {
    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Completed" && t.completed) ||
      (statusFilter === "Pending" && !t.completed);
    const priorityMatch = priorityFilter === "All" || t.priority === priorityFilter;
    const categoryMatch = categoryFilter === "All" || t.category === categoryFilter;
    const searchMatch = t.title.toLowerCase().includes(search.toLowerCase());

    return statusMatch && priorityMatch && categoryMatch && searchMatch;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "All" | "Completed" | "Pending")}
          className="border p-2 rounded"
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value as "All" | "Low" | "Medium" | "High")
          }
          className="border p-2 rounded"
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as "All" | "Work" | "Personal" | "Study")
          }
          className="border p-2 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks match your criteria.</p>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="border p-4 rounded shadow-sm flex flex-col gap-1"
            >
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task.id)}
                />
                <span
                  className={`font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}
                >
                  {task.title}
                </span>
              </label>

              <span
                className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-600"}`}
              >
                {task.description}
              </span>

              <div className="text-sm text-gray-500">
                <span>Due: {task.dueDate || "-"}</span>{" | "}
                <span>Priority: {task.priority}</span>{" | "}
                <span>Category: {task.category}</span>
              </div>

              <div className="flex gap-4 mt-1">
                <Link
                  href={`/tasks/${task.id}/edit`}
                  className="text-blue-600 underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
