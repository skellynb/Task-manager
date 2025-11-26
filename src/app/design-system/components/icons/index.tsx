import React from "react";
import {
  ListChecks as LucideListChecks,
  CircleCheckBig as LucideCircleCheckBig,
  ClipboardList as LucideClipboardList,
  EyeOff as LucideEyeOff,
  Hourglass as LucideHourglass,
  Logs as LucideLogs,
  NotebookPen as LucideNotebookPen,
  Sun as LucideSun,
  SunMoon as LucideSunMoon,
  LayoutDashboard as LucideDashboard
} from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// ListChecks
export const ListChecks = ({
  size = 20,
  className = "text-white",
  ...props
}: IconProps) => (
  <LucideListChecks
    size={size}
    className={`text-white ${className}`}
    {...props}
  />
);

// CircleCheckBig
export const CircleCheckBig = ({
  size = 20,
  className = "text-[#7D7B7B]",
  ...props
}: IconProps) => (
  <LucideCircleCheckBig size={size} className={className} {...props} />
);

// ClipboardList
export const ClipboardList = ({
  size = 20,
  className = "text-gray-600",
  ...props
}: IconProps) => (
  <LucideClipboardList size={size} className={className} {...props} />
);

// EyeOff
export const EyeOff = ({
  size = 20,
  className = "text-gray-600",
  ...props
}: IconProps) => (
  <LucideEyeOff size={size} className={className} {...props} />
);

// Hourglass
export const Hourglass = ({
  size = 20,
  className = "text-gray-600",
  ...props
}: IconProps) => (
  <LucideHourglass size={size} className={className} {...props} />
);

// Logs
export const Logs = ({
  size = 20,
  className = "text-gray-600",
  ...props
}: IconProps) => (
  <LucideLogs size={size} className={className} {...props} />
);

// NotebookPen
export const NotebookPen = ({
  size = 20,
  className = "text-gray-600",
  ...props
}: IconProps) => (
  <LucideNotebookPen size={size} className={className} {...props} />
);

// Sun
export const Sun = ({
  size = 20,
  className = "text-yellow-500",
  ...props
}: IconProps) => (
  <LucideSun size={size} className={className} {...props} />
);

// SunMoon
export const SunMoon = ({
  size = 20,
  className = "text-gray-600",
  ...props
}: IconProps) => (
  <LucideSunMoon size={size} className={className} {...props} />
);


// LayoutDashboard
export const LayoutDashboard = ({
  size = 20,
  className = "text-[#7D7B7B]",
  ...props
}: IconProps) => (
  <LucideDashboard size={size} className={className} {...props} />
);
