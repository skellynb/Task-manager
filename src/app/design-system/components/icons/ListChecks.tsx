import React from "react";
import { ListChecks as LucideListChecks } from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}
const ListChecks = ({ size = 20, className = "text-white", ...props }: IconProps) => {
  return (
    <LucideListChecks
      size={size}
      className={`text-white ${className}`}
      {...props}
    />
  );
};

export default ListChecks;
