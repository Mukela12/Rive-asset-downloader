"use client";

export default function ScrollToTool() {
  return (
    <button
      onClick={() => {
        document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="group inline-flex items-center gap-2 rounded-full bg-rive-accent px-7 py-3 text-sm font-semibold text-rive-bg shadow-lg shadow-rive-accent/20 transition-all duration-300 hover:bg-rive-accent-hover hover:shadow-rive-accent/30"
    >
      Try It Now
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-300 group-hover:translate-y-0.5"
      >
        <path
          d="M8 3v10m0 0l-4-4m4 4l4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
