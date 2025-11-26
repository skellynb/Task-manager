import EditTaskForm from "./EditTaskForm";
import { PageWrapper } from "@/src/app/components/layouts/PageWrapper";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTaskPage({ params }: EditPageProps) {
  const { id } = await params;

  return (
    <PageWrapper>
    
      <EditTaskForm taskId={id} />
    
    </PageWrapper>
  );
}
