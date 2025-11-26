import { Task } from "@/src/types/task";

export function saveTaskToLocalStorage(task: Task & { username: string }) {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem("tasks");
  const allTasks: Record<string, Task[]> = stored ? JSON.parse(stored) : {};

  const username = task.username;
  const userTasks = allTasks[username] || [];
  allTasks[username] = [...userTasks, task];

  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

export function getTasksFromLocalStorage(username: string): Task[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("tasks");
  const allTasks: Record<string, Task[]> = stored ? JSON.parse(stored) : {};
  return allTasks[username] || [];
}
