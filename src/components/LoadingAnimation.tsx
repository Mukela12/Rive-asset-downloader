"use client";

import Lottie from "lottie-react";
import loadingData from "@/assets/loading-files.json";

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-48 brightness-75 invert">
        <Lottie animationData={loadingData} loop />
      </div>
      <p className="mt-4 text-sm text-rive-text-muted">Loading file...</p>
    </div>
  );
}
