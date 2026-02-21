"use client";

import dynamic from "next/dynamic";

const RiveTool = dynamic(() => import("./RiveTool"), { ssr: false });

export default function RiveToolWrapper() {
  return <RiveTool />;
}
