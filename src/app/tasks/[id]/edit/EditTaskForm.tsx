"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  category: "Work" | "Personal" | "Study";
};

export default function EditTaskForm({ taskId }: { taskId: string }) {
  const router = useRouter();

  const [form, setForm] = useState(() => {
    const stored = localStorage.getItem("tasks");
    const tasks: Task[] = stored ? JSON.parse(stored) : [];
    const task = tasks.find((t) => t.id === taskId);

    return task
      ? {
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          priority: task.priority,
          category: task.category,
        }
      : {
          title: "",
          description: "",
          dueDate: "",
          priority: "Low" as "Low" | "Medium" | "High",
          category: "Work" as "Work" | "Personal" | "Study",
        };
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const stored = localStorage.getItem("tasks");
    if (!stored) return;

    const tasks: Task[] = JSON.parse(stored);

    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, ...form } : t
    );

    localStorage.setItem("tasks", JSON.stringify(updated));

    router.push("/tasks");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1">Task Title</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1">Due Date</label>
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1">Priority</label>
        <select
          className="w-full border p-2 rounded"
          value={form.priority}
          onChange={(e) =>
            setForm({
              ...form,
              priority: e.target.value as "Low" | "Medium" | "High",
            })
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Category</label>
        <select
          className="w-full border p-2 rounded"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value as "Work" | "Personal" | "Study",
            })
          }
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
}
