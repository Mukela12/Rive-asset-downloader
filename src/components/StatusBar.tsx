"use client";

import { useState } from "react";
import type { AssetEntry } from "./AssetTable";

interface StatusBarProps {
  status: "idle" | "loading" | "ready" | "error";
  assets: AssetEntry[];
  error: string | null;
  filename: string | null;
}

export default function StatusBar({ status, assets, error, filename }: StatusBarProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAll = async () => {
    if (assets.length === 0) return;
    setIsDownloading(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      const manifest: Record<string, unknown>[] = [];

      for (const asset of assets) {
        const folder = asset.type === "unknown" ? "other" : `${asset.type}s`;
        const ext = asset.fileExtension ? `.${asset.fileExtension}` : "";
        const fileName = `${asset.name}${ext}`;
        zip.file(`${folder}/${fileName}`, asset.bytes);
        manifest.push({
          name: asset.name,
          type: asset.type,
          extension: asset.fileExtension,
          size: asset.bytes.length,
          path: `${folder}/${fileName}`,
        });
      }

      zip.file("manifest.json", JSON.stringify(manifest, null, 2));

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename
        ? `${filename.replace(/\.riv$/i, "")}-export.zip`
        : "rive-export.zip";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  const statusIcon = () => {
    switch (status) {
      case "idle":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-rive-text-muted">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case "loading":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin text-rive-accent">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
            <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case "error":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-red-400">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M15 9l-6 6m0-6l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case "ready":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green-400">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  const statusText = () => {
    switch (status) {
      case "idle":
        return "Drop a .riv file to get started";
      case "loading":
        return "Loading...";
      case "error":
        return error || "Failed to load file";
      case "ready":
        return `${assets.length} asset${assets.length !== 1 ? "s" : ""} found`;
    }
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-rive-border bg-rive-surface px-5 py-3">
      <div className="flex items-center gap-2">
        {statusIcon()}
        <p
          className={`text-sm ${
            status === "error" ? "text-red-400" : "text-rive-text-secondary"
          }`}
        >
          {statusText()}
        </p>
      </div>

      {status === "ready" && assets.length > 0 && (
        <button
          onClick={handleDownloadAll}
          disabled={isDownloading}
          className="flex items-center gap-2 rounded-lg bg-rive-accent px-4 py-1.5 text-sm font-medium text-rive-bg transition-colors hover:bg-rive-accent-hover disabled:opacity-50"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 17v1a2 2 0 002 2h12a2 2 0 002-2v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {isDownloading ? "Zipping..." : "Download All (ZIP)"}
        </button>
      )}
    </div>
  );
}
