"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/src/components/ui/buttons";
import { Card } from "@/src/components/ui/card";
import { Label } from "../components/typography";
import { Headline, Subheading1, Body1, Body2 } from "../components/typography";

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
const currentUser =
typeof window !== "undefined"
? localStorage.getItem("taskify_user") || "guest"
: "guest";

const [tasks, setTasks] = useState<Task[]>(() => {
if (typeof window !== "undefined") {
const stored = localStorage.getItem("tasks");
const allTasks: UserTasks = stored ? JSON.parse(stored) : {};
return allTasks[currentUser] || [];
}
return [];
});

const [statusFilter, setStatusFilter] = useState<"All" | "Completed" | "Pending">("All");
const [priorityFilter, setPriorityFilter] = useState<"All" | "Low" | "Medium" | "High">("All");
const [categoryFilter, setCategoryFilter] = useState<"All" | "Work" | "Personal" | "Study">("All");
const [search, setSearch] = useState("");

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
<div className="flex items-center justify-between mb-6">
<Link href="/dashboard" passHref>
<Button className="flex items-center gap-2">
<span className="text-lg font-semibold">&#8592;</span>
<span>Back to Dashboard</span>
</Button>
</Link>

<Headline className="text-2xl font-bold">All Tasks</Headline>
</div>

{/* Filters & Search */}
<div className="flex flex-wrap gap-4 mb-6">

<input
type="text"
placeholder="Search by title..."
value={search}
onChange={(e) => setSearch(e.target.value)}
className="p-2 text-base  rounded"
/>
<Label>
<select
value={statusFilter}
onChange={(e) => setStatusFilter(e.target.value as "All" | "Completed" | "Pending")}
className=" p-2 rounded text-base  bg-[#3d3d47]"
>
<option value="All">All Status</option>
<option value="Completed">Completed</option>
<option value="Pending">Pending</option>
</select>
</Label>

<Label>
<select
value={priorityFilter}
onChange={(e) =>
setPriorityFilter(e.target.value as "All" | "Low" | "Medium" | "High")
}
className=" p-2 rounded text-base  bg-[#3d3d47]"
>
<option value="All">All Priorities</option>
<option value="Low">Low</option>
<option value="Medium">Medium</option>
<option value="High">High</option>
</select>
</Label>
<Label>
<select

value={categoryFilter}
onChange={(e) =>
setCategoryFilter(e.target.value as "All" | "Work" | "Personal" | "Study")
}
className=" p-2 rounded text-base  bg-[#3d3d47]"
>
<option value="All">All Categories</option>
<option value="Work">Work</option>
<option value="Personal">Personal</option>
<option value="Study">Study</option>
</select>
</Label>
</div>

{filteredTasks.length === 0 ? (
<p>No tasks match your criteria.</p>
) : (
<ul className="space-y-3">
{filteredTasks.map((task) => (
<li key={task.id} className="list-none">
<Card className="p-4 flex flex-col gap-2 shadow-sm w-full max-w-md">


  <Label className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => toggleCompleted(task.id)}
      className="w-5 h-5"
    />
    <Subheading1>
    <span
      className={`font-semibold ${
        task.completed ? "line-through text-gray-400" : ""
      }`}
    >
      {task.title}
    </span>
    </Subheading1>
  </Label>

  <Body1>
  <span
    className={`${
      task.completed ? "line-through text-gray-400" : "text-gray-600"
    }`}
  >
    {task.description}
  </span>
  </Body1>

  <Body2>
  <div className="text-gray-500">
    <span>Due: {task.dueDate || "-"}</span>{" | "}
    <span>Priority: {task.priority}</span>{" | "}
    <span>Category: {task.category}</span>
  </div>
  </Body2>

  <div className="flex gap-4 mt-1">
    <Link
      href={`/tasks/${task.id}/edit`}
      className="text-blue-600 underline"
    >
      Edit
    </Link>

    <button
      onClick={() => handleDelete(task.id)}
      className="text-[#3D3D47] underline cursor-pointer"
    >
      Delete
    </button>
  </div>

</Card>
</li>
))}
</ul>
)}

</div>
);
}
