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

// Save to localStorage 
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
  <div className="min-h-screen p-4 sm:p-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <Link href="/dashboard" passHref>
        <Button className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-lg font-semibold">&#8592;</span>
          <span>Back to Dashboard</span>
        </Button>
      </Link>

      <Headline className="text-xl sm:text-2xl font-bold">Create Task</Headline>
    </div>

    {/* Form Container */}
    <div className="flex justify-center items-start sm:items-center py-4 sm:py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Create New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label className="block mb-1 text-sm sm:text-base">Task Title</Label>
              <input
                type="text"
                className="w-full border border-4 border-[#645fc6] p-2 rounded text-sm sm:text-base"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="block mb-1 text-sm sm:text-base">Description</Label>
              <textarea
                className="w-full rounded border border-4 border-[#645fc6] p-2 min-h-[80px] text-sm sm:text-base"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div>
              <Label className="block mb-1 text-sm sm:text-base">Due Date</Label>
              <input
                type="date"
                className="w-full rounded border border-4 border-[#645fc6] p-2 text-sm sm:text-base"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>

            <div>
              <Label className="block mb-1 text-sm sm:text-base">Priority</Label>
              <select
                className="w-full rounded border border-4 border-[#645fc6] p-2 text-sm sm:text-base"
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
              <Label className="block mb-1 text-sm sm:text-base">Category</Label>
              <select
                className="w-full rounded border border-4 border-[#645fc6] p-2 text-sm sm:text-base"
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

            <CardFooter className="flex flex-col sm:flex-row gap-2 px-0 pt-4">
              <Button
                type="submit"
                onClick={(e) => handleSubmit(e, false)}
                className="text-white px-3 py-2 rounded w-full sm:w-auto text-xs sm:text-sm whitespace-nowrap"
              >
                Create & View All
              </Button>

              <Button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="bg-green-600 text-white px-3 py-2 rounded w-full sm:w-auto text-xs sm:text-sm whitespace-nowrap"
              >
                Create Another
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
);
}