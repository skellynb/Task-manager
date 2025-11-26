"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/src/types/task";
import { saveTaskToLocalStorage } from "@/src/lib/localStorage";

export default function CreateTaskForm() {
  const router = useRouter();

  const currentUser =
    typeof window !== "undefined"
      ? localStorage.getItem("taskify_user") || "guest"
      : "guest";

  const initialForm = {
    title: "",
    description: "",
    dueDate: "",
    priority: "Low" as "Low" | "Medium" | "High",
    category: "Work" as "Work" | "Personal" | "Study",
  };

  const [form, setForm] = useState(initialForm);

  function handleSubmit(e: React.FormEvent, stayOnForm = false) {
    e.preventDefault();

    const newTask: Task & { username: string } = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      completed: false,
      dueDate: form.dueDate,
      priority: form.priority,
      category: form.category,
      username: currentUser,
    };

    // Save to localStorage via utility
    saveTaskToLocalStorage(newTask);

    if (stayOnForm) {
      // Reset form to create another task
      setForm(initialForm);
    } else {
      // Redirect to All Tasks
      router.push("/tasks");
    }
  }

  return (
    <form className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1">Task Title</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
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
            setForm({ ...form, priority: e.target.value as "Low" | "Medium" | "High" })
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
            setForm({ ...form, category: e.target.value as "Work" | "Personal" | "Study" })
          }
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          onClick={(e) => handleSubmit(e, false)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Task & View All
        </button>

        <button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Another Task
        </button>
      </div>
    </form>
  );
}
