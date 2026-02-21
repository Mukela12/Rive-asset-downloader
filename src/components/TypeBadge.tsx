"use client";

interface TypeBadgeProps {
  type: "image" | "font" | "audio" | "unknown";
}

const COLORS: Record<TypeBadgeProps["type"], string> = {
  image: "bg-green-900/50 text-green-400 border-green-800",
  font: "bg-blue-900/50 text-blue-400 border-blue-800",
  audio: "bg-amber-900/50 text-amber-400 border-amber-800",
  unknown: "bg-gray-900/50 text-gray-400 border-gray-700",
};

export default function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <span
      className={`inline-block rounded-md border px-2 py-0.5 text-xs font-medium capitalize ${COLORS[type]}`}
    >
      {type}
    </span>
  );
}
