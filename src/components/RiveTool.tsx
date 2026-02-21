"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRive } from "@rive-app/react-canvas";
import type { FileAsset } from "@rive-app/canvas";
import DropZone from "./DropZone";
import PreviewCanvas from "./PreviewCanvas";
import InspectorPanel from "./InspectorPanel";
import StatusBar from "./StatusBar";
import LoadingAnimation from "./LoadingAnimation";
import type { AssetEntry } from "./AssetTable";

interface ArtboardContents {
  name: string;
  animations: string[];
  stateMachines: {
    name: string;
    inputs: { name: string; type: number }[];
  }[];
}

function getAssetType(asset: FileAsset): AssetEntry["type"] {
  if (asset.isImage) return "image";
  if (asset.isFont) return "font";
  if (asset.isAudio) return "audio";
  return "unknown";
}

function downloadSingleAsset(asset: AssetEntry) {
  const ext = asset.fileExtension ? `.${asset.fileExtension}` : "";
  const blob = new Blob([asset.bytes as unknown as BlobPart]);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${asset.name}${ext}`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function RiveTool() {
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [selectedArtboard, setSelectedArtboard] = useState<string>("");
  const [artboards, setArtboards] = useState<ArtboardContents[]>([]);
  const [artboardNames, setArtboardNames] = useState<string[]>([]);
  const [assets, setAssets] = useState<AssetEntry[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const collectedAssets = useRef<AssetEntry[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  const assetLoader = useCallback((asset: FileAsset, bytes: Uint8Array): boolean => {
    collectedAssets.current.push({
      name: asset.name,
      fileExtension: asset.fileExtension,
      type: getAssetType(asset),
      bytes: new Uint8Array(bytes),
      cdnUuid: asset.cdnUuid,
    });
    return false;
  }, []);

  const { rive, RiveComponent } = useRive(
    fileBuffer
      ? {
          buffer: fileBuffer,
          artboard: selectedArtboard || undefined,
          autoplay: true,
          assetLoader: assetLoader as unknown as (asset: FileAsset, bytes: Uint8Array) => Boolean,
          onLoad: () => {
            setStatus("ready");
          },
          onLoadError: () => {
            setStatus("error");
            setError("Failed to load Rive file. The file may be corrupted.");
          },
        }
      : null,
    {
      shouldResizeCanvasToContainer: true,
    },
  );

  useEffect(() => {
    if (!rive) return;

    const contents = rive.contents;
    const abs = contents?.artboards ?? [];
    setArtboards(abs);
    const names = abs.map((a) => a.name);
    setArtboardNames(names);
    if (names.length > 0 && !selectedArtboard) {
      setSelectedArtboard(names[0]);
    }

    const timer = setTimeout(() => {
      setAssets([...collectedAssets.current]);
    }, 100);

    return () => clearTimeout(timer);
  }, [rive, selectedArtboard]);

  const handleFile = useCallback(async (file: File) => {
    setStatus("loading");
    setError(null);
    setAssets([]);
    setArtboards([]);
    setArtboardNames([]);
    setSelectedArtboard("");
    collectedAssets.current = [];

    try {
      const buffer = await file.arrayBuffer();
      setFilename(file.name);
      setFileBuffer(buffer);
      // Let React render the loading state, then scroll into view
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setStatus("error");
      setError("Failed to read the file.");
    }
  }, []);

  const handleArtboardChange = useCallback((name: string) => {
    setSelectedArtboard(name);
    setAssets([]);
    collectedAssets.current = [];
  }, []);

  return (
    <section id="tool" className="mx-auto max-w-6xl px-4 pb-20 pt-8">
      <DropZone onFile={handleFile} filename={filename} />

      <div ref={resultsRef} className="scroll-mt-4">
        {status !== "idle" && (
          <div className="relative mt-6">
            {/* Always mount the grid so RiveComponent's canvas exists in the DOM */}
            <div
              className={`grid grid-cols-1 gap-6 md:grid-cols-2 transition-opacity duration-300 ${
                status === "loading" ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <PreviewCanvas RiveComponent={RiveComponent ?? null} />
              <InspectorPanel
                artboards={artboards}
                artboardNames={artboardNames}
                selectedArtboard={selectedArtboard}
                onArtboardChange={handleArtboardChange}
                assets={assets}
                onDownloadAsset={downloadSingleAsset}
              />
            </div>

            {/* Loading overlay — sits on top while Rive initialises */}
            {status === "loading" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingAnimation />
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <StatusBar status={status} assets={assets} error={error} filename={filename} />
        </div>
      </div>
    </section>
  );
}
