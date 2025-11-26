export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;      // ISO date string, e.g., "2025-11-26"
  priority: "Low" | "Medium" | "High";
  category: string;     // e.g., "Work", "Personal", "Study"
};
