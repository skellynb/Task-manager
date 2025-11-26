import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card";
import { ClipboardList } from "../../design-system/components/icons";

interface StatCardProps {
  title: string;
  value: number;
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="px-0 flex flex-col items-center justify-center">
        <ClipboardList className="h-8 w-8" />
        <CardTitle className="text-lg text-muted-foreground">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
