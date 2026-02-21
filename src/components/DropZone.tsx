"use client";

import { useCallback, useRef, useState } from "react";

interface DropZoneProps {
  onFile: (file: File) => void;
  filename: string | null;
}

export default function DropZone({ onFile, filename }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file?.name.endsWith(".riv")) {
        onFile(file);
      }
    },
    [onFile],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFile(file);
    },
    [onFile],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed px-6 py-10 transition-all duration-300 ${
        isDragging
          ? "border-rive-accent bg-rive-accent-muted"
          : "border-rive-border bg-rive-surface hover:border-rive-border-hover hover:bg-rive-surface-hover"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".riv"
        onChange={handleChange}
        className="hidden"
      />

      {/* Subtle glow on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-rive-accent-glow to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-col items-center">
        <div
          className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300 ${
            isDragging
              ? "border-rive-accent bg-rive-accent-muted text-rive-accent"
              : "border-rive-border bg-rive-bg text-rive-text-muted group-hover:border-rive-border-hover group-hover:text-rive-text-secondary"
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 16V4m0 0L8 8m4-4l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 17v1a2 2 0 002 2h12a2 2 0 002-2v-1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {filename ? (
          <div className="text-center">
            <p className="text-sm font-medium text-rive-accent">{filename}</p>
            <p className="mt-1 text-xs text-rive-text-muted">
              Drop another file to replace
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-rive-text-secondary">
              Drop a{" "}
              <span className="rounded bg-rive-accent-muted px-1.5 py-0.5 font-mono text-xs font-medium text-rive-accent">
                .riv
              </span>{" "}
              file here or{" "}
              <span className="font-medium text-rive-text underline decoration-rive-border-hover underline-offset-2">
                browse
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
