"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/src/types/task";
import { saveTaskToLocalStorage } from "@/src/lib/localStorage";
import { Card, CardHeader, CardFooter, CardTitle,
  CardContent, } from "@/src/components/ui/card";
import { Label, Headline } from "../../components/typography";
import { Button } from "@/src/components/ui/buttons";
import Link from "next/link";


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
    
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard" passHref>
          <Button className="flex items-center gap-2">
            <span className="text-lg font-semibold">&#8592;</span>
            <span>Back to Dashboard</span>
          </Button>
        </Link>

        <Headline className="text-2xl font-bold">Create Task</Headline>
      </div>
      
      <div className="min-h-screen flex justify-center items-center px-4">
    <Card className="max-w-md w-full">
      <CardHeader>
    <CardTitle>Create New Task</CardTitle>
  </CardHeader>
       <CardContent>
    <form className="space-y-4 max-w-md">
      <div>
        <Label className="block mb-1">Task Title</Label>
        <input
          type="text"
          className="w-full border border-4 border-[#645fc6] p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label className="block mb-1">Description</Label>
        <textarea
        className="w-full rounded border border-4 border-[#645fc6] p-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div>
        <Label className="block mb-1">Due Date</Label>
        <input
          type="date"
         className="w-full rounded border border-4 border-[#645fc6] p-2"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
      </div>

      <div>
        <Label className="block mb-1">Priority</Label>
        <select
         className="w-full rounded border border-4 border-[#645fc6] p-2"
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
       className="w-full rounded border border-4 border-[#645fc6] p-2"
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

       
      <CardFooter className="flex gap-4 px-0">   
      <div className="flex gap-4">
        <Button
          type="submit"
          onClick={(e) => handleSubmit(e, false)}
          className="text-white px-4 py-2 rounded"
        >
          Create Task & View All
        </Button>

        <Button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Another Task
        </Button>
      </div>
      </CardFooter>
    </form>
    </CardContent>
    </Card>
    </div>
    </div>
    
  );
}
