"use client";

import { ComponentProps, ReactNode } from "react";

interface PreviewCanvasProps {
  RiveComponent: ((props: ComponentProps<"canvas">) => ReactNode) | null;
}

export default function PreviewCanvas({ RiveComponent }: PreviewCanvasProps) {
  return (
    <div
      className="checkerboard relative flex items-center justify-center overflow-hidden rounded-2xl border border-rive-border"
      style={{ height: 400 }}
    >
      {RiveComponent ? (
        <RiveComponent
          style={{
            width: "100%",
            height: "100%",
            touchAction: "none",
          }}
        />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-rive-text-muted">
            <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 17l3-4 2.5 3L16 12l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-xs text-rive-text-muted">Preview will appear here</p>
        </div>
      )}
    </div>
  );
}
