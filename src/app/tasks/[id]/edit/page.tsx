import EditTaskForm from "./EditTaskForm";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTaskPage({ params }: EditPageProps) {
  const { id } = await params; // await params here

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <EditTaskForm taskId={id} /> {/* FIX: taskId */}
    </div>
  );
}
