import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 rounded-xl p-6 ${
        hover ? "hover:border-emerald-500/50 transition-colors" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
