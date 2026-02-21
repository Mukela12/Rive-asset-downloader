"use client";

import { formatBytes } from "@/lib/format";
import TypeBadge from "./TypeBadge";

export interface AssetEntry {
  name: string;
  fileExtension: string;
  type: "image" | "font" | "audio" | "unknown";
  bytes: Uint8Array;
  cdnUuid: string;
}

interface AssetTableProps {
  assets: AssetEntry[];
  onDownload: (asset: AssetEntry) => void;
}

export default function AssetTable({ assets, onDownload }: AssetTableProps) {
  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mb-3 text-rive-text-muted">
          <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 3H8l-2 4h12l-2-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <p className="text-sm text-rive-text-muted">No embedded assets found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-rive-border text-[11px] uppercase tracking-wider text-rive-text-muted">
            <th className="px-4 py-2.5 font-medium">Name</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 font-medium">Size</th>
            <th className="px-4 py-2.5 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, i) => (
            <tr
              key={`${asset.name}-${i}`}
              className="border-b border-rive-border/50 transition-colors last:border-0 hover:bg-rive-accent-muted"
            >
              <td className="px-4 py-3 font-mono text-xs text-rive-text">
                {asset.name}
                <span className="text-rive-text-muted">{asset.fileExtension ? `.${asset.fileExtension}` : ""}</span>
              </td>
              <td className="px-4 py-3">
                <TypeBadge type={asset.type} />
              </td>
              <td className="px-4 py-3 text-xs text-rive-text-secondary">
                {formatBytes(asset.bytes.length)}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onDownload(asset)}
                  className="rounded-lg border border-rive-border px-3 py-1 text-xs font-medium text-rive-text-secondary transition-all hover:border-rive-accent hover:text-rive-accent"
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
