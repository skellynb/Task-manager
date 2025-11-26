"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardFooter, CardTitle,
  CardContent, } from "@/src/components/ui/card";
import { Label, Headline } from "@/src/app/components/typography";
import { Button } from "@/src/components/ui/buttons";
import Link from "next/link";



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

export default function EditTaskForm({ taskId }: { taskId: string }) {
  const router = useRouter();
  const currentUser = typeof window !== "undefined" ? localStorage.getItem("taskify_user") || "guest" : "guest";

  // Load user tasks
  const [form, setForm] = useState(() => {
    const stored = localStorage.getItem("tasks");
    const allTasks: UserTasks = stored ? JSON.parse(stored) : {};
    const userTasks = allTasks[currentUser] || [];
    const task = userTasks.find((t) => t.id === taskId);

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
    const allTasks: UserTasks = stored ? JSON.parse(stored) : {};
    const userTasks = allTasks[currentUser] || [];

    const updatedTasks = userTasks.map((t) =>
      t.id === taskId ? { ...t, ...form } : t
    );

    allTasks[currentUser] = updatedTasks;
    localStorage.setItem("tasks", JSON.stringify(allTasks));

    router.push("/tasks");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Link href="/tasks" passHref>
          <Button className="flex items-center gap-2">
            <span className="text-lg font-semibold">&#8592;</span>
            <span>Back to Tasks</span>
          </Button>
        </Link>

        <Headline className="text-2xl font-bold">Edit Task</Headline>
      </div>
      <div className="min-h-screen flex justify-center items-center px-4">
    <Card className="max-w-md w-full">
      <CardHeader>
    <CardTitle>Edit Task</CardTitle>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <Label className="block mb-1">Task Title</Label>
        <input
          type="text"
          className="w-full border border-4 border-[#645fc6] p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      <div>
        <Label className="block mb-1">Description</Label>
        <textarea
          className="w-full border border-4 border-[#645fc6] p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div>
        <Label className="block mb-1">Due Date</Label>
        <input
          type="date"
          className="w-full border border-4 border-[#645fc6] p-2 rounded"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
      </div>

      <div>
        <Label className="block mb-1">Priority</Label>
        <select
          className="w-full border border-4 border-[#645fc6] p-2 rounded"
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
        <Label className="block mb-1">Category</Label>
        <select
          className="w-full border border-4 border-[#645fc6] p-2 rounded"
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

       <CardFooter className="flex justify-center">  
      <Button>
        Save Changes
      </Button>
      </CardFooter>
    </form>
    </CardContent>
    </Card>
    </div>
    </div>
    
  );
}
