"use client";

import { useState } from "react";
import StructureView from "./StructureView";
import AssetTable, { AssetEntry } from "./AssetTable";

interface ArtboardContents {
  name: string;
  animations: string[];
  stateMachines: {
    name: string;
    inputs: { name: string; type: number }[];
  }[];
}

interface InspectorPanelProps {
  artboards: ArtboardContents[];
  artboardNames: string[];
  selectedArtboard: string;
  onArtboardChange: (name: string) => void;
  assets: AssetEntry[];
  onDownloadAsset: (asset: AssetEntry) => void;
}

export default function InspectorPanel({
  artboards,
  artboardNames,
  selectedArtboard,
  onArtboardChange,
  assets,
  onDownloadAsset,
}: InspectorPanelProps) {
  const [activeTab, setActiveTab] = useState<"structure" | "assets">("assets");

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-rive-border bg-rive-surface" style={{ minHeight: 400 }}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-rive-border px-4 py-3">
        {artboardNames.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-rive-text-muted">Artboard</label>
            <select
              value={selectedArtboard}
              onChange={(e) => onArtboardChange(e.target.value)}
              className="rounded-lg border border-rive-border bg-rive-bg px-2.5 py-1.5 text-sm text-rive-text outline-none transition-colors focus:border-rive-accent"
            >
              {artboardNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="ml-auto flex rounded-lg border border-rive-border bg-rive-bg p-0.5">
          <button
            onClick={() => setActiveTab("structure")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-all duration-200 ${
              activeTab === "structure"
                ? "bg-rive-accent text-rive-bg shadow-sm"
                : "text-rive-text-secondary hover:text-rive-text"
            }`}
          >
            Structure
          </button>
          <button
            onClick={() => setActiveTab("assets")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-all duration-200 ${
              activeTab === "assets"
                ? "bg-rive-accent text-rive-bg shadow-sm"
                : "text-rive-text-secondary hover:text-rive-text"
            }`}
          >
            Assets
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "structure" ? (
          <StructureView artboards={artboards} />
        ) : (
          <AssetTable assets={assets} onDownload={onDownloadAsset} />
        )}
      </div>
    </div>
  );
}
