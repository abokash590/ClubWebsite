import "./Badge.css";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "upcoming" | "past" | "pending" | "active" | "completed" | "info";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}: BadgeProps) {
  return (
    <span className={`badge badge--${variant} badge--${size} ${className}`}>
      {children}
    </span>
  );
}
