import CreateTaskForm from "./CreateTaskForm";

export default function CreateTaskPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      <CreateTaskForm />
    </div>
  );
}
